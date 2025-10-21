import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserRole } from 'src/enums/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';

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

}
