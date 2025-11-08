import { User } from 'src/entities/user.entity';
declare const UserClean_base: import("@nestjs/common").Type<Omit<User, "password" | "createdAt" | "updatedAt" | "appointments" | "reviews">>;
export declare class UserClean extends UserClean_base {
}
export {};
