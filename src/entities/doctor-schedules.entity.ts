import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne
} from 'typeorm';
import { User } from './user.entity';
import { Appointment } from './appointment.entity';
import { DoctorScheduleStatus } from 'src/enums/doctor-schedule.enum';

@Entity('doctor_schedules')
export class DoctorSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'time' })
  horaInicio: string; // e.g., '14:00:00'

  @Column({ type: 'time' })
  horaFin: string; // e.g., '14:30:00'

  @Column({ type: 'date' })
  fecha: string; // e.g., '2025-10-17'

  @Column({
    type: 'enum',
    enum: DoctorScheduleStatus,
    default: DoctorScheduleStatus.AVAILABLE
  })
  estado: DoctorScheduleStatus;

  @ManyToOne(() => User, (doctor) => doctor.schedules, {
    onDelete: 'CASCADE'
  })
  doctor: User;

  @OneToOne(() => Appointment, (appointment) => appointment.schedule)
  appointment: Appointment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
