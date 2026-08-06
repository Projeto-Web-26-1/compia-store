"use client";

import { useSyncExternalStore } from "react";
import type { Category } from "@/entities/category";
import type { Product } from "@/entities/product";
import {
  getCategoriesServerSnapshot,
  getCategoriesSnapshot,
  subscribeToCategories,
} from "@/repositories/category-repository";
import {
  getProductsServerSnapshot,
  getProductsSnapshot,
  subscribeToProducts,
} from "@/repositories/product-repository";
import { CATEGORY_SEED, PRODUCT_SEED } from "@/storage/seeds/catalog";

function parseSnapshot<T>(snapshot: string, fallback: readonly T[]): readonly T[] {
  try {
    const value: unknown = JSON.parse(snapshot);
    return Array.isArray(value) ? (value as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export function useProducts(): readonly Product[] {
  const snapshot = useSyncExternalStore(
    subscribeToProducts,
    getProductsSnapshot,
    getProductsServerSnapshot,
  );

  return parseSnapshot<Product>(snapshot, PRODUCT_SEED);
}

export function useCategories(): readonly Category[] {
  const snapshot = useSyncExternalStore(
    subscribeToCategories,
    getCategoriesSnapshot,
    getCategoriesServerSnapshot,
  );

  return parseSnapshot<Category>(snapshot, CATEGORY_SEED);
}
