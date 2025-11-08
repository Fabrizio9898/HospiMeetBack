import { Doctor_Status } from 'src/enums/doctorStatus.enum';
export declare class UpdateDoctorStatusDto {
    status: Doctor_Status;
    rejectionReason?: string;
}
