import { Controller, Post, UseInterceptors, UseGuards, UploadedFiles, Param, ParseUUIDPipe } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileFilterCallback } from 'multer';

@ApiTags('Documents - Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('doctor-documents/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'dni_front', maxCount: 1 },
        { name: 'dni_back', maxCount: 1 },
        { name: 'medical_licence', maxCount: 1 }
      ],
      {
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (
          req: Request, // 5. Tipado
          file: Express.Multer.File, // 5. Tipado
          cb: FileFilterCallback // 5. Tipado (adiós error)
        ) => {
          // --- 6. ESTA ES LA LÓGICA QUE TE FALTA ---
          if (file.fieldname === 'medical_licence') {
            // Solo PDF para la licencia
            if (!file.mimetype.match(/\/(pdf)$/)) {
              return cb(new Error('La licencia médica debe ser un PDF.'));
            }
          } else if (
            file.fieldname === 'dni_front' ||
            file.fieldname === 'dni_back'
          ) {
            // Solo imágenes para el DNI
            if (!file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
              return cb(
                new Error('El DNI debe ser una imagen (JPG, JPEG, PNG).')
              );
            }
          }
          // Si pasa el filtro específico, se acepta
          cb(null, true);
        }
      }
    )
  )
 async  uploadFile(
    @UploadedFiles()
    file: {
      dni_front?: Express.Multer.File[];
      dni_back?: Express.Multer.File[];
      medical_licence?: Express.Multer.File[];
    },@Param("id",ParseUUIDPipe) id:string
  ) {

    console.log('holaaa');
    
return await this.uploadService.uploadDocuments(id,file);  }
}