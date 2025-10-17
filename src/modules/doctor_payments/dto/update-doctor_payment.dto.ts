import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorPaymentDto } from './create-doctor_payment.dto';

export class UpdateDoctorPaymentDto extends PartialType(CreateDoctorPaymentDto) {}
