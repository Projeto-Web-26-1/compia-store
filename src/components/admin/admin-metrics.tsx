"use client";

import { useProducts } from "@/hooks/use-catalog";

export function AdminMetrics() {
  const products = useProducts();
  const productCount = products.filter((product) => product.active).length;
  const metrics = [
    ["Produtos", String(productCount), "Catálogo local"],
    ["Pedidos", "0", "Este mês"],
    ["Clientes", "0", "Cadastrados"],
    ["Faturamento", "R$ 0", "Simulado"],
  ];

  return (
    <div className="admin-metrics">
      {metrics.map(([label, value, detail]) => (
        <article key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <small>{detail}</small>
        </article>
      ))}
    </div>
  );
}
