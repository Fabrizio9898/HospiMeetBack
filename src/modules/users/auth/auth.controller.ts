import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateDoctorDto } from './dtos/create-doctor.dto';

@Controller('doctor/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.authService.create(createDoctorDto);
  }

}
