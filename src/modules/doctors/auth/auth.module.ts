import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../doctors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/doctor.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class Doctors_AuthModule {}
