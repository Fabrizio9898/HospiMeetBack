// en: src/admin/dto/get-doctors-query.dto.ts

import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Doctor_Status } from 'src/enums/doctorStatus.enum';

export class GetDoctorsQueryDto {
  @IsEnum(Doctor_Status) 
  @IsOptional() 
  status?: Doctor_Status; 

  @Type(() => Number) 
  @IsInt()
  page: number = 1; 

  @Type(() => Number) 
  @IsInt()
  limit: number = 10; 
}
