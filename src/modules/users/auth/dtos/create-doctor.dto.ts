import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
  Length,

} from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({
    example: 'TomHoward@mail.com'
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  @MaxLength(100)
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

  @ApiProperty({ name: 'fullname', example: 'fabrizio andrade' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios'
  })
  fullname: string;
}
