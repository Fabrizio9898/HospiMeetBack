import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CheckEmailDto {
  @ApiProperty({ example: 'test@mail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
