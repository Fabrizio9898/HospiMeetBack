import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Review } from './review.entity';
import { Appointment } from './appointment.entity';
import { UserRole } from 'src/enums/roles.enum';
import { SupportTicket } from './supportTickets.entity';

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

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PATIENT })
  role: UserRole;

  @OneToMany(() => Review, (review) => review.user, { nullable: true })
  reviews: Review[];

  @OneToMany(() => SupportTicket, (ticket) => ticket.patient)
  supportTickets: SupportTicket[];

  @OneToMany(() => Appointment, (reservation) => reservation.user, {
    nullable: true,
    cascade: true
  })
  appointments: Appointment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
