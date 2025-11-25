import { SubscriptionPlan } from 'src/dtos/subscriptionPlan.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './user.entity';
import { SubscriptionStatus } from 'src/dtos/subscriptionStatus.dto';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (doctor) => doctor.subscriptions)
  doctor: User;

  @Column({ type: 'enum', enum: SubscriptionPlan })
  plan: SubscriptionPlan; // FREE_TRIAL, BASIC, PREMIUM, ENTERPRISE

  @Column({ type: 'varchar', nullable: true })
  externalSubscriptionId: string;

  // Qué proveedor maneja esta suscripción
  @Column({ type: 'varchar', nullable: true, default: 'mercadopago' })
  paymentProvider: string; // 'stripe' | 'mercadopago' | 'manu

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.TRIALING
  })
  status: SubscriptionStatus;

  @Column({ default: true })
  autoRenew: boolean;

  @Column({ nullable: true })
  lastPaymentId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
