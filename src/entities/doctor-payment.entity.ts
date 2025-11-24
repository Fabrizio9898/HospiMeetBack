import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne
} from 'typeorm';
import { Doctor } from './doctor.entity';
import { DoctorPaymentStatus } from 'src/enums/doctorPaymentStatus.enum';
import { Appointment } from './appointment.entity';

@Entity('doctor_payments')
export class DoctorPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 1. MONTO TOTAL DE LA TRANSFERENCIA (Suma de los Netos)
  // En tu ejemplo tenías 'montoNeto', está bien, pero a nivel transferencia es el "Total a transferir".
  // Ej: 800.00 (Suma de 10 citas de 80)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  montoNeto: number;

  @Column({ type: 'date', nullable: true })
  periodStart?: Date;

  @Column({ type: 'date', nullable: true })
  periodEnd?: Date;

  @Column({
    type: 'enum',
    enum: DoctorPaymentStatus,
    default: DoctorPaymentStatus.PROCESSING
  })
  status: DoctorPaymentStatus;

  @OneToMany(() => Appointment, (appt) => appt.doctorPayment)
  appointments: Appointment[];

  @ManyToOne(() => Doctor, (doctor) => doctor.pagosHonorarios, {
    onDelete: 'CASCADE'
  })
  doctor: Doctor;

  @CreateDateColumn()
  paidAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
