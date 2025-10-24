import { Type } from '@nestjs/class-transformer';
import { IsArray, IsInt, IsNotEmpty } from 'class-validator';
import { Doctor } from 'src/entities/doctor.entity';
import { DoctorPublicDto } from './doctorPublic.dto';

export class DoctorListResponseDto {
  @Type(() => DoctorPublicDto)
  @IsArray()
  data: DoctorPublicDto[];

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
