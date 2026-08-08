import type { Order } from "@/entities/order";
import {
  readStorageSnapshot,
  readStorageValue,
  subscribeToStorage,
  writeStorageValue,
} from "@/storage/local-storage";

const ORDER_STORAGE_KEY = "compia:v1:orders";
const EMPTY_ORDER_SNAPSHOT = "[]";

export function listOrders(): readonly Order[] {
  const storedOrders = readStorageValue<unknown>(ORDER_STORAGE_KEY);
  return Array.isArray(storedOrders) ? (storedOrders as Order[]) : [];
}

export function listOrdersByUserId(userId: string): readonly Order[] {
  return listOrders().filter((order) => order.userId === userId);
}

export function findOrderById(id: string): Order | null {
  return listOrders().find((order) => order.id === id) ?? null;
}

export function saveOrder(order: Order): void {
  const orders = [...listOrders()];
  const orderIndex = orders.findIndex((currentOrder) => currentOrder.id === order.id);

  if (orderIndex === -1) {
    orders.push(order);
  } else {
    orders[orderIndex] = order;
  }

  writeStorageValue(ORDER_STORAGE_KEY, orders);
}

export function getOrdersSnapshot(): string {
  return readStorageSnapshot(ORDER_STORAGE_KEY, EMPTY_ORDER_SNAPSHOT);
}

export function getOrdersServerSnapshot(): string {
  return EMPTY_ORDER_SNAPSHOT;
}

export function subscribeToOrders(onStoreChange: () => void): () => void {
  return subscribeToStorage(ORDER_STORAGE_KEY, onStoreChange);
}
