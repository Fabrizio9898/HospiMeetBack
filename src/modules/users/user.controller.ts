import {
  Controller,
  Body,
  Patch,
  Param,
  ParseUUIDPipe
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctors')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('update/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDoctorDto: UpdateDoctorDto
  ) {
    return this.userService.update(+id, updateDoctorDto);
  }
}
