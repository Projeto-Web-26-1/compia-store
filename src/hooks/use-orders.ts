"use client";

import { useSyncExternalStore } from "react";
import type { Order } from "@/entities/order";
import {
  getOrdersServerSnapshot,
  getOrdersSnapshot,
  subscribeToOrders,
} from "@/repositories/order-repository";

function parseOrders(snapshot: string): readonly Order[] {
  try {
    const value: unknown = JSON.parse(snapshot);
    return Array.isArray(value) ? (value as Order[]) : [];
  } catch {
    return [];
  }
}

export function useOrders(): readonly Order[] {
  const snapshot = useSyncExternalStore(
    subscribeToOrders,
    getOrdersSnapshot,
    getOrdersServerSnapshot,
  );

  return parseOrders(snapshot);
}
