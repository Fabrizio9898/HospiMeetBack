import { User } from './user.entity';
import { TicketPriority } from 'src/enums/tickets/ticketPriority.enum';
import { TicketCategory } from 'src/enums/tickets/ticketCategory.enum';
import { Appointment } from './appointment.entity';
import { TicketStatus } from 'src/enums/tickets/ticketStatus.enum';
import { Doctor } from './doctor.entity';
import { UserRole } from 'src/enums/roles.enum';
export declare class SupportTicket {
    id: string;
    patient: User;
    doctor: Doctor;
    reporterRole: UserRole;
    appointment: Appointment;
    category: TicketCategory;
    priority: TicketPriority;
    subject: string;
    description: string;
    attachmentUrl: string;
    status: TicketStatus;
    adminResponse: string;
    internalNotes: string;
    createdAt: Date;
    updatedAt: Date;
}
