import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorPaymentsService } from './doctor_payments.service';
import { CreateDoctorPaymentDto } from './dto/create-doctor_payment.dto';
import { UpdateDoctorPaymentDto } from './dto/update-doctor_payment.dto';

@Controller('doctor-payments')
export class DoctorPaymentsController {
  constructor(private readonly doctorPaymentsService: DoctorPaymentsService) {}

  @Post()
  create(@Body() createDoctorPaymentDto: CreateDoctorPaymentDto) {
    return this.doctorPaymentsService.create(createDoctorPaymentDto);
  }

  @Get()
  findAll() {
    return this.doctorPaymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorPaymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorPaymentDto: UpdateDoctorPaymentDto) {
    return this.doctorPaymentsService.update(+id, updateDoctorPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorPaymentsService.remove(+id);
  }
}
