import { User } from 'src/entities/user.entity';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<Pick<User, "email">>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export declare class UpdatePasswordDto {
    actual_password: string;
    newPassword: string;
    confirm_password: string;
}
export {};
