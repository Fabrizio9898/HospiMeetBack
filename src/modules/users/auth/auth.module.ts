import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Subscription } from 'src/entities/subscription.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User, Subscription])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class User_Auth_Module {}
