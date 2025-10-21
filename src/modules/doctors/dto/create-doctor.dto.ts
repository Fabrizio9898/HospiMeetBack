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
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8) // Mínimo para password seguro
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios'
  })
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Matches(/^\d{7,8}$/, { message: 'DNI debe ser 7-8 dígitos' }) // Ej. para Argentina
  dni: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/^[A-Z0-9-]{5,20}$/, {
    message: 'Matrícula inválida (letras/números/guiones)'
  })
  medicalLicenseNumber: string;

  @IsPhoneNumber('AR') // Ajusta por país, ej. 'AR' para Argentina
  @IsNotEmpty()
  @MaxLength(20)
  phoneNumber: string;
}
