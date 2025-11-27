import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCheckOutDto } from 'src/dtos/createCheckOut.dto';
import { PaymentProvider } from 'src/enums/paymentProvider.enum';
import { MercadoPagoConfig, PreApproval } from 'mercadopago'; 
import { UserService } from '../users/user.service';
import { ConfigService } from '@nestjs/config';
import { PlanId } from 'src/enums/planId.enum';

type PlanConfig = {
  title: string;
  mpPrice: number;
  stripeId: string;
};

@Injectable()
export class PaymentService {
  private client: MercadoPagoConfig;
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService
  ) {
    this.client = new MercadoPagoConfig({
      accessToken: this.configService.getOrThrow<string>('MP_ACCESS_TOKEN')
    });
  }

  private readonly PLAN_MAP: Record<PlanId, PlanConfig> = {
    [PlanId.PROFESSIONAL]: {
      title: 'SaaS Médico - Plan Profesional',
      stripeId: 'price_1Q5x...', // ID de Stripe (Obligatorio crearlo en Stripe)
      mpPrice: 30000 // Precio en ARS para MercadoPago
    }
  };

  async createCheckout(user, dto: CreateCheckOutDto) {
    const plan = this.PLAN_MAP[dto.planId];

    if (!plan) throw new BadRequestException('El plan no existe');

    if (dto.provider === PaymentProvider.MERCADOPAGO) {
      return this.generateMercadoPagoLink(user, plan);
    }

    if (dto.provider === PaymentProvider.STRIPE) {
      return this.generateStripeLink(user, plan.stripeId);
    }

    throw new BadRequestException('Proveedor inválido');
  }
  // --- MÉTODOS PRIVADOS (Aquí iría la integración real) ---

  private async generateMercadoPagoLink(user: any, plan:PlanConfig) {
    try {
      // 2. Instanciamos la clase de Suscripciones
      const preapproval = new PreApproval(this.client);

      // 3. Creamos la solicitud de suscripción
      const response = await preapproval.create({
        body: {
          reason: plan.title,
          external_reference: user.id,
          payer_email: user.email,
          auto_recurring: {
            frequency: 1,
            frequency_type: 'months',
            transaction_amount: plan.mpPrice, // PRECIO DEL PLAN
            currency_id: 'ARS'
          },
          back_url: 'https://tu-saas.com/dashboard',
          status: 'pending'
        }
      });

      // 4. Devolvemos el LINK MÁGICO
      return { url: response.init_point };
    } catch (error) {
      console.error('Error creando suscripción MP:', error);
      throw new InternalServerErrorException(
        'No se pudo generar el link de pago'
      );
    }
  }

  private async generateStripeLink(user: any, externalPriceId: string) {
    console.log(
      `Generando link de Stripe para usuario ${user.email} al plan ${externalPriceId}`
    );

    /**
     * TODO: INTEGRACIÓN REAL
     * 1. Importar SDK de Stripe
     * 2. Verificar si user.stripeCustomerId existe, sino crearlo.
     * 3. const session = await stripe.checkout.sessions.create({
     * customer: user.stripeCustomerId,
     * line_items: [{ price: externalPriceId, quantity: 1 }],
     * mode: 'subscription',
     * success_url: 'tusitio.com/success',
     * cancel_url: 'tusitio.com/cancel',
     * })
     * 4. return { url: session.url }
     */

    // MOCK (Simulación)
    return { url: 'https://checkout.stripe.com/pay/cs_test_SIMULADO' };
  }
}
