import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Doctor_Status } from 'src/enums/doctorStatus.enum';

export class CreateDoctorDto {
  @ApiProperty({
    example: 'TomHoward@mail.com'
  })
  @IsNotEmpty()
  @IsEmail()
  @Length(3, 50)
  email: string;

  @ApiProperty({ example: 'Password123' })
  @IsNotEmpty()
  @IsString()
  @Length(8, 80, { message: 'Password must be at least 8 characters long.' })
  @Matches(/^(?=.*[A-Z])(?=.*\d).*$/, {
    message:
      'Password must contain at least one uppercase letter and one number.'
  })
  password: string;

  @ApiProperty({
    example: 'Tom Howard'
  })
  @IsNotEmpty()
  @Length(3, 50)
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios'
  })
  fullname: string;

  @ApiProperty({
    example: '40555111',
    description: 'Número de documento nacional de identidad'
  })
  @IsString()
  @Length(7, 20)
  dni: string;

  @ApiProperty({
    example: 'MP-123456',
    description: 'Número de matrícula profesional (único)'
  })
  @IsString()
  @Length(3, 50)
  medicalLicenseNumber: string;

  @ApiProperty({
    example: '1122334455',
    description: 'Número de teléfono de contacto'
  })
  @IsString()
  @Length(6, 20)
  phoneNumber: string;

  @ApiProperty({
    example: 2500.0,
    description: 'Tarifa base por consulta en pesos'
  })
  @IsNumber()
  @Min(0)
  tarifaPorConsulta: number;

  @ApiProperty({
    example: Doctor_Status.PENDING,
    enum: Doctor_Status,
    description: 'Estado del registro del doctor',
    default: Doctor_Status.PENDING
  })
  @IsEnum(Doctor_Status)
  @IsOptional()
  status?: Doctor_Status;
}


