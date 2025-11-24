import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/db.config';
import { UserModule } from './modules/doctors/doctors.module';
import { JwtModule } from '@nestjs/jwt';
import { Doctors_AuthModule } from './modules/doctors/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { UploadModule } from './modules/upload/upload.module';
import { EmailModule } from './modules/email/email.module';

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
    UserModule,
    Doctors_AuthModule,
    AdminModule,
    EmailModule,
    UploadModule
  ],

  controllers: [],
  providers: []
})
export class AppModule {}
