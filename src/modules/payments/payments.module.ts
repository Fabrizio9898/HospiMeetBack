import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentService } from './payments.service';
import { UserModule } from '../users/user.module';

@Module({
  imports:[UserModule],
  controllers: [PaymentsController],
  providers: [PaymentService]
})
export class PaymentsModule {}
