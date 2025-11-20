// src/dtos/resetPassword.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty, Length, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token: string;

   @ApiProperty({ example: 'Password123' })
   @IsNotEmpty()
   @IsString()
   @Length(6, 50, { message: 'Password must be at least 6 characters long.' })
   @Matches(/^(?=.*[A-Z])(?=.*\d).*$/, {
     message:
       'Password must contain at least one uppercase letter and one number.'
   })
   newPassword: string;
}
