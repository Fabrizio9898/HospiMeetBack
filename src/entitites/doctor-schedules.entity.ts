import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne
} from 'typeorm';
import { Doctor } from './doctor.entity';
import { Appointment } from './appointment.entity';

@Entity('doctor_schedules')
export class DoctorSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  horaInicio: string; // e.g., '14:00:00'

  @Column({ type: 'time' })
  horaFin: string; // e.g., '14:30:00'

  @Column({ type: 'date' })
  fecha: string; // e.g., '2025-10-17'

  @Column({ type: 'varchar', length: 50, default: 'disponible' }) // 'disponible', 'reservado', 'cancelado'
  estado: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.schedule, {
    onDelete: 'CASCADE'
  })
  doctor: Doctor;

  @Column()
  doctorId: number;

  // NUEVO: OneToOne inversa con la cita (solo una por slot)
  @OneToOne(() => Appointment, (appointment) => appointment.schedule)
  appointment: Appointment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
