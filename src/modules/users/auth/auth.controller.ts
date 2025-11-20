import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dtos/login.dto';
import { CheckEmailDto } from 'src/dtos/checkEmail.dto';
import { ResetPasswordDto } from 'src/dtos/resetPassword.dto';

@Controller('user/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('check-email')
  checkEmail(@Body() checkEmailDto: CheckEmailDto) {
    return this.authService.checkEmail(checkEmailDto);
  }

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
