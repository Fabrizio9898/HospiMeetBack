import { Test, TestingModule } from '@nestjs/testing';
import { DoctorPaymentsController } from './doctor_payments.controller';
import { DoctorPaymentsService } from './doctor_payments.service';

describe('DoctorPaymentsController', () => {
  let controller: DoctorPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorPaymentsController],
      providers: [DoctorPaymentsService],
    }).compile();

    controller = module.get<DoctorPaymentsController>(DoctorPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
