import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity('doctor_weekly_availability')
export class DoctorAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' }) // 1=Lunes, 2=Martes, etc.
  diaSemana: number; // Ej: 1 para lunes

  @Column({ type: 'time' })
  horaInicio: string; // Ej: '09:00:00'

  @Column({ type: 'time' })
  horaFin: string; // Ej: '17:00:00'

  @Column({ type: 'int', default: 30 }) // Minutos por cita
  duracionCita: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.disponibilidades)
  doctor: Doctor;

  @Column()
  doctorId: number;

  @CreateDateColumn()
  createdAt: Date;
}
