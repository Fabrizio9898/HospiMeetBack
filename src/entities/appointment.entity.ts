import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { User } from './user.entity';
import { Doctor } from './doctor.entity';
import { UserPayment } from './user-payment.entity';
import { DoctorSchedule } from './doctor-schedules.entity';
import { AppointmentStatus } from 'src/enums/appointment.enum';
import { PayoutStatus } from 'src/enums/payoutStatus.enum';
import { SupportTicket } from './Tickets.entity';

@Entity('apointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  dateHour: Date; // Fecha y hora de la cita

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING
  })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @Column({ type: 'enum', enum: PayoutStatus, default: PayoutStatus.UNPAID })
  payoutStatus: PayoutStatus;

  @ManyToOne(() => User, (usuario) => usuario.appointments, {
    onDelete: 'CASCADE'
  })
  user: User;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, {
    onDelete: 'CASCADE'
  })
  doctor: Doctor;

  @OneToMany(() => SupportTicket, (ticket) => ticket.appointment)
  supportTickets: SupportTicket[];

  @OneToOne(() => DoctorSchedule, (schedule) => schedule.appointment, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'scheduleId' }) // FK explícita en esta tabla
  schedule: DoctorSchedule;

  @OneToOne(() => UserPayment, (pago) => pago.turno)
  pago: UserPayment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
