import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity('patient_payment')
export class PatientPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number; // Monto pagado por la cita

  @Column({ type: 'varchar', nullable: true })
  externalId: string;

  @Column({ type: 'varchar', length: 50, default: 'pendiente' }) // 'pendiente', 'completado', 'rechazado'
  estado: string;

  @Column({ type: 'varchar', length: 100 })
  metodoPago: string; // e.g., 'tarjeta', 'transferencia'

  @OneToOne(() => Appointment) // Ya no 'ManyToOne'
  @JoinColumn()
  turno: Appointment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
