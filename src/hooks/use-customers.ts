"use client";

import { useSyncExternalStore } from "react";
import { isUser, type User } from "@/entities/user";
import {
  getCustomersServerSnapshot,
  getCustomersSnapshot,
  subscribeToCustomers,
} from "@/repositories/user-repository";

function parseCustomers(snapshot: string): readonly User[] {
  try {
    const value: unknown = JSON.parse(snapshot);
    return Array.isArray(value)
      ? value.filter((user): user is User => isUser(user) && user.role === "customer")
      : [];
  } catch {
    return [];
  }
}

export function useCustomers(): readonly User[] {
  const snapshot = useSyncExternalStore(
    subscribeToCustomers,
    getCustomersSnapshot,
    getCustomersServerSnapshot,
  );

  return parseCustomers(snapshot);
}
