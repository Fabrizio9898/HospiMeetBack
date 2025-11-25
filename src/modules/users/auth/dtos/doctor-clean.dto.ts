import { OmitType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class DoctorClean extends OmitType(User, [
  'password',
] as const) {}
