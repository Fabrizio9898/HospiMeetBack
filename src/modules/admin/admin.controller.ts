import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserRole } from 'src/enums/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoginDto } from 'src/dtos/login.dto';
import { UserLoginResponse } from '../users/auth/dtos/loginResponse.dto';
import { GetDoctorsQueryDto } from './dto/doctorQuery.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  @Roles(UserRole.SUPER_ADMIN)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateAdminDto })
  @ApiOperation({
    summary: 'Registro de administrador, debe ser ejecutado por el super admin.'
  })
  async create(@Body() createAdminDto: CreateAdminDto) {
    return await this.adminService.create(createAdminDto);
  }

  @Post('login')
  async login(@Body() data: LoginDto): Promise<UserLoginResponse> {
    return await this.adminService.login(data);
  }

  @Get('doctor-documents/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async getDoctorDocuments(@Param('id',ParseUUIDPipe) id: string) {

  }

  @Get('doctors')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  )
  @ApiBearerAuth()
  async getDoctors(@Query() doctorQuery: GetDoctorsQueryDto) {
    return await this.adminService.getDoctors(
      doctorQuery
    );
  }
}
