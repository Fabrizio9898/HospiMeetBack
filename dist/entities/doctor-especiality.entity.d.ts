import { Doctor } from './doctor.entity';
export declare class DoctorSpeciality {
    id: string;
    name: string;
    description: string;
    doctors: Doctor[];
    createdAt: Date;
    updatedAt: Date;
}
