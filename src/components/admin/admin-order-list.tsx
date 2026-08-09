"use client";

import Link from "next/link";
import { formatPrice } from "@/components/products/product-presentation";
import { EmptyState } from "@/components/ui/empty-state";
import { useOrders } from "@/hooks/use-orders";

const STATUS_LABELS: Record<string, string> = {
  confirmed: "Confirmado",
  preparing: "Preparando",
  shipped: "Enviado",
  completed: "Concluído",
  cancelled: "Cancelado",
};

export function AdminOrderList() {
  const orders = useOrders();

  const sortedOrders = [...orders].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );

  if (sortedOrders.length === 0) {
    return (
      <div className="admin-panel">
        <EmptyState
          description="Pedidos simulados aparecerão aqui depois do checkout."
          icon="🛒"
          title="Nenhum pedido recebido"
        />
      </div>
    );
  }

  return (
    <div className="admin-panel admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Status</th>
            <th>Total</th>
            <th>
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order) => {
            const displayId = order.id.replace("order-", "").slice(0, 8).toLocaleUpperCase("pt-BR");
            const date = new Date(order.createdAt).toLocaleDateString("pt-BR");

            return (
              <tr key={order.id}>
                <td>
                  <strong>#{displayId}</strong>
                </td>
                <td>
                  <strong>{order.customerName}</strong>
                  <small>{order.customerEmail}</small>
                </td>
                <td>{date}</td>
                <td>
                  <span className="tag">{STATUS_LABELS[order.status] ?? order.status}</span>
                </td>
                <td>{formatPrice(order.totalInCents)}</td>
                <td>
                  <div className="table-actions">
                    <Link href={`/admin/pedidos/${order.id}`}>Gerenciar</Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}