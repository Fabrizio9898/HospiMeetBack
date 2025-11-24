import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Review } from './review.entity';
import { Appointment } from './appointment.entity';
import { UserRole } from 'src/enums/roles.enum';
import { SupportTicket } from './SupportTicket.entity';
import { ManyToOne } from 'typeorm/browser';
import { Doctor } from './doctor.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  fullname: string;

  @Column({ unique: true, length: 50, nullable: false })
  email: string;

  @Column({
    default:
      'https://res.cloudinary.com/dvgvcleky/image/upload/f_auto,q_auto/v1/RestO/ffgx6ywlaix0mb3jghux'
  })
  profile_image: string;

  @Column({ length: 128, nullable: false })
  password: string;

  @ManyToOne(()=>Doctor)
  doctor:Doctor

  @Column({ type: 'enum', enum: UserRole, default: UserRole.ASSISTANT })
  role: UserRole;

  @Column({ name: 'reset_password_token', nullable: true })
  resetPasswordToken: string;

  // Fecha de expiración del token
  @Column({ name: 'reset_password_expires', type: 'timestamp', nullable: true })
  resetPasswordExpires: Date;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
