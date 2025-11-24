import { OmitType } from '@nestjs/swagger';
import { User } from 'src/entities/doctor.entity';
export class DoctorClean extends OmitType(User, [
  'password',
  'appointments'
] as const) {}
