import { Doctor } from 'src/entities/doctor.entity';
declare const DoctorPublicDto_base: import("@nestjs/common").Type<Pick<Doctor, "email" | "id" | "status" | "fullname" | "dni" | "phoneNumber" | "tarifaPorConsulta">>;
export declare class DoctorPublicDto extends DoctorPublicDto_base {
    specialtyCount: number;
}
export {};
