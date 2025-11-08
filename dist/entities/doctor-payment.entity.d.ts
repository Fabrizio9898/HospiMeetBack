import { Doctor } from './doctor.entity';
import { DoctorPaymentStatus } from 'src/enums/doctorPaymentStatus.enum';
export declare class DoctorPayment {
    id: string;
    montoNeto: number;
    status: DoctorPaymentStatus;
    doctor: Doctor;
    createdAt: Date;
    updatedAt: Date;
}
