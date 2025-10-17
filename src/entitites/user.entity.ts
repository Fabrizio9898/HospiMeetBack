import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Review } from './review.entity';
import { Appointment } from './appointment.entity';



@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ unique: true, length: 50, nullable: false })
  email: string;

  @Column({ default: null })
  stripeCustomerId: string;

  @Column({
    default:
      'https://res.cloudinary.com/dvgvcleky/image/upload/f_auto,q_auto/v1/RestO/ffgx6ywlaix0mb3jghux'
  })
  profile_image: string;

  @Column({ length: 128, nullable: true })
  password?: string;

  // @Column({ nullable: true, unique: true })
  // authtoken?: string;


  @Column({ type: 'enum', enum: ['PATIENT', 'ADMIN'], default: 'PATIENT' })
  role: 'PATIENT' | 'ADMIN';


  // @OneToMany(() => Payment, (payment) => payment.field, { nullable: true })
  // payments: Payment[];

  @OneToMany(() => Review, (review) => review.user, { nullable: true })
  reviews: Review[];



@OneToMany(() => Appointment, (reservation) => reservation.user, {
    nullable: true,
    cascade: true
  })
  appointments: Appointment[];

}
