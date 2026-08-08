import type { Delivery } from "@/entities/delivery";
import type { Payment } from "@/entities/payment";
import type { ProductType } from "@/entities/product";

export const ORDER_STATUSES = [
  "confirmed",
  "preparing",
  "shipped",
  "completed",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderItem {
  readonly productId: string;
  readonly title: string;
  readonly type: ProductType;
  readonly unitPriceInCents: number;
  readonly quantity: number;
}

export interface Order {
  readonly id: string;
  readonly userId: string;
  readonly customerName: string;
  readonly customerEmail: string;
  readonly items: readonly OrderItem[];
  readonly subtotalInCents: number;
  readonly shippingInCents: number;
  readonly totalInCents: number;
  readonly delivery: Delivery;
  readonly payment: Payment;
  readonly status: OrderStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
}
