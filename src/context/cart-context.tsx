"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/entities/cart";
import { cartRepository } from "@/repositories/cart-repository";

interface CartContextData {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  count: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(cartRepository.getItems());
  }, []);

  const updateAndSave = (newItems: CartItem[]) => {
    setItems(newItems);
    cartRepository.saveItems(newItems);
  };

  const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    const existingIndex = items.findIndex((i) => i.productId === item.productId);
    let updated: CartItem[];

    if (existingIndex > -1) {
      updated = [...items];
      updated[existingIndex].quantity += quantity;
    } else {
      updated = [...items, { ...item, quantity }];
    }
    updateAndSave(updated);
  };

  const removeItem = (productId: string) => {
    updateAndSave(items.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    const updated = items.map((i) =>
      i.productId === productId ? { ...i, quantity } : i
    );
    updateAndSave(updated);
  };

  const clearCart = () => {
    setItems([]);
    cartRepository.clear();
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        count
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);