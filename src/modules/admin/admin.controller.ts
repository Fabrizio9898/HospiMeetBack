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

  // @Patch('tickets/:id/resolve')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  // @ApiOperation({
  //   summary: 'El admin responde y cierra un ticket (Resuelto o Rechazado)'
  // })
  // async resolveTicket(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() resolveDto: ResolveTicketDto
  //   // ResolveTicketDto debería tener: { status: 'RESOLVED' | 'REJECTED', adminResponse: string }
  // ) {
  //   return await this.adminService.resolveTicket(id, resolveDto);
  // }

  // --- GESTIÓN DE FINANZAS Y PAGOS ---

  @Get('payments/history')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Ver historial de pagos entrantes (lo que pagaron los pacientes)'
  })
  async getIncomingPayments(
    @Query() query: { startDate?: Date; endDate?: Date }
  ) {
    // Retorna la lista de AppointmentPayments (transacciones de MercadoPago)
    // return await this.adminService.getIncomingPayments(query);
  }

  // --- GESTIÓN DE LIQUIDACIONES (PAGAR A DOCTORES) ---

  // @Get('payouts/preview')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  // @ApiOperation({
  //   summary: 'Calcula cuánto se le debe a cada doctor hasta la fecha'
  // })
  // async previewPayouts() {
  //   return await this.adminService.previewPendingPayouts();
  // }

  // @Post('payouts/execute')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @Roles(UserRole.SUPER_ADMIN) // Solo Super Admin debería poder soltar el dinero
  // @ApiOperation({
  //   summary: 'Ejecuta el pago a los doctores y marca las consultas como PAGADAS'
  // })
  // async executePayout(@Body() payoutDto: CreatePayoutDto) {
  //   return await this.adminService.executePayouts(payoutDto);
  // }
}
