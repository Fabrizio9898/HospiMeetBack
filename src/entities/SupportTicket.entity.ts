import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { TicketPriority } from 'src/enums/tickets/ticketPriority.enum';
import { TicketCategory } from 'src/enums/tickets/ticketCategory.enum';
import { Appointment } from './appointment.entity';
import { TicketStatus } from 'src/enums/tickets/ticketStatus.enum';
import { User } from './doctor.entity';
import { UserRole } from 'src/enums/roles.enum';
import { TicketReason } from 'src/enums/tickets/ticketReason.enum';

@Entity('support_tickets')
export class SupportTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (doctor) => doctor.supportTickets, {
    nullable: true
  })
  doctor: User;

  @Column({ type: 'enum', enum: UserRole })
  reporterRole: UserRole;

  @ManyToOne(() => Appointment, (appointment) => appointment.supportTickets, {
    nullable: true
  })
  appointment: Appointment;

  // --- DATOS DEL PROBLEMA ---

  @Column({ type: 'enum', enum: TicketCategory })
  category: TicketCategory;

  // NUEVA COLUMNA
  @Column({ type: 'enum', enum: TicketReason, nullable: false })
  reason: TicketReason;

  @Column({
    type: 'enum',
    enum: TicketPriority,
    default: TicketPriority.MEDIUM
  })
  priority: TicketPriority; // Se calcula en el backend al crear

  @Column({ nullable: true })
  subject: string; // Ej: "El doctor no se presentó"

  @Column({ type: 'text' })
  description: string; // El detalle largo del problema

  @Column({ name: 'attachment_url', nullable: true })
  attachmentUrl: string;

  // --- GESTIÓN DEL ESTADO ---

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.OPEN })
  status: TicketStatus;

  // --- RESPUESTAS ---

  @Column({ name: 'admin_response', type: 'text', nullable: true })
  adminResponse: string; // Lo que ve el usuario final

  @Column({ name: 'internal_notes', type: 'text', nullable: true })
  internalNotes: string; // Notas privadas del admin (ej: "Revisé logs, todo ok")

  // --- TIMESTAMPS ---

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
