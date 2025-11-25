import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User_Status } from 'src/enums/userStatus.enum';

export class UpdateDoctorStatusDto {
  @IsNotEmpty()
  @IsEnum(User_Status)
  status: User_Status;

  @IsString()
  @IsOptional()
  rejectionReason?: string;
}
