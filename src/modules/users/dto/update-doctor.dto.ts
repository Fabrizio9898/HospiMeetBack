import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from '../auth/dtos/create-doctor.dto';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  // Agrega campos específicos si querés, ej. para tarifa solo
  @IsOptional()
  @IsNumber({ allowNaN: false })
  @IsPositive()
  @Min(0)
  tarifaPorConsulta?: number;
}
