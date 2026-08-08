import type { Address } from "@/entities/address";

export const DELIVERY_METHODS = ["shipping", "pickup", "digital"] as const;
export const DELIVERY_STATUSES = ["pending", "not_required"] as const;

export type DeliveryMethod = (typeof DELIVERY_METHODS)[number];
export type DeliveryStatus = (typeof DELIVERY_STATUSES)[number];

export interface Delivery {
  readonly method: DeliveryMethod;
  readonly status: DeliveryStatus;
  readonly shippingInCents: number;
  readonly address?: Address;
}
