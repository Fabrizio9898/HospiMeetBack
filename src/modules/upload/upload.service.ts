import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3';
import path from 'path';
import { randomUUID } from 'crypto';
import { User } from 'src/entities/doctor.entity';
import { DoctorDocument } from 'src/entities/doctor-documentation.entity';
import { DataSource, In, Repository } from 'typeorm';
import { DoctorDocumentType } from 'src/enums/doctorDocument.enum';
import { Doctor_Status } from 'src/enums/doctorStatus.enum';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
type VerificationFiles = {
  dni_front?: Express.Multer.File[];
  dni_back?: Express.Multer.File[];
  medical_licence?: Express.Multer.File[];
};

@Injectable()
export class UploadService {
  private readonly s3service: S3Client;
  private readonly bucketName: string;
  private readonly region: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource
  ) {
    this.region = this.configService.getOrThrow<string>('AWS_S3_REGION');
    this.bucketName =
      this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME');

    this.s3service = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>(
          'AWS_S3_ACCESS_KEY_ID'
        ),
        secretAccessKey: this.configService.getOrThrow<string>(
          'AWS_S3_SECRET_ACCESS_KEY'
        )
      }
    });
  }

  async uploadDocuments(userId: string, files: VerificationFiles) {
    const { fileFrente, fileDorso, fileLicencia } =
      this.validateDoctorDocuments(files);

    // --- 2. SUBIDA A S3 (EN PARALELO) ---
    const s3PathPrefix = `doctors/${userId}/verification`;

    try {
      const [urlDniFront, urlDniback, urlmedicalLicence] = await Promise.all([
        this.uploadToS3(fileFrente, s3PathPrefix),
        this.uploadToS3(fileDorso, s3PathPrefix),
        this.uploadToS3(fileLicencia, s3PathPrefix)
      ]);

      // --- 3. GUARDADO EN BD ---
      // (Llamamos a tu método placeholder)
      await this.saveDoctorDocuments(
        userId,
        urlDniFront,
        urlDniback,
        urlmedicalLicence
      );

      // --- 4. RESPUESTA ---
      return {
        message: 'Documentos subidos. Su cuenta está en revisión.',
        urls: {
          dniBack: urlDniFront,
          dniFront: urlDniback,
          medicalLicence: urlmedicalLicence
        }
      };
    } catch (error) {
      console.error('Error en el proceso de subida:', error);
      throw new InternalServerErrorException('Error al procesar los archivos.');
    }
  }

  async saveDoctorDocuments(
    userId: string,
    urlFrente: string,
    urlDorso: string,
    urlLicencia: string
  ): Promise<User> {
    // 1. Iniciar el "Query Runner" para la transacción
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 2. Buscar al doctor (DENTRO de la transacción)
      const doctor = await queryRunner.manager.findOneBy(User, {
        id: userId
      });
      if (!doctor) {
        throw new NotFoundException(`Doctor con ID ${userId} no encontrado.`);
      }

      // 3. Borrar documentos de verificación ANTERIORES (tu lógica de "volver a subir")
      const tiposABorrar = [
        DoctorDocumentType.DNI_FRONT,
        DoctorDocumentType.DNI_BACK,
        DoctorDocumentType.MEDICAL_LICENSE
      ];
      await queryRunner.manager.delete(DoctorDocument, {
        doctor: { id: userId }, // Solo los de este doctor
        type: In(tiposABorrar) // Solo estos tipos
      });

      // 4. Crear las NUEVAS entidades de documento
      const docFrente = queryRunner.manager.create(DoctorDocument, {
        doctor: doctor,
        url: urlFrente,
        type: DoctorDocumentType.DNI_FRONT,
        verified: false
      });
      const docDorso = queryRunner.manager.create(DoctorDocument, {
        doctor: doctor,
        url: urlDorso,
        type: DoctorDocumentType.DNI_BACK,
        verified: false
      });
      const docLicencia = queryRunner.manager.create(DoctorDocument, {
        doctor: doctor,
        url: urlLicencia,
        type: DoctorDocumentType.MEDICAL_LICENSE,
        verified: false
      });

      // 5. Guardar los NUEVOS documentos (DENTRO de la transacción)
      await queryRunner.manager.save([docFrente, docDorso, docLicencia]);

      // 6. Actualizar el estado del Doctor (DENTRO de la transacción)
      doctor.status = Doctor_Status.PENDING;
      doctor.rejectedReason = null;
      const updatedDoctor = await queryRunner.manager.save(doctor);

      // 7. Si todo salió bien, confirmar la transacción
      await queryRunner.commitTransaction();
      return updatedDoctor;
    } catch (error) {
      // 8. Si algo falló, revertir todo
      await queryRunner.rollbackTransaction();
      console.error('Error en la transacción de BD:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Error al guardar los documentos en la base de datos.'
      );
    } finally {
      // 9. Siempre liberar el queryRunner
      await queryRunner.release();
    }
  }

  async generateSignedUrl(documentUrl: string): Promise<string> {
    try {
      const urlObject = new URL(documentUrl);
      const s3Key = urlObject.pathname.substring(1);

      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: s3Key
      });

      // Genera una URL temporal (dura 1 hora = 3600 segundos)
      const signedUrl = await getSignedUrl(this.s3service, command, {
        expiresIn: 3600
      });

      return signedUrl;
    } catch (error) {
      console.error('Error al generar URL firmada:', error);
      throw new InternalServerErrorException(
        'No se pudo generar la URL del documento.'
      );
    }
  }

  private async uploadToS3(file: Express.Multer.File, pathPrefix: string) {
    // Lógica de subida a S3
    // 1. Crear nombre único
    const fileExtension = path.extname(file.originalname);
    const uniqueFileName = `${randomUUID()}${fileExtension}`;
    const s3Key = `${pathPrefix}/${uniqueFileName}`;

    // 2. Crear comando de subida
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: s3Key,
      Body: file.buffer,
      ContentType: file.mimetype
    });

    try {
      await this.s3service.send(command);
    } catch (error) {
      console.error('Error al subir archivo a S3:', error);
      throw new InternalServerErrorException('Error al subir el archivo a S3.');
    }

    // 4. Devolver la URL pública
    const publicUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${s3Key}`;
    return publicUrl;
  }

  private validateDoctorDocuments(files: VerificationFiles) {
    const fileFrente = files.dni_front?.[0];
    const fileDorso = files.dni_back?.[0];
    const fileLicencia = files.medical_licence?.[0];

    if (!fileFrente || !fileDorso || !fileLicencia) {
      throw new BadRequestException(
        'Faltan archivos (se requieren frente, dorso y licencia).'
      );
    }
    if (!fileFrente.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
      throw new BadRequestException('El DNI Frente debe ser una imagen o pdf.');
    }
    if (!fileDorso.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
      throw new BadRequestException('El DNI Dorso debe ser una imagen o pdf.');
    }
    if (!fileLicencia.mimetype.match(/\/(pdf)$/)) {
      throw new BadRequestException('La licencia médica debe ser un PDF.');
    }
    return { fileFrente, fileDorso, fileLicencia };
  }
}
