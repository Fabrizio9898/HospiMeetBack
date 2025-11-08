import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  Matches
} from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({
    example: 'TomHoward@mail.com'
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @ApiProperty({ name: 'password', example: 'Password123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8) // Mínimo para password seguro
  password: string;

  @ApiProperty({ name: 'fullname', example: 'fabrizio andrade' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios'
  })
  fullname: string;

  @ApiProperty({ name: 'dni', example: '43522469' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Matches(/^\d{7,8}$/, { message: 'DNI debe ser 7-8 dígitos' }) // Ej. para Argentina
  dni: string;

  @ApiProperty({ name: 'medicalLicenseNumber', example: '1243526' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/^[A-Z0-9-]{5,20}$/, {
    message: 'Matrícula inválida (letras/números/guiones)'
  })
  medicalLicenseNumber: string;

  @ApiProperty({ name: 'phoneNumber', example: '+5491112345678' })
  @IsPhoneNumber('AR')
  @IsNotEmpty()
  @MaxLength(20)
  phoneNumber: string;
}
