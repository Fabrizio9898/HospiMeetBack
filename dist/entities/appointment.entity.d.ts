import { User } from './user.entity';
import { Doctor } from './doctor.entity';
import { UserPayment } from './user-payment.entity';
import { DoctorSchedule } from './doctor-schedules.entity';
import { PayoutStatus } from 'src/enums/payoutStatus.enum';
import { SupportTicket } from './supportTickets.entity';
export declare class Appointment {
    id: string;
    dateHour: Date;
    status: string;
    cost: number;
    payoutStatus: PayoutStatus;
    user: User;
    doctor: Doctor;
    supportTickets: SupportTicket[];
    schedule: DoctorSchedule;
    pago: UserPayment;
    createdAt: Date;
    updatedAt: Date;
}
