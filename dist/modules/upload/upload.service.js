"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
const doctor_entity_1 = require("../../entities/doctor.entity");
const doctor_documentation_entity_1 = require("../../entities/doctor-documentation.entity");
const typeorm_1 = require("typeorm");
const doctorDocument_enum_1 = require("../../enums/doctorDocument.enum");
const doctorStatus_enum_1 = require("../../enums/doctorStatus.enum");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let UploadService = class UploadService {
    configService;
    dataSource;
    s3service;
    bucketName;
    region;
    constructor(configService, dataSource) {
        this.configService = configService;
        this.dataSource = dataSource;
        this.region = this.configService.getOrThrow('AWS_S3_REGION');
        this.bucketName =
            this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
        this.s3service = new client_s3_1.S3Client({
            region: this.region,
            credentials: {
                accessKeyId: this.configService.getOrThrow('AWS_S3_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.getOrThrow('AWS_S3_SECRET_ACCESS_KEY')
            }
        });
    }
    async uploadDocuments(userId, files) {
        const { fileFrente, fileDorso, fileLicencia } = this.validateDoctorDocuments(files);
        const s3PathPrefix = `doctors/${userId}/verification`;
        try {
            const [urlDniFront, urlDniback, urlmedicalLicence] = await Promise.all([
                this.uploadToS3(fileFrente, s3PathPrefix),
                this.uploadToS3(fileDorso, s3PathPrefix),
                this.uploadToS3(fileLicencia, s3PathPrefix)
            ]);
            await this.saveDoctorDocuments(userId, urlDniFront, urlDniback, urlmedicalLicence);
            return {
                message: 'Documentos subidos. Su cuenta está en revisión.',
                urls: {
                    dniBack: urlDniFront,
                    dniFront: urlDniback,
                    medicalLicence: urlmedicalLicence
                }
            };
        }
        catch (error) {
            console.error('Error en el proceso de subida:', error);
            throw new common_1.InternalServerErrorException('Error al procesar los archivos.');
        }
    }
    async saveDoctorDocuments(userId, urlFrente, urlDorso, urlLicencia) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const doctor = await queryRunner.manager.findOneBy(doctor_entity_1.Doctor, {
                id: userId
            });
            if (!doctor) {
                throw new common_1.NotFoundException(`Doctor con ID ${userId} no encontrado.`);
            }
            const tiposABorrar = [
                doctorDocument_enum_1.DoctorDocumentType.DNI_FRONT,
                doctorDocument_enum_1.DoctorDocumentType.DNI_BACK,
                doctorDocument_enum_1.DoctorDocumentType.MEDICAL_LICENSE
            ];
            await queryRunner.manager.delete(doctor_documentation_entity_1.DoctorDocument, {
                doctor: { id: userId },
                type: (0, typeorm_1.In)(tiposABorrar)
            });
            const docFrente = queryRunner.manager.create(doctor_documentation_entity_1.DoctorDocument, {
                doctor: doctor,
                url: urlFrente,
                type: doctorDocument_enum_1.DoctorDocumentType.DNI_FRONT,
                verified: false
            });
            const docDorso = queryRunner.manager.create(doctor_documentation_entity_1.DoctorDocument, {
                doctor: doctor,
                url: urlDorso,
                type: doctorDocument_enum_1.DoctorDocumentType.DNI_BACK,
                verified: false
            });
            const docLicencia = queryRunner.manager.create(doctor_documentation_entity_1.DoctorDocument, {
                doctor: doctor,
                url: urlLicencia,
                type: doctorDocument_enum_1.DoctorDocumentType.MEDICAL_LICENSE,
                verified: false
            });
            await queryRunner.manager.save([docFrente, docDorso, docLicencia]);
            doctor.status = doctorStatus_enum_1.Doctor_Status.PENDING;
            doctor.rejectedReason = null;
            const updatedDoctor = await queryRunner.manager.save(doctor);
            await queryRunner.commitTransaction();
            return updatedDoctor;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error en la transacción de BD:', error);
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException('Error al guardar los documentos en la base de datos.');
        }
        finally {
            await queryRunner.release();
        }
    }
    async generateSignedUrl(documentUrl) {
        try {
            const urlObject = new URL(documentUrl);
            const s3Key = urlObject.pathname.substring(1);
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucketName,
                Key: s3Key
            });
            const signedUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3service, command, {
                expiresIn: 3600
            });
            return signedUrl;
        }
        catch (error) {
            console.error('Error al generar URL firmada:', error);
            throw new common_1.InternalServerErrorException('No se pudo generar la URL del documento.');
        }
    }
    async uploadToS3(file, pathPrefix) {
        const fileExtension = path_1.default.extname(file.originalname);
        const uniqueFileName = `${(0, crypto_1.randomUUID)()}${fileExtension}`;
        const s3Key = `${pathPrefix}/${uniqueFileName}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucketName,
            Key: s3Key,
            Body: file.buffer,
            ContentType: file.mimetype
        });
        try {
            await this.s3service.send(command);
        }
        catch (error) {
            console.error('Error al subir archivo a S3:', error);
            throw new common_1.InternalServerErrorException('Error al subir el archivo a S3.');
        }
        const publicUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${s3Key}`;
        return publicUrl;
    }
    validateDoctorDocuments(files) {
        const fileFrente = files.dni_front?.[0];
        const fileDorso = files.dni_back?.[0];
        const fileLicencia = files.medical_licence?.[0];
        if (!fileFrente || !fileDorso || !fileLicencia) {
            throw new common_1.BadRequestException('Faltan archivos (se requieren frente, dorso y licencia).');
        }
        if (!fileFrente.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
            throw new common_1.BadRequestException('El DNI Frente debe ser una imagen o pdf.');
        }
        if (!fileDorso.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
            throw new common_1.BadRequestException('El DNI Dorso debe ser una imagen o pdf.');
        }
        if (!fileLicencia.mimetype.match(/\/(pdf)$/)) {
            throw new common_1.BadRequestException('La licencia médica debe ser un PDF.');
        }
        return { fileFrente, fileDorso, fileLicencia };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_1.DataSource])
], UploadService);
//# sourceMappingURL=upload.service.js.map