import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Doctor } from './doctor.entity';
import { UserPayment } from './user-payment.entity';

@Entity('doctor_payments')
export class DoctorPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  montoBruto: number; // Monto total del pago de la cita

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.1 }) // Comisión % (10% ejemplo)
  comisionPorcentaje: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Calculado: montoBruto * (1 - comision)
  montoNeto: number;

  @Column({ type: 'varchar', length: 50, default: 'pendiente' }) // 'pendiente', 'enviado'
  estado: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.pagosHonorarios, {
    onDelete: 'CASCADE'
  })
  doctor: Doctor;

  @Column()
  doctorId: number;

  @ManyToOne(() => UserPayment, (pago) => pago.pagosHonorarios, {
    onDelete: 'CASCADE'
  })
  pago: UserPayment;

  @Column()
  pagoId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
