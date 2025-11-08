import { UserPaymentsService } from './user_payments.service';
import { CreateUserPaymentDto } from './dto/create-user_payment.dto';
import { UpdateUserPaymentDto } from './dto/update-user_payment.dto';
export declare class UserPaymentsController {
    private readonly userPaymentsService;
    constructor(userPaymentsService: UserPaymentsService);
    create(createUserPaymentDto: CreateUserPaymentDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserPaymentDto: UpdateUserPaymentDto): string;
    remove(id: string): string;
}
