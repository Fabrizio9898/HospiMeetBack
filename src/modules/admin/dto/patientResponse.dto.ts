import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class PatientResponseDto extends PickType(User, [
  'id',
  'fullname',
  'email',
  "appointments",
  "reviews"
] as const) {}
