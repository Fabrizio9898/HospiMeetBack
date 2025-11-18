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
import { SupportTicket } from './tickets.entity';
import { DoctorPayment } from './doctor-payment.entity';

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

  // 1. LO QUE PAGÓ EL PACIENTE (Bruto)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  // 2. LO QUE TE QUEDAS TÚ (Comisión)
  // Se calcula al crear la cita: cost * 0.20
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  platformFee: number;

  // 3. LO QUE LE CORRESPONDE AL DOCTOR (Neto Individual)
  // Se calcula al crear la cita: cost - platformFee
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  doctorNetIncome: number;

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

  // 5. RELACIÓN CON EL PAGO GRUPAL (El "Sobre")
  // Esto dice: "Esta cita de $80 se pagó dentro del Sobre #555"
  @ManyToOne(() => DoctorPayment, (payment) => payment.appointments, {
    nullable: true
  })
  doctorPayment: DoctorPayment;

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
