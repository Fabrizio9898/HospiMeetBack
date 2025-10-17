import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';
import { User } from './user.entity';
import { Doctor } from './doctor.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 5 }) // 1-5 estrellas
  calificacion: number;

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @ManyToOne(() => User, (usuario) => usuario.reviews, {
    onDelete: 'CASCADE'
  })
  user: User;


  @ManyToOne(() => Doctor, (doctor) => doctor.reviews, { onDelete: 'CASCADE' })
  doctor: Doctor;



}
