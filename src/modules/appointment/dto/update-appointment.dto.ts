import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { AppointmentStatus } from 'src/enums/appointment.enum';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
@IsOptional()
@IsEnum(AppointmentStatus)
status?:AppointmentStatus

}
