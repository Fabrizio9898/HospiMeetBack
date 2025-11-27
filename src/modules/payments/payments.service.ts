import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCheckOutDto } from 'src/dtos/createCheckOut.dto';
import { PaymentProvider } from 'src/enums/paymentProvider.enum';
import { MercadoPagoConfig, PreApproval } from 'mercadopago'; 
import { UserService } from '../users/user.service';
import { ConfigService } from '@nestjs/config';
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

  private readonly PLAN_MAP = {
    PLAN_PROFESSIONAL: {
      title: 'SaaS Médico - Plan Profesional',
      stripeId: 'price_1Q5x...', // ID de Stripe (Obligatorio crearlo en Stripe)
      mpPrice: 30000 // Precio en ARS para MercadoPago
    }
  };

  async createCheckout(user: any, dto: CreateCheckOutDto) {
    // user: any o User entity

    // 1. Validar que el plan existe en nuestro mapa
    const selectedPlan = this.PLAN_MAP[dto.planId];
    if (!selectedPlan) {
      throw new BadRequestException('El plan seleccionado no es válido');
    }

    // 2. Lógica para MERCADOPAGO (Argentina)
    if (dto.provider === PaymentProvider.MERCADOPAGO) {
      return this.generateMercadoPagoLink(
        user,
        selectedPlan.mpPrice,
        selectedPlan.title
      );
    }

    // 3. Lógica para STRIPE (Internacional)
    if (dto.provider === PaymentProvider.STRIPE) {
      return this.generateStripeLink(user, selectedPlan.stripeId);
    }
  }

  // --- MÉTODOS PRIVADOS (Aquí iría la integración real) ---

  private async generateMercadoPagoLink(
    user: any,
    price: number,
    title: string
  ) {
    try {
      // 2. Instanciamos la clase de Suscripciones
      const preapproval = new PreApproval(this.client);

      // 3. Creamos la solicitud de suscripción
      const response = await preapproval.create({
        body: {
          reason: title, // Título que ve el usuario
          external_reference: user.id, // CLAVE: Tu ID de usuario para identificarlo cuando pague
          payer_email: user.email,
          auto_recurring: {
            frequency: 1,
            frequency_type: 'months',
            transaction_amount: price, // PRECIO DEL PLAN
            currency_id: 'ARS'
          },
          back_url: 'https://tu-saas.com/dashboard', // A donde vuelve después de pagar
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
