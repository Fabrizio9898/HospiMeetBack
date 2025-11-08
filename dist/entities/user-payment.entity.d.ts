import { Appointment } from './appointment.entity';
export declare class UserPayment {
    id: string;
    monto: number;
    estado: string;
    metodoPago: string;
    turno: Appointment;
    createdAt: Date;
    updatedAt: Date;
}
