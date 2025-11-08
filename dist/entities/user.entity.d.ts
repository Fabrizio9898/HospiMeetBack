import { Review } from './review.entity';
import { Appointment } from './appointment.entity';
import { UserRole } from 'src/enums/roles.enum';
export declare class User {
    id: string;
    name: string;
    email: string;
    profile_image: string;
    password: string;
    role: UserRole;
    reviews: Review[];
    appointments: Appointment[];
    createdAt: Date;
    updatedAt: Date;
}
