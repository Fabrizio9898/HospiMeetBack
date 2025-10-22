import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [ConfigModule], // Importa ConfigModule para que el servicio pueda usarlo
  providers: [EmailService],
  exports: [EmailService] // Exporta el servicio
})
export class EmailModule {}
