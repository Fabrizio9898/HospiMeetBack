import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/db.config';
import { UsersModule } from './modules/users/users.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { JwtModule } from '@nestjs/jwt';
import { Users_AuthModule } from './modules/users/auth/auth.module';
import { Doctors_AuthModule } from './modules/doctors/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [dbConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm') as TypeOrmModuleOptions
    }),

    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET
    }),

    UsersModule,
    DoctorsModule,
    Users_AuthModule,
    Doctors_AuthModule
  ],

  controllers: [],
  providers: []
})
export class AppModule {}
