import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailModule } from 'src/modules/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/doctor.entity';
import { UserModule } from '../doctors/doctors.module';

@Module({
  imports: [EmailModule, UserModule,TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class Users_AuthModule {}
