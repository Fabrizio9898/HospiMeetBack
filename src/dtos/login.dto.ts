import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'TomHoward@mail.com'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123' })
  @IsNotEmpty()
  password: string;
}
