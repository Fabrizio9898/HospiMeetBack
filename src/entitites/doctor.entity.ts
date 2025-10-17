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

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tarifaPorConsulta: number; // Precio base por cita

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
