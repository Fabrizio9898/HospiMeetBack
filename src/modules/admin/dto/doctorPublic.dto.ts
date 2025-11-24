import { PickType, ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entities/doctor.entity';

export class DoctorPublicDto extends PickType(User, [
  'id',
  'fullname',
  'email',
  'dni',
  'phoneNumber',
  'status',
  'tarifaPorConsulta'
] as const) {
  @ApiProperty({
    example: 3,
    description: 'Cantidad de especialidades del doctor'
  })
  specialtyCount: number;
}
