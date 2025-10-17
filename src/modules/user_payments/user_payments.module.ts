import { Module } from '@nestjs/common';
import { UserPaymentsService } from './user_payments.service';
import { UserPaymentsController } from './user_payments.controller';

@Module({
  controllers: [UserPaymentsController],
  providers: [UserPaymentsService],
})
export class UserPaymentsModule {}
