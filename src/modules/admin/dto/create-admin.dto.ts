import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CreateAdminDto {
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
        example: 'TomHoward@mail.com'
      })
      @IsNotEmpty()
      @IsEmail()
      @Length(3, 50)
      email: string;
}
