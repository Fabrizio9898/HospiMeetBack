import { DoctorPublicDto } from './doctorPublic.dto';
export declare class DoctorListResponseDto {
    data: DoctorPublicDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
