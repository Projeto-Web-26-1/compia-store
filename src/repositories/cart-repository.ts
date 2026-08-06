import { CartItem } from "@/entities/cart";

const CART_STORAGE_KEY = "compia_cart_items";

export const cartRepository = {
  getItems(): CartItem[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveItems(items: CartItem[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  },

  clear(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CART_STORAGE_KEY);
  }
};