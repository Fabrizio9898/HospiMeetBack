import { DoctorPaymentsService } from './doctor_payments.service';
import { CreateDoctorPaymentDto } from './dto/create-doctor_payment.dto';
import { UpdateDoctorPaymentDto } from './dto/update-doctor_payment.dto';
export declare class DoctorPaymentsController {
    private readonly doctorPaymentsService;
    constructor(doctorPaymentsService: DoctorPaymentsService);
    create(createDoctorPaymentDto: CreateDoctorPaymentDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDoctorPaymentDto: UpdateDoctorPaymentDto): string;
    remove(id: string): string;
}
