import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Appointment } from './appointment.entity';
import { DoctorPayment } from './doctor-payment.entity';

@Entity('user_payments')
export class UserPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number; // Monto pagado por la cita

  @Column({ type: 'varchar', length: 50, default: 'pendiente' }) // 'pendiente', 'completado', 'rechazado'
  estado: string;

  @Column({ type: 'varchar', length: 100 })
  metodoPago: string; // e.g., 'tarjeta', 'transferencia'

  @ManyToOne(() => Appointment, (turno) => turno.pago, { onDelete: 'CASCADE' })
  turno: Appointment;

  @Column()
  turnoId: number;

  @OneToMany(() => DoctorPayment, (pagoHonorario) => pagoHonorario.pago)
  pagosHonorarios: DoctorPayment[]; // Para desembolso posterior

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
