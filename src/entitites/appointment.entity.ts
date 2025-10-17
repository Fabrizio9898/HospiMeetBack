import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm';
import { User } from './user.entity';
import { Doctor } from './doctor.entity';
import { DoctorPayment } from './doctor-payment.entity';
import { UserPayment } from './user-payment.entity';
import { DoctorSchedule } from './doctor-schedules.entity';

@Entity('apointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  fechaHora: Date; // Fecha y hora de la cita

  @Column({ type: 'varchar', length: 255, nullable: true })
  notas: string; // Notas del paciente

  @Column({ type: 'varchar', length: 50, default: 'reservado' }) // 'reservado', 'completado', 'cancelado'
  estado: string;

  @ManyToOne(() => User, (usuario) => usuario.appointments, {
    onDelete: 'CASCADE'
  })
  user: User;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, { onDelete: 'CASCADE' })
  doctor: Doctor;

  @Column()
  doctorId: number;

  @OneToOne(() => DoctorSchedule, (schedule) => schedule.appointment, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'scheduleId' }) // FK explícita en esta tabla
  schedule: DoctorSchedule;

  @Column()
  horarioId: number;

  @OneToOne(() => UserPayment, (pago) => pago.turno)
  pago: UserPayment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
