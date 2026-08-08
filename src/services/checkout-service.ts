import { canPurchase, controlsStock } from "@/domain/catalog/product-rules";
import type { Address } from "@/entities/address";
import type { Delivery, DeliveryMethod } from "@/entities/delivery";
import type { Order, OrderItem } from "@/entities/order";
import type { Payment, PaymentMethod } from "@/entities/payment";
import type { Product } from "@/entities/product";
import type { User } from "@/entities/user";
import { cartRepository } from "@/repositories/cart-repository";
import { saveOrder } from "@/repositories/order-repository";
import {
  findProductById,
  saveProduct,
} from "@/repositories/product-repository";

const SHIPPING_IN_CENTS = 1500;

export type CheckoutErrorCode =
  | "cart_empty"
  | "product_not_found"
  | "stock_changed"
  | "delivery_invalid"
  | "address_invalid"
  | "payment_invalid"
  | "customer_invalid";

export type CheckoutPaymentInput =
  | { readonly method: "pix" }
  | {
      readonly method: "credit_card";
      readonly cardHolder: string;
      readonly cardNumber: string;
      readonly expiration: string;
      readonly securityCode: string;
    };

export interface CompleteCheckoutInput {
  readonly user: User;
  readonly deliveryMethod: DeliveryMethod;
  readonly address?: Address;
  readonly payment: CheckoutPaymentInput;
}

export type CompleteCheckoutResult =
  | { readonly ok: true; readonly order: Order }
  | { readonly ok: false; readonly error: CheckoutErrorCode };

interface ResolvedCartLine {
  readonly product: Product;
  readonly quantity: number;
}

function normalizeAddress(address: Address): Address {
  return {
    street: address.street.trim(),
    number: address.number.trim(),
    complement: address.complement?.trim() || undefined,
    neighborhood: address.neighborhood.trim(),
    city: address.city.trim(),
    state: address.state.trim().toLocaleUpperCase("pt-BR"),
    zipCode: address.zipCode.replace(/\D/g, ""),
  };
}

function isValidAddress(address: Address): boolean {
  return (
    Boolean(address.street) &&
    Boolean(address.number) &&
    Boolean(address.neighborhood) &&
    Boolean(address.city) &&
    /^[A-Z]{2}$/.test(address.state) &&
    /^\d{8}$/.test(address.zipCode)
  );
}

function createPayment(input: CheckoutPaymentInput, processedAt: string): Payment | null {
  const paymentId = `payment-${crypto.randomUUID()}`;

  if (input.method === "pix") {
    return {
      id: paymentId,
      method: "pix",
      status: "approved",
      transactionReference: `PIX-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      processedAt,
    };
  }

  const cardNumber = input.cardNumber.replace(/\D/g, "");
  const securityCode = input.securityCode.replace(/\D/g, "");

  if (
    !input.cardHolder.trim() ||
    !/^\d{16}$/.test(cardNumber) ||
    !/^\d{2}\/\d{2}$/.test(input.expiration.trim()) ||
    !/^\d{3}$/.test(securityCode)
  ) {
    return null;
  }

  return {
    id: paymentId,
    method: "credit_card",
    status: "approved",
    transactionReference: `CARD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    cardLastFour: cardNumber.slice(-4),
    processedAt,
  };
}

function createOrderItem(line: ResolvedCartLine): OrderItem {
  return {
    productId: line.product.id,
    title: line.product.title,
    type: line.product.type,
    unitPriceInCents: line.product.priceInCents,
    quantity: line.quantity,
  };
}

export function completeCheckout(input: CompleteCheckoutInput): CompleteCheckoutResult {
  if (input.user.role !== "customer") {
    return { ok: false, error: "customer_invalid" };
  }

  const cartItems = cartRepository.getItems();

  if (cartItems.length === 0) {
    return { ok: false, error: "cart_empty" };
  }

  const resolvedLines: ResolvedCartLine[] = [];

  for (const item of cartItems) {
    const product = findProductById(item.productId);

    if (!product) {
      return { ok: false, error: "product_not_found" };
    }

    if (!canPurchase(product, item.quantity)) {
      return { ok: false, error: "stock_changed" };
    }

    resolvedLines.push({ product, quantity: item.quantity });
  }

  const hasShippableProduct = resolvedLines.some(({ product }) => controlsStock(product));
  const effectiveDeliveryMethod: DeliveryMethod = hasShippableProduct
    ? input.deliveryMethod
    : "digital";

  if (hasShippableProduct && effectiveDeliveryMethod === "digital") {
    return { ok: false, error: "delivery_invalid" };
  }

  let normalizedAddress: Address | undefined;

  if (effectiveDeliveryMethod === "shipping") {
    if (!input.address) {
      return { ok: false, error: "address_invalid" };
    }

    normalizedAddress = normalizeAddress(input.address);

    if (!isValidAddress(normalizedAddress)) {
      return { ok: false, error: "address_invalid" };
    }
  }

  const now = new Date().toISOString();
  const payment = createPayment(input.payment, now);

  if (!payment) {
    return { ok: false, error: "payment_invalid" };
  }

  const orderItems = resolvedLines.map(createOrderItem);
  const subtotalInCents = orderItems.reduce(
    (subtotal, item) => subtotal + item.unitPriceInCents * item.quantity,
    0,
  );
  const shippingInCents = effectiveDeliveryMethod === "shipping" ? SHIPPING_IN_CENTS : 0;
  const delivery: Delivery = {
    method: effectiveDeliveryMethod,
    status: effectiveDeliveryMethod === "digital" ? "not_required" : "pending",
    shippingInCents,
    address: normalizedAddress,
  };
  const order: Order = {
    id: `order-${crypto.randomUUID()}`,
    userId: input.user.id,
    customerName: input.user.name,
    customerEmail: input.user.email,
    items: orderItems,
    subtotalInCents,
    shippingInCents,
    totalInCents: subtotalInCents + shippingInCents,
    delivery,
    payment,
    status: "confirmed",
    createdAt: now,
    updatedAt: now,
  };

  for (const { product, quantity } of resolvedLines) {
    if (controlsStock(product) && product.stock !== null) {
      saveProduct({
        ...product,
        stock: product.stock - quantity,
        updatedAt: now,
      });
    }
  }

  saveOrder(order);
  cartRepository.clear();
  return { ok: true, order };
}

export function getCheckoutShippingInCents(
  hasShippableProduct: boolean,
  deliveryMethod: DeliveryMethod,
): number {
  return hasShippableProduct && deliveryMethod === "shipping" ? SHIPPING_IN_CENTS : 0;
}

export function getPaymentMethodLabel(method: PaymentMethod): string {
  return method === "pix" ? "PIX" : "Cartão de crédito";
}
