import { PickType } from '@nestjs/swagger';
import { Patient } from 'src/entities/patient.entity';

export class PatientResponseDto extends PickType(Patient, [
  'id',
  'fullname',
  'email',
] as const) {}
