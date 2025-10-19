import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  Length,
  IsString,
  IsEmail,
  Matches,
} from 'class-validator';


export class CreateUserDto {
  @ApiProperty({
    example: 'Tom Howard'
  })
  @IsNotEmpty()
  @Length(3, 50)
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios'
  })
  name: string;

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
}
