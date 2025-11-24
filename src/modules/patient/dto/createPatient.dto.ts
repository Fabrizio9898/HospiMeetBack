import { ApiProperty } from '@nestjs/swagger';
import { IsEmail,IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  dni?: string;
}
