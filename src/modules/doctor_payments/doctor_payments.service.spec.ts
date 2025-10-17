import { Test, TestingModule } from '@nestjs/testing';
import { DoctorPaymentsService } from './doctor_payments.service';

describe('DoctorPaymentsService', () => {
  let service: DoctorPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorPaymentsService],
    }).compile();

    service = module.get<DoctorPaymentsService>(DoctorPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
