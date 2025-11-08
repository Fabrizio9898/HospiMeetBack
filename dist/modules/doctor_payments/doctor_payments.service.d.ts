import { CreateDoctorPaymentDto } from './dto/create-doctor_payment.dto';
import { UpdateDoctorPaymentDto } from './dto/update-doctor_payment.dto';
export declare class DoctorPaymentsService {
    create(createDoctorPaymentDto: CreateDoctorPaymentDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDoctorPaymentDto: UpdateDoctorPaymentDto): string;
    remove(id: number): string;
}
