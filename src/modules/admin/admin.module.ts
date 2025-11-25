import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '../email/email.module';
import { Appointment } from 'src/entities/appointment.entity';
import { UploadModule } from '../upload/upload.module';
import { SupportTicket } from 'src/entities/SupportTicket.entity';
import { User } from 'src/entities/user.entity';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Appointment, SupportTicket]),
    EmailModule,
    UserModule,
    UploadModule
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
