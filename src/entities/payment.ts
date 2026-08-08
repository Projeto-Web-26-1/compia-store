export const PAYMENT_METHODS = ["pix", "credit_card"] as const;
export const PAYMENT_STATUSES = ["approved", "refused"] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export interface Payment {
  readonly id: string;
  readonly method: PaymentMethod;
  readonly status: PaymentStatus;
  readonly transactionReference: string;
  readonly cardLastFour?: string;
  readonly processedAt: string;
}
