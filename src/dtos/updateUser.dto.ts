import { PartialType, PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches, Validate } from 'class-validator';
import { User } from 'src/entities/user.entity';
import { MatchPassword } from 'src/validator/matchPassword.validator';


export class UpdateUserDto extends PartialType(PickType( User,["email"] as const)) {}


export class UpdatePasswordDto {
  @ApiProperty({
    example: 'Password!1'
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 80, { message: 'Password must be at least 8 characters long.' })
  @Matches(/^(?=.*[A-Z])(?=.*\d).*$/, {
    message:
      'Password must contain at least one uppercase letter and one number.'
  })
  actual_password: string;

  @ApiProperty({
    example: 'Password!1'
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 80, { message: 'Password must be at least 8 characters long.' })
  @Matches(/^(?=.*[A-Z])(?=.*\d).*$/, {
    message:
      'Password must contain at least one uppercase letter and one number.'
  })
  newPassword: string;

  @ApiProperty({
    example: 'Password!1'
  })
  @IsNotEmpty()
  @IsString()
  @Validate(MatchPassword, ['password'])
  confirm_password: string;
}