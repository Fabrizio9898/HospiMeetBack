import { ApiProperty } from '@nestjs/swagger';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import { DoctorClean } from './doctor-clean.dto';

export class DoctorLoginResponse {
  @ApiProperty({
    example: ApiStatusEnum.LOGIN_SUCCESS,
    enum: ApiStatusEnum
  })
  message: ApiStatusEnum;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  token: string;

  @ApiProperty({ type: () => DoctorClean })
  user: DoctorClean;
}
