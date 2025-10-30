import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Doctor_Status } from 'src/enums/doctorStatus.enum';

export class UpdateDoctorStatusDto {
  @IsNotEmpty()
  @IsEnum(Doctor_Status)
  status: Doctor_Status;

  @IsString()
  @IsOptional()
  rejectionReason?: string;
}
