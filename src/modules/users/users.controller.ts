import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { isNotEmptyObject } from 'class-validator';
import { ApiError } from 'src/helpers/apiError.helper';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import {UpdatePasswordDto, UpdateUserDto } from 'src/dtos/updateUser.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('update/email/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updateEmail(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUserDto
  ) {
    if (!isNotEmptyObject(updateUser)) {
      throw new ApiError(
        ApiStatusEnum.USER_UPDATE_FAILED,
        BadRequestException,
        'body values are empty'
      );
    }
    return this.usersService.updateEmail(id, updateUser);
  }

  @Post('update/password/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdatePasswordDto
  ) {
    if (!isNotEmptyObject(updateUser)) {
      throw new ApiError(
        ApiStatusEnum.USER_UPDATE_FAILED,
        BadRequestException,
        'body values are empty'
      );
    }
    return this.usersService.updatePassword(id, updateUser);
  }
}
