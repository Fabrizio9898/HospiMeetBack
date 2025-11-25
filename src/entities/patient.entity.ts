import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm';
import { User } from './user.entity';
import { Appointment } from './appointment.entity';

@Entity('patients')
@Index(['dni', 'doctor'], { unique: true, where: '"dni" IS NOT NULL' })
@Index(['email', 'doctor'], { unique: true, where: '"email" IS NOT NULL' })
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  fullname: string; // Nombre completo del paciente

  @Column({ type: 'varchar', length: 100, nullable: true })
  email?: string; // Opcional: para enviar el link de pago por correo

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string; // Opcional: para enviar link por WhatsApp

  @Column({ type: 'varchar', length: 20, nullable: true })
  dni?: string; // Opcional: para facturación o historial médico

  // RELACIÓN CLAVE: El paciente "pertenece" a un Doctor
  @ManyToOne(() => User, (doctor) => doctor.patients, {
    onDelete: 'CASCADE' // Si se borra el doctor, se borran sus pacientes (lógica SaaS)
  })
  doctor: User;

  // Un paciente puede tener múltiples turnos históricos o futuros
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
