import { Module } from '@nestjs/common';
import { DoctorPaymentsService } from './doctor_payments.service';
import { DoctorPaymentsController } from './doctor_payments.controller';

@Module({
  controllers: [DoctorPaymentsController],
  providers: [DoctorPaymentsService],
})
export class DoctorPaymentsModule {}
