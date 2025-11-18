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
  ParseUUIDPipe,
  BadRequestException
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserRole } from 'src/enums/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoginDto } from 'src/dtos/login.dto';
import { UserLoginResponse } from '../users/auth/dtos/loginResponse.dto';
import { GetDoctorsQueryDto } from './dto/doctorQuery.dto';
import { plainToInstance } from 'class-transformer';
import { DoctorListResponseDto } from './dto/doctorResponse.dto';
import { UpdateDoctorStatusDto } from './dto/updateDoctorStatus.dto';
import { GetTicketsQueryDto } from './dto/getTicketsQuery.dto';
import { TicketResponseDto } from './dto/ticket-response.dto';

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

  @Get('doctors')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  )
  @ApiBearerAuth()
  async getDoctors(@Query() doctorQuery: GetDoctorsQueryDto) {
    const response = await this.adminService.getDoctors(doctorQuery);
    return plainToInstance(DoctorListResponseDto, response);
  }

  @Get('dashboard/kpis')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getKpis() {
    return await this.adminService.getDashboardKpis();
  }

  @Get('doctor-documents/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async getDoctorDocuments(@Param('id', ParseUUIDPipe) id: string) {
    return await this.adminService.getDoctorDocuments(id);
  }

  @Patch('doctors/:id/status')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async updateDoctorStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusDto: UpdateDoctorStatusDto
  ) {
    return await this.adminService.rejectOrApproveDoctors(id, updateStatusDto);
  }

  @Patch('doctors/:id/verify-document')
  async verifyDocument(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusDto: UpdateDoctorStatusDto
  ) {
    return await this.adminService.rejectOrApproveDoctors(id, updateStatusDto);
  }

  @Get('tickets')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async getTickets(
    @Query() query: GetTicketsQueryDto
  ): Promise<TicketResponseDto> {
    return await this.adminService.getTickets(query);
  }
}
