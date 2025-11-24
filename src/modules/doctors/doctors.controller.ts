import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe
} from '@nestjs/common';
import { UserService } from './doctors.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctors')
export class UserController {
  constructor(private readonly doctorsService: UserService) {}

  @Patch('update/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDoctorDto: UpdateDoctorDto
  ) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }
}
