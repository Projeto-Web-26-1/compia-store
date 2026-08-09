"use client";

import Link from "next/link";
import { useProducts } from "@/hooks/use-catalog";
import { controlsStock } from "@/domain/catalog/product-rules";

export function AdminLowStock() {
  const products = useProducts();

  const lowStockProducts = products
    .filter(
      (product) =>
        product.active &&
        controlsStock(product) &&
        product.stock !== null &&
        product.stock <= 5
    )
    .toSorted((a, b) => (a.stock as number) - (b.stock as number));

  if (lowStockProducts.length === 0) {
    return (
      <div className="admin-panel" style={{ marginTop: "24px" }}>
        <div className="admin-panel__heading">
          <h2>Estoque adequado</h2>
          <p>Nenhum produto físico está com o nível de estoque crítico.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel admin-table-wrap" style={{ marginTop: "24px" }}>
      <div className="admin-panel__heading">
        <h2>Atenção: Estoque baixo</h2>
        <p>Produtos físicos com 5 ou menos unidades disponíveis.</p>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Estoque atual</th>
            <th>
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {lowStockProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <strong>{product.title}</strong>
              </td>
              <td>
                <span
                  className={
                    product.stock === 0
                      ? "stock-badge stock-badge--empty"
                      : "stock-badge"
                  }
                >
                  {product.stock} {product.stock === 1 ? "unidade" : "unidades"}
                </span>
              </td>
              <td>
                <div className="table-actions">
                  <Link href={`/admin/produtos/${product.id}/editar`}>
                    Atualizar estoque
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}