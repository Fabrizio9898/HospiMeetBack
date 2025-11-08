import { Doctor } from 'src/entities/doctor.entity';
declare const DoctorClean_base: import("@nestjs/common").Type<Omit<Doctor, "password" | "appointments" | "reviews">>;
export declare class DoctorClean extends DoctorClean_base {
}
export {};
