import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckEmailDto } from 'src/dtos/checkEmail.dto';
import { ResetPasswordDto } from 'src/dtos/resetPassword.dto';
import { LoginDto } from 'src/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async userLogin(@Body() userLoginDto: LoginDto) {
    return await this.authService.login(userLoginDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() email: CheckEmailDto) {
    return await this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto) {
    return await this.authService.resetPassword(data);
  }
}
