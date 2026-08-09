"use client";

import { useState } from "react";
import { formatPrice } from "@/components/products/product-presentation";
import { EmptyState } from "@/components/ui/empty-state";
import { ORDER_STATUSES, type OrderStatus } from "@/entities/order";
import { saveOrder } from "@/repositories/order-repository";
import { getPaymentMethodLabel } from "@/services/checkout-service";
import { useOrders } from "@/hooks/use-orders";

const STATUS_LABELS: Record<OrderStatus, string> = {
  confirmed: "Confirmado",
  preparing: "Preparando",
  shipped: "Enviado",
  completed: "Concluído",
  cancelled: "Cancelado",
};

const DELIVERY_LABELS = {
  shipping: "Entrega simulada",
  pickup: "Retirada no local",
  digital: "Entrega digital",
} as const;

interface AdminOrderDetailProps {
  readonly orderId: string;
}

export function AdminOrderDetail({ orderId }: AdminOrderDetailProps) {
  const orders = useOrders();
  const order = orders.find((o) => o.id === orderId);

  const [currentStatus, setCurrentStatus] = useState<OrderStatus | "">(
    order?.status ?? ""
  );

  if (!order) {
    return (
      <div className="admin-panel">
        <EmptyState
          action="Voltar para pedidos"
          description="O pedido não foi encontrado neste navegador."
          href="/admin/pedidos"
          icon="?"
          title="Pedido não encontrado"
        />
      </div>
    );
  }

  if (currentStatus === "" && order.status) {
    setCurrentStatus(order.status);
  }

  const handleUpdateStatus = () => {
    if (!currentStatus || currentStatus === order.status) return;

    const updatedOrder = {
      ...order,
      status: currentStatus,
      updatedAt: new Date().toISOString(),
    };

    saveOrder(updatedOrder);
    alert("Status do pedido atualizado com sucesso!");
  };

  const displayId = order.id.replace("order-", "").slice(0, 8).toLocaleUpperCase("pt-BR");
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
          <h2>Gerenciar Status</h2>
          <p>Atualize o andamento do pedido #{displayId}</p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
          <div className="form-field" style={{ flex: 1, maxWidth: "300px" }}>
            <label htmlFor="order-status">Status do Pedido</label>
            <select
              id="order-status"
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value as OrderStatus)}
            >
              {ORDER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="button button--primary"
            onClick={handleUpdateStatus}
            disabled={currentStatus === order.status}
          >
            Salvar alteração
          </button>
        </div>
      </section>

      <div className="metric-grid">
        <article>
          <span>Cliente</span>
          <strong style={{ fontSize: "18px", marginTop: "8px" }}>{order.customerName}</strong>
          <small>{order.customerEmail}</small>
        </article>
        <article>
          <span>Pagamento e Entrega</span>
          <strong style={{ fontSize: "16px", marginTop: "8px" }}>
            {getPaymentMethodLabel(order.payment.method)} ({order.payment.status === "approved" ? "Aprovado" : "Recusado"})
          </strong>
          <small>{DELIVERY_LABELS[order.delivery.method]}</small>
        </article>
      </div>

      <section className="admin-panel">
        <div className="admin-panel__heading">
          <h2>Itens do Pedido</h2>
          <p>Realizado em {date}</p>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Preço Unit.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.productId}>
                  <td>
                    <strong>{item.title}</strong>
                    <small>ID: {item.productId}</small>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{formatPrice(item.unitPriceInCents)}</td>
                  <td>{formatPrice(item.unitPriceInCents * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="checkout-totals" style={{ marginTop: "24px", maxWidth: "350px", marginLeft: "auto" }}>
          <div>
            <span>Subtotal</span>
            <strong>{formatPrice(order.subtotalInCents)}</strong>
          </div>
          <div>
            <span>Frete</span>
            <strong>{formatPrice(order.shippingInCents)}</strong>
          </div>
          <div className="checkout-total">
            <span>Total do Pedido</span>
            <strong>{formatPrice(order.totalInCents)}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}