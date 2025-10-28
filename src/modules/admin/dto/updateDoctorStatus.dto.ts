import { IsEnum, IsNotEmpty } from 'class-validator';
import { Doctor_Status } from 'src/enums/doctorStatus.enum';

export class UpdateDoctorStatusDto {
  @IsNotEmpty()
  @IsEnum(Doctor_Status) 
  status: Doctor_Status;
}
