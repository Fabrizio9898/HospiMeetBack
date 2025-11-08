import { User } from './user.entity';
import { Doctor } from './doctor.entity';
export declare class Review {
    id: string;
    calificacion: number;
    comentario: string;
    user: User;
    doctor: Doctor;
}
