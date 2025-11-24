export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAST_DUE = 'past_due', // Hubo error de pago, pero le damos unos días
  CANCELED = 'canceled',
  TRIALING = 'trialing',
  EXPIRED = 'expired'
}
