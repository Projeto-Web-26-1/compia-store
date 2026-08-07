import type { CartItem } from "@/entities/cart";
import {
  readStorageSnapshot,
  readStorageValue,
  subscribeToStorage,
  writeStorageValue,
} from "@/storage/local-storage";

const CART_STORAGE_KEY = "compia:v1:cart";
const EMPTY_CART_SNAPSHOT = "[]";

export const cartRepository = {
  getItems(): CartItem[] {
    return readStorageValue<CartItem[]>(CART_STORAGE_KEY) ?? [];
  },

  saveItems(items: readonly CartItem[]): void {
    writeStorageValue(CART_STORAGE_KEY, items);
  },

  clear(): void {
    writeStorageValue(CART_STORAGE_KEY, []);
  },

  getSnapshot(): string {
    return readStorageSnapshot(CART_STORAGE_KEY, EMPTY_CART_SNAPSHOT);
  },

  getServerSnapshot(): string {
    return EMPTY_CART_SNAPSHOT;
  },

  subscribe(onStoreChange: () => void): () => void {
    return subscribeToStorage(CART_STORAGE_KEY, onStoreChange);
  },
};
