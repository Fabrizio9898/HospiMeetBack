import { Type, Expose } from '@nestjs/class-transformer'; // <-- 1. IMPORTA @Expose
import { IsArray, IsInt, IsNotEmpty } from 'class-validator';
import { DoctorPublicDto } from './doctorPublic.dto';

export class DoctorListResponseDto {
  @Expose() 
  @Type(() => DoctorPublicDto)
  @IsArray()
  data: DoctorPublicDto[];

  @Expose() 
  @IsInt()
  @IsNotEmpty()
  total: number;

  @Expose() 
  @IsInt()
  @IsNotEmpty()
  page: number;

  @Expose() 
  @IsInt()
  @IsNotEmpty()
  limit: number;

  @Expose() 
  @IsInt()
  @IsNotEmpty()
  totalPages: number;
}
