import { Type } from '@nestjs/class-transformer';
import { IsArray, IsInt, IsNotEmpty } from 'class-validator';
import { Doctor } from 'src/entities/doctor.entity';

export class DoctorListResponseDto {
  @Type(() => Doctor)
  @IsArray()
  data: Doctor[];
  
  @IsInt()
  @IsNotEmpty()
  total: number;

  @IsInt()
  @IsNotEmpty()
  page: number;

  @IsInt()
  @IsNotEmpty()
  limit: number;

  @IsInt()
  @IsNotEmpty()
  totalPages: number;
}
