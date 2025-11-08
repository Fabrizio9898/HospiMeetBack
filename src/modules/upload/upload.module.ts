import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorDocument } from 'src/entities/doctor-documentation.entity';
import { Doctor } from 'src/entities/doctor.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([DoctorDocument,Doctor])],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService]
})
export class UploadModule {}
