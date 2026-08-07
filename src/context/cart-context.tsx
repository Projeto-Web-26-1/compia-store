"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { canPurchase } from "@/domain/catalog/product-rules";
import type { CartItem } from "@/entities/cart";
import { cartRepository } from "@/repositories/cart-repository";
import { findProductById } from "@/repositories/product-repository";

interface CartContextData {
  items: readonly CartItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  count: number;
}

const CartContext = createContext<CartContextData | null>(null);

function parseItems(snapshot: string): CartItem[] {
  try {
    const value: unknown = JSON.parse(snapshot);
    return Array.isArray(value) ? (value as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    cartRepository.subscribe,
    cartRepository.getSnapshot,
    cartRepository.getServerSnapshot,
  );
  const items = parseItems(snapshot);

  const updateAndSave = (newItems: readonly CartItem[]) => {
    cartRepository.saveItems(newItems);
  };

  const addItem = (productId: string, quantity = 1) => {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return;
    }

    const currentItems = cartRepository.getItems();
    const existingItem = currentItems.find((item) => item.productId === productId);
    const nextQuantity = (existingItem?.quantity ?? 0) + quantity;
    const product = findProductById(productId);

    if (!product || !canPurchase(product, nextQuantity)) {
      return;
    }

    const updatedItems = existingItem
      ? currentItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: nextQuantity }
            : item,
        )
      : [...currentItems, { productId, quantity }];

    updateAndSave(updatedItems);
  };

  const removeItem = (productId: string) => {
    updateAndSave(cartRepository.getItems().filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (!Number.isInteger(quantity)) {
      return;
    }

    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    const product = findProductById(productId);

    if (!product || !canPurchase(product, quantity)) {
      return;
    }

    const updated = cartRepository.getItems().map((item) =>
      item.productId === productId ? { ...item, quantity } : item,
    );
    updateAndSave(updated);
  };

  const clearCart = () => {
    cartRepository.clear();
  };

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser utilizado dentro de CartProvider");
  }

  return context;
}
