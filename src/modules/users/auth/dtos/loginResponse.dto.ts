import { ApiProperty } from '@nestjs/swagger';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import { UserClean } from 'src/modules/users/dto/cleanUser.dto';

export class UserLoginResponse {
  @ApiProperty({
    example: ApiStatusEnum.LOGIN_SUCCESS,
    enum: ApiStatusEnum
  })
  message: ApiStatusEnum;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  token: string;

  @ApiProperty({ type: () => UserClean })
  user: UserClean;
}
