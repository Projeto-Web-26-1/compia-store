"use client";

import Link from "next/link";
import { formatPrice } from "@/components/products/product-presentation";
import { EmptyState } from "@/components/ui/empty-state";
import { useOrders } from "@/hooks/use-orders";
import { useSession } from "@/hooks/use-session";

const STATUS_LABELS: Record<string, string> = {
  confirmed: "Confirmado",
  preparing: "Preparando",
  shipped: "Enviado",
  completed: "Concluído",
  cancelled: "Cancelado",
};

export function CustomerOrderList() {
  const session = useSession();
  const orders = useOrders();

  if (session.status !== "authenticated") {
    return null;
  }

  const userOrders = orders
    .filter((order) => order.userId === session.user.id)
    .toSorted((firstOrder, secondOrder) =>
      secondOrder.createdAt.localeCompare(firstOrder.createdAt)
    );

  if (userOrders.length === 0) {
    return (
      <EmptyState
        action="Explorar catálogo"
        description="Quando uma compra for concluída, ela aparecerá nesta página."
        href="/produtos"
        icon="🛒"
        title="Nenhum pedido por aqui"
      />
    );
  }

  return (
    <div className="admin-panel admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Data</th>
            <th>Status</th>
            <th>Total</th>
            <th>
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {userOrders.map((order) => {
            const displayId = order.id.replace("order-", "").slice(0, 8).toLocaleUpperCase("pt-BR");
            const date = new Date(order.createdAt).toLocaleDateString("pt-BR");

            return (
              <tr key={order.id}>
                <td>
                  <strong>#{displayId}</strong>
                </td>
                <td>{date}</td>
                <td>
                  <span className="tag">{STATUS_LABELS[order.status] ?? order.status}</span>
                </td>
                <td>{formatPrice(order.totalInCents)}</td>
                <td>
                  <div className="table-actions">
                    <Link href={`/minha-conta/pedidos/${order.id}`}>Ver detalhes</Link>
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