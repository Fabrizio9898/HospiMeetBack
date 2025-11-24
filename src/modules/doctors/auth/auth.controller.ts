import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckEmailDto } from 'src/dtos/checkEmail.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { CreateDoctorDto } from './dtos/create-doctor.dto';

@Controller('doctor/auth')
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

  @Post('register')
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.authService.create(createDoctorDto);
  }

}
