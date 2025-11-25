import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Appointment } from 'src/entities/appointment.entity';
import { Patient } from 'src/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Appointment,Patient])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
