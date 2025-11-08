import { User } from './user.entity';
import { Doctor } from './doctor.entity';
import { UserPayment } from './user-payment.entity';
import { DoctorSchedule } from './doctor-schedules.entity';
import { PayoutStatus } from 'src/enums/payoutStatus.enum';
export declare class Appointment {
    id: string;
    dateHour: Date;
    status: string;
    cost: number;
    payoutStatus: PayoutStatus;
    user: User;
    doctor: Doctor;
    schedule: DoctorSchedule;
    pago: UserPayment;
    createdAt: Date;
    updatedAt: Date;
}
