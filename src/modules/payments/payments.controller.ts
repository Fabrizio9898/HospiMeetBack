import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateCheckOutDto } from 'src/dtos/createCheckOut.dto';
import { PaymentService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  async createCheckoutSession(@Req() req, @Body() dto: CreateCheckOutDto) {
    const user = req.user;
    return await this.paymentService.createCheckout(user, dto);
  }
}
