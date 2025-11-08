import { Doctor } from './doctor.entity';
import { Appointment } from './appointment.entity';
import { DoctorScheduleStatus } from 'src/enums/doctor-schedule.enum';
export declare class DoctorSchedule {
    id: string;
    horaInicio: string;
    horaFin: string;
    fecha: string;
    estado: DoctorScheduleStatus;
    doctor: Doctor;
    appointment: Appointment;
    createdAt: Date;
    updatedAt: Date;
}
