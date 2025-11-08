import { Doctor_Status } from 'src/enums/doctorStatus.enum';
export declare class GetDoctorsQueryDto {
    status: Doctor_Status;
    search?: string;
    page: number;
    limit: number;
}
