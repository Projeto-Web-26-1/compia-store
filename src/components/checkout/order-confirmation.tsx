"use client";

import Link from "next/link";
import { formatPrice } from "@/components/products/product-presentation";
import { EmptyState } from "@/components/ui/empty-state";
import { getPaymentMethodLabel } from "@/services/checkout-service";
import { useOrders } from "@/hooks/use-orders";
import { useSession } from "@/hooks/use-session";

interface OrderConfirmationProps {
  readonly orderId: string;
}

const DELIVERY_LABELS = {
  shipping: "Entrega simulada",
  pickup: "Retirada no local",
  digital: "Entrega digital",
} as const;

export function OrderConfirmation({ orderId }: OrderConfirmationProps) {
  const orders = useOrders();
  const session = useSession();
  const order = session.status === "authenticated"
    ? orders.find(
        (currentOrder) =>
          currentOrder.id === orderId && currentOrder.userId === session.user.id,
      )
    : null;

  if (!order) {
    return (
      <div className="container page-space page-narrow">
        <EmptyState
          action="Voltar ao catálogo"
          description="O pedido informado não existe para esta conta neste navegador."
          href="/produtos"
          icon="?"
          title="Pedido não encontrado"
        />
      </div>
    );
  }

  const displayId = order.id.replace("order-", "").slice(0, 8).toLocaleUpperCase("pt-BR");

  return (
    <div className="container page-space page-narrow">
      <section className="order-success">
        <span className="order-success__icon" aria-hidden="true">✓</span>
        <span className="eyebrow">Pagamento aprovado</span>
        <h1>Pedido confirmado</h1>
        <p>Seu pedido <strong>#{displayId}</strong> foi gerado e salvo neste navegador.</p>
      </section>

      <section className="order-confirmation-card">
        <div className="order-confirmation-grid">
          <div><span>Pagamento</span><strong>{getPaymentMethodLabel(order.payment.method)}</strong></div>
          <div><span>Recebimento</span><strong>{DELIVERY_LABELS[order.delivery.method]}</strong></div>
          <div><span>Total</span><strong>{formatPrice(order.totalInCents)}</strong></div>
        </div>
        <div className="order-confirmation-items">
          {order.items.map((item) => (
            <div key={item.productId}>
              <span>{item.title} · {item.quantity} un.</span>
              <strong>{formatPrice(item.unitPriceInCents * item.quantity)}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="order-success__actions">
        <Link className="button button--primary" href="/produtos">Continuar comprando</Link>
        <Link className="button button--secondary" href="/minha-conta">Ir para minha conta</Link>
      </div>
    </div>
  );
}
