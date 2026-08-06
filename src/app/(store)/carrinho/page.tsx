"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { formatPrice } from "@/components/products/product-presentation";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const shipping = items.length > 0 ? 1500 : 0;
  const total = subtotal * 100 + shipping;

  if (items.length === 0) {
    return (
      <div className="container page-space page-narrow">
        <PageIntro eyebrow="Sua selecao" title="Carrinho" description="Revise os itens antes de seguir para o checkout." />
        <EmptyState icon=" " title="Seu carrinho esta vazio" description="Explore o catalogo e encontre seu proximo livro." href="/produtos" action="Explorar catalogo" />
      </div>
    );
  }

  return (
    <div className="container page-space">
      <PageIntro eyebrow="Sua selecao" title="Carrinho" description="Revise os itens antes de seguir para o checkout." />
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "40px", alignItems: "start" }}>
        <div style={{ display: "grid", gap: "16px" }}>
          {items.map((item) => (
            <div key={item.productId} className="benefit-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
              <div>
                <span className="tag">{item.format}</span>
                <h3 style={{ margin: "8px 0 4px", fontSize: "18px" }}>{item.name}</h3>
                <strong style={{ color: "var(--brand)" }}>{formatPrice(item.price * 100)}</strong>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: "8px" }}>
                  <button type="button" onClick={() => updateQuantity(item.productId, item.quantity - 1)} style={{ padding: "6px 12px", border: "0", background: "transparent" }}>-</button>
                  <span style={{ padding: "0 8px", fontWeight: "bold" }}>{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.productId, item.quantity + 1)} style={{ padding: "6px 12px", border: "0", background: "transparent" }}>+</button>
                </div>
                <button type="button" onClick={() => removeItem(item.productId)} style={{ color: "#a33b3b", border: "0", background: "transparent", fontWeight: "700", fontSize: "13px" }}>
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="benefit-card" style={{ padding: "28px" }}>
          <h3 style={{ marginTop: 0 }}>Resumo da compra</h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginBlock: "12px", fontSize: "14px" }}>
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal * 100)}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBlock: "12px", fontSize: "14px" }}>
            <span>Frete simulado</span>
            <strong>{formatPrice(shipping)}</strong>
          </div>
          <hr style={{ border: 0, borderTop: "1px solid var(--line)", marginBlock: "16px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", fontSize: "18px" }}>
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <Link href="/checkout" className="button button--primary button--full">
            Ir para checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}