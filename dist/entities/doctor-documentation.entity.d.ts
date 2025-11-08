import { Doctor } from './doctor.entity';
import { DoctorDocumentType } from 'src/enums/doctorDocument.enum';
export declare class DoctorDocument {
    id: string;
    type: DoctorDocumentType;
    url: string;
    verified: boolean;
    doctor: Doctor;
    uploadedAt: Date;
}
