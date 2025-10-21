import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/db.config';
import { UsersModule } from './modules/users/users.module';
import { DoctorsModule } from './modules/doctors/doctors.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [dbConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm') as TypeOrmModuleOptions
    }),
    UsersModule,
    DoctorsModule
  ],

  controllers: [],
  providers: []
})
export class AppModule {}
