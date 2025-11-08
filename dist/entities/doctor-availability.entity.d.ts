import { Doctor } from './doctor.entity';
export declare class DoctorAvailability {
    id: number;
    diaSemana: number;
    horaInicio: string;
    horaFin: string;
    duracionCita: number;
    doctor: Doctor;
    doctorId: number;
    createdAt: Date;
}
