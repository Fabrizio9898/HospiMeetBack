import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { EmailModule } from '../email/email.module';
import { Doctor } from 'src/entities/doctor.entity';
import { DoctorsModule } from '../doctors/doctors.module';
import { Appointment } from 'src/entities/appointment.entity';
import { UploadModule } from '../upload/upload.module';
import { SupportTicket } from 'src/entities/SupportTicket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Doctor, Appointment, SupportTicket]),
    EmailModule,
    DoctorsModule,
    UploadModule
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
