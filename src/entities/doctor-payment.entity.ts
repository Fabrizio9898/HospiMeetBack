import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Doctor } from './doctor.entity';
import { DoctorPaymentStatus } from 'src/enums/doctorPaymentStatus.enum';

@Entity('doctor_payments')
export class DoctorPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  montoNeto: number;

  @Column({
    type: 'enum',
    enum: DoctorPaymentStatus,
    default: DoctorPaymentStatus.PROCESSING
  })
  status: DoctorPaymentStatus;

  @ManyToOne(() => Doctor, (doctor) => doctor.pagosHonorarios, {
    onDelete: 'CASCADE'
  })
  doctor: Doctor;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
