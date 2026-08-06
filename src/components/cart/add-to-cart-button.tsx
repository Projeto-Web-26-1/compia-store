"use client";

import React from "react";
import { useCart } from "@/context/cart-context";
import { CartItem } from "@/entities/cart";

interface AddToCartButtonProps {
  product: Omit<CartItem, "quantity">;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      className="button button--primary"
      type="button"
      onClick={() => addItem(product, 1)}
    >
      Adicionar ao carrinho
    </button>
  );
}