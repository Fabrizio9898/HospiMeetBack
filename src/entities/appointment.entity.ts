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
import { User } from './doctor.entity';
import { PatientPayment } from './user-payment.entity';
import { DoctorSchedule } from './doctor-schedules.entity';
import { AppointmentStatus } from 'src/enums/appointment.enum';
import { PayoutStatus } from 'src/enums/payoutStatus.enum';
import { SupportTicket } from './SupportTicket.entity';
import { DoctorPayment } from './doctor-payment.entity';
import { Patient } from './patient.entity';

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
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true
  })
  platformFee?: number;

  // 3. LO QUE LE CORRESPONDE AL DOCTOR (Neto Individual)
  // Se calcula al crear la cita: cost - platformFee
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: true
  })
  doctorNetIncome?: number;

  @Column({ type: 'varchar', nullable: true })
  meetingLink: string; // <--- AGREGADO: Necesitas guardar el link de Jitsi/Meet aquí

  @Column({ type: 'enum', enum: PayoutStatus, default: PayoutStatus.UNPAID })
  payoutStatus: PayoutStatus;

  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    onDelete: 'CASCADE'
  })
  patient: Patient;

  @ManyToOne(() => User, (doctor) => doctor.appointments, {
    onDelete: 'CASCADE'
  })
  doctor: User;

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

  @OneToOne(() => PatientPayment, (pago) => pago.turno)
  pago: PatientPayment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
