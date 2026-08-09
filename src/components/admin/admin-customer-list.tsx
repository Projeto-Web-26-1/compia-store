"use client";

import { formatPrice } from "@/components/products/product-presentation";
import { EmptyState } from "@/components/ui/empty-state";
import { useCustomers } from "@/hooks/use-customers";
import { useOrders } from "@/hooks/use-orders";

export function AdminCustomerList() {
  const customers = useCustomers().toSorted((firstCustomer, secondCustomer) =>
    firstCustomer.name.localeCompare(secondCustomer.name, "pt-BR"),
  );
  const orders = useOrders();

  if (customers.length === 0) {
    return (
      <div className="admin-panel">
        <EmptyState
          description="Clientes aparecerão aqui depois que criarem uma conta."
          icon="○"
          title="Nenhum cliente cadastrado"
        />
      </div>
    );
  }

  return (
    <div className="admin-panel admin-table-wrap">
      <div className="admin-table-summary">
        <strong>
          {customers.length} {customers.length === 1 ? "cliente" : "clientes"}
        </strong>
        <span>Dados salvos neste navegador</span>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Pedidos</th>
            <th>Último pedido</th>
            <th>Total comprado</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            const customerOrders = orders
              .filter((order) => order.userId === customer.id)
              .toSorted((firstOrder, secondOrder) =>
                secondOrder.createdAt.localeCompare(firstOrder.createdAt),
              );
            const validOrders = customerOrders.filter(
              (order) => order.status !== "cancelled",
            );
            const totalInCents = validOrders.reduce(
              (total, order) => total + order.totalInCents,
              0,
            );
            const latestOrder = customerOrders[0];

            return (
              <tr key={customer.id}>
                <td>
                  <strong>{customer.name}</strong>
                  <small>{customer.email}</small>
                </td>
                <td>{customerOrders.length}</td>
                <td>
                  {latestOrder
                    ? new Date(latestOrder.createdAt).toLocaleDateString("pt-BR")
                    : "—"}
                </td>
                <td>{formatPrice(totalInCents)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
