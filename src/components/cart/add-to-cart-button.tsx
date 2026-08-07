"use client";

import { useCart } from "@/context/cart-context";

interface AddToCartButtonProps {
  readonly productId: string;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      className="button button--primary"
      type="button"
      onClick={() => addItem(productId, 1)}
    >
      Adicionar ao carrinho
    </button>
  );
}
