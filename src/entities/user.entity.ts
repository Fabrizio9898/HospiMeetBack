import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne
} from 'typeorm';
import { DoctorSchedule } from './doctor-schedules.entity';
import { Appointment } from './appointment.entity';
import { DoctorPayment } from './doctor-payment.entity';
import { DoctorSpeciality } from './doctor-especiality.entity';
import { DoctorAvailability } from './doctor-availability.entity';
import { User_Status } from 'src/enums/userStatus.enum';
import { DoctorDocument } from './doctor-documentation.entity';
import { UserRole } from 'src/enums/roles.enum';
import { SupportTicket } from './SupportTicket.entity';
import { Subscription } from './subscription.entity';
import { Patient } from './patient.entity';
import { SubscriptionPlan } from 'src/dtos/subscriptionPlan.dto';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default:
      'https://res.cloudinary.com/dvgvcleky/image/upload/f_auto,q_auto/v1/RestO/ffgx6ywlaix0mb3jghux'
  })
  profile_image: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  fullname: string;

  @Column({ type: 'varchar', nullable: true })
  stripeCustomerId: string;

  @Column({
    type: 'enum',
    enum: SubscriptionPlan,
    default: SubscriptionPlan.FREE_TRIAL
  })
  currentPlan: SubscriptionPlan;

  @Column({ type: 'timestamp', nullable: true })
  planExpiresAt: Date;

  @Column({ type: 'varchar', length: 20, unique: true })
  dni: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  medicalLicenseNumber?: string;

  @Column({ default: 0 })
  strikes: number; // Cantidad de faltas

  @Column({
    type: 'enum',
    enum: User_Status,
    default: User_Status.INACTIVE
  })
  status: User_Status;

  @Column({ name: 'reset_password_token', nullable: true })
  resetPasswordToken: string;

  // Fecha de expiración del token
  @Column({ name: 'reset_password_expires', type: 'timestamp', nullable: true })
  resetPasswordExpires: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  tarifaPorConsulta?: number; // Precio base por cita

  @Column({ type: 'enum', enum: UserRole, default: UserRole.DOCTOR })
  role: UserRole;

  @Column({ type: 'text', nullable: true })
  rejectedReason?: string;

  @OneToMany(() => Patient, (patient) => patient.doctor)
  patients: Patient[];

  @ManyToOne(() => User, (user) => user.assistants, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  boss: User;

  @OneToMany(() => User, (user) => user.boss)
  assistants: User[];

  @OneToMany(() => Subscription, (sub) => sub.user)
  subscriptions: Subscription[];

  @OneToMany(() => SupportTicket, (ticket) => ticket.doctor)
  supportTickets: SupportTicket[];

  @OneToMany(() => DoctorDocument, (doc) => doc.doctor, { cascade: true })
  documents: DoctorDocument[];

  @OneToMany(() => DoctorSchedule, (horario) => horario.doctor)
  schedules: DoctorSchedule[];

  @OneToMany(() => Appointment, (turno) => turno.doctor)
  appointments: Appointment[];

  @OneToMany(() => DoctorPayment, (pago) => pago.doctor)
  pagosHonorarios: DoctorPayment[];

  @OneToMany(() => DoctorAvailability, (disp) => disp.doctor)
  disponibilidades: DoctorAvailability[];

  @ManyToMany(() => DoctorSpeciality, (especialidad) => especialidad.doctors)
  @JoinTable({
    name: 'doctors_specialities', // nombre tabla intermedia
    joinColumn: { name: 'doctorId', referencedColumnName: 'id' }, // columna que referencia Doctor
    inverseJoinColumn: { name: 'specialityId', referencedColumnName: 'id' } // columna que referencia Especialidad
  })
  specialities: DoctorSpeciality[];

  @Column({ type: 'timestamp', nullable: true })
  lastPaymentDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
