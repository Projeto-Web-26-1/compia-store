"use client";

import { formatPrice } from "@/components/products/product-presentation";
import { EmptyState } from "@/components/ui/empty-state";
import { getPaymentMethodLabel } from "@/services/checkout-service";
import { useOrders } from "@/hooks/use-orders";
import { useSession } from "@/hooks/use-session";

const DELIVERY_LABELS = {
  shipping: "Entrega simulada",
  pickup: "Retirada no local",
  digital: "Entrega digital",
} as const;

const STATUS_LABELS: Record<string, string> = {
  confirmed: "Confirmado",
  preparing: "Preparando",
  shipped: "Enviado",
  completed: "Concluído",
  cancelled: "Cancelado",
};

interface CustomerOrderDetailProps {
  readonly orderId: string;
}

export function CustomerOrderDetail({ orderId }: CustomerOrderDetailProps) {
  const session = useSession();
  const orders = useOrders();

  if (session.status !== "authenticated") {
    return null;
  }

  const order = orders.find(
    (currentOrder) => currentOrder.id === orderId && currentOrder.userId === session.user.id
  );

  if (!order) {
    return (
      <EmptyState
        action="Voltar aos pedidos"
        description="O pedido informado não existe ou não pertence a esta conta."
        href="/minha-conta/pedidos"
        icon="?"
        title="Pedido não encontrado"
      />
    );
  }

  const date = new Date(order.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div style={{ display: "grid", gap: "24px" }}>
      <section className="admin-panel">
        <div className="admin-panel__heading">
          <h2>
            Status atual: <span className="tag">{STATUS_LABELS[order.status] ?? order.status}</span>
          </h2>
          <p>Realizado em {date}</p>
        </div>
        <div className="metric-grid" style={{ marginTop: "20px" }}>
          <article>
            <span>Pagamento</span>
            <strong>{getPaymentMethodLabel(order.payment.method)}</strong>
            <small>
              {order.payment.status === "approved" ? "Aprovado" : "Recusado"}
            </small>
          </article>
          <article>
            <span>Entrega</span>
            <strong>{DELIVERY_LABELS[order.delivery.method]}</strong>
            <small>
              {order.delivery.address
                ? `${order.delivery.address.street}, ${order.delivery.address.number} - ${order.delivery.address.city}/${order.delivery.address.state}`
                : "Sem endereço de entrega (Digital ou Retirada)"}
            </small>
          </article>
        </div>
      </section>

      <section className="admin-panel">
        <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Itens comprados</h2>
        <div className="checkout-items">
          {order.items.map((item) => (
            <div key={item.productId} style={{ paddingBottom: "14px", borderBottom: "1px solid var(--line)", marginBottom: "14px" }}>
              <span>
                <strong>{item.title}</strong>
                <small>{item.quantity} un. x {formatPrice(item.unitPriceInCents)}</small>
              </span>
              <strong>{formatPrice(item.unitPriceInCents * item.quantity)}</strong>
            </div>
          ))}
        </div>
        <div className="checkout-totals" style={{ marginTop: "20px" }}>
          <div>
            <span>Subtotal</span>
            <strong>{formatPrice(order.subtotalInCents)}</strong>
          </div>
          <div>
            <span>Frete</span>
            <strong>{formatPrice(order.shippingInCents)}</strong>
          </div>
          <div className="checkout-total">
            <span>Total</span>
            <strong>{formatPrice(order.totalInCents)}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}