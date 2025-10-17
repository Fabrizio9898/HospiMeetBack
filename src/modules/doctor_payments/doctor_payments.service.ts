import { Injectable } from '@nestjs/common';
import { CreateDoctorPaymentDto } from './dto/create-doctor_payment.dto';
import { UpdateDoctorPaymentDto } from './dto/update-doctor_payment.dto';

@Injectable()
export class DoctorPaymentsService {
  create(createDoctorPaymentDto: CreateDoctorPaymentDto) {
    return 'This action adds a new doctorPayment';
  }

  findAll() {
    return `This action returns all doctorPayments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorPayment`;
  }

  update(id: number, updateDoctorPaymentDto: UpdateDoctorPaymentDto) {
    return `This action updates a #${id} doctorPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorPayment`;
  }
}
