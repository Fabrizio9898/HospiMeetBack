import { Module } from '@nestjs/common';
import { UserService } from './doctors.service';
import { UserController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
