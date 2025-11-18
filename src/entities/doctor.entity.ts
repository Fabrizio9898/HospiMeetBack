import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { DoctorSchedule } from './doctor-schedules.entity';
import { Appointment } from './appointment.entity';
import { Review } from './review.entity';
import { DoctorPayment } from './doctor-payment.entity';
import { DoctorSpeciality } from './doctor-especiality.entity';
import { DoctorAvailability } from './doctor-availability.entity';
import { Doctor_Status } from 'src/enums/doctorStatus.enum';
import { DoctorDocument } from './doctor-documentation.entity';
import { UserRole } from 'src/enums/roles.enum';
import { SupportTicket } from './tickets.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default:
      'https://res.cloudinary.com/dvgvcleky/image/upload/f_auto,q_auto/v1/RestO/ffgx6ywlaix0mb3jghux'
  })
  profile_image: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  fullname: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  dni: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  medicalLicenseNumber: string;

  @Column({
    type: 'enum',
    enum: Doctor_Status,
    default: Doctor_Status.INACTIVE
  })
  status: Doctor_Status;

  @Column({ type: 'varchar', length: 20 })
  phoneNumber: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tarifaPorConsulta: number; // Precio base por cita

  @Column({ type: 'enum', enum: UserRole, default: UserRole.DOCTOR })
  role: UserRole;

  @Column({ type: 'text', nullable: true })
  rejectedReason?: string;

  @OneToMany(() => SupportTicket, (ticket) => ticket.doctor)
  supportTickets: SupportTicket[];

  @OneToMany(() => DoctorDocument, (doc) => doc.doctor, { cascade: true })
  documents: DoctorDocument[];

  @OneToMany(() => DoctorSchedule, (horario) => horario.doctor)
  schedules: DoctorSchedule[];

  @OneToMany(() => Appointment, (turno) => turno.doctor)
  appointments: Appointment[];

  @OneToMany(() => Review, (review) => review.doctor)
  reviews: Review[];

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
