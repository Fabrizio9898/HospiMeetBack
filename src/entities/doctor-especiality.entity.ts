import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany
} from 'typeorm';
import { User } from './doctor.entity'; // Relación inversa

@Entity('doctor_specialities')
export class DoctorSpeciality {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string; // ej: 'Medicina General'

  @Column({ type: 'text', nullable: true })
  description: string; // ej: 'Consultas generales de salud'

  @ManyToMany(() => User, (doctor) => doctor.specialities) // Si ManyToMany
  doctors: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
