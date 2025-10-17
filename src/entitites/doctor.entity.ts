import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { DoctorSchedule } from './doctor-schedules.entity';
import { Appointment } from './appointment.entity';
import { Review } from './review.entity';
import { DoctorPayment } from './doctor-payment.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string; // Hashéalo

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @Column({ type: 'text', nullable: true })
  especialidad: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tarifaPorConsulta: number; // Precio base por cita

  @OneToMany(() => DoctorSchedule, (horario) => horario.doctor)
  schedule: DoctorSchedule[];

  @OneToMany(() => Appointment, (turno) => turno.doctor)
  appointments: Appointment[];

  @OneToMany(() => Review, (review) => review.doctor)
  reviews: Review[];

  @OneToMany(() => DoctorPayment, (pago) => pago.doctor)
  pagosHonorarios: DoctorPayment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
