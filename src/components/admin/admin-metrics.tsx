"use client";

import { useSyncExternalStore } from "react";
import { useProducts } from "@/hooks/use-catalog";
import { useOrders } from "@/hooks/use-orders";
import { formatPrice } from "@/components/products/product-presentation";
import { readStorageSnapshot, subscribeToStorage } from "@/storage/local-storage";
import type { User } from "@/entities/user";

const USER_STORAGE_KEY = "compia:v1:users";
const EMPTY_USERS_SNAPSHOT = "[]";

function subscribe(onStoreChange: () => void) {
  return subscribeToStorage(USER_STORAGE_KEY, onStoreChange);
}

function getSnapshot() {
  return readStorageSnapshot(USER_STORAGE_KEY, EMPTY_USERS_SNAPSHOT);
}

function getServerSnapshot() {
  return EMPTY_USERS_SNAPSHOT;
}

interface StoredAccount {
  readonly user: User;
  readonly passwordHash: string;
}

export function AdminMetrics() {
  const products = useProducts();
  const orders = useOrders();
  
  const usersSnapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  
  let customerCount = 0;
  try {
    const accounts = JSON.parse(usersSnapshot) as StoredAccount[];
    customerCount = accounts.filter((account) => account.user?.role === "customer").length;
  } catch {
    customerCount = 0;
  }

  const productCount = products.filter((product) => product.active).length;
  const orderCount = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalInCents, 0);

  const metrics = [
    ["Produtos", String(productCount), "Catálogo local"],
    ["Pedidos", String(orderCount), "Realizados"],
    ["Clientes", String(customerCount), "Cadastrados"],
    ["Faturamento", formatPrice(totalRevenue), "Total simulado"],
  ];

  return (
    <div className="admin-metrics">
      {metrics.map(([label, value, detail]) => (
        <article key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <small>{detail}</small>
        </article>
      ))}
    </div>
  );
}