// en: src/admin/dto/get-doctors-query.dto.ts

import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { User_Status } from 'src/enums/userStatus.enum';

export class GetDoctorsQueryDto {
  @IsEnum(User_Status)
  status: User_Status;

  @IsString()
  @IsOptional()
  search?: string;

  @Type(() => Number)
  @IsInt()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  limit: number = 10;
}
