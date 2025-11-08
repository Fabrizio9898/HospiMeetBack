import { CreateUserPaymentDto } from './dto/create-user_payment.dto';
import { UpdateUserPaymentDto } from './dto/update-user_payment.dto';
export declare class UserPaymentsService {
    create(createUserPaymentDto: CreateUserPaymentDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserPaymentDto: UpdateUserPaymentDto): string;
    remove(id: number): string;
}
