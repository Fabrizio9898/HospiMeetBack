import { OmitType } from '@nestjs/swagger';
import { Doctor } from 'src/entities/doctor.entity';
;

export class DoctorClean extends OmitType(Doctor, [
  'password',
  'reviews',
  'appointments',
] as const) {}
