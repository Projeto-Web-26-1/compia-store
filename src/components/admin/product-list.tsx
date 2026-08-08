"use client";

import Link from "next/link";
import { controlsStock } from "@/domain/catalog/product-rules";
import { useCategories, useProducts } from "@/hooks/use-catalog";
import { deleteProduct } from "@/repositories/product-repository";
import {
  formatPrice,
  getProductTypeLabel,
} from "@/components/products/product-presentation";
import { EmptyState } from "@/components/ui/empty-state";

export function ProductList() {
  const products = useProducts()
    .filter((product) => product.active)
    .toSorted((firstProduct, secondProduct) =>
      secondProduct.updatedAt.localeCompare(firstProduct.updatedAt),
    );
  const categories = useCategories();

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Excluir “${title}” do catálogo?`)) {
      deleteProduct(id);
    }
  };

  if (products.length === 0) {
    return (
      <div className="admin-panel">
        <EmptyState
          action="Cadastrar produto"
          description="Cadastre o primeiro título para publicá-lo no catálogo."
          href="/admin/produtos/novo"
          icon="□"
          title="Nenhum produto cadastrado"
        />
      </div>
    );
  }

  return (
    <div className="admin-panel admin-table-wrap">
      <div className="admin-table-summary">
        <strong>{products.length} {products.length === 1 ? "produto" : "produtos"}</strong>
        <span>Dados salvos neste navegador</span>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Formato</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th><span className="sr-only">Ações</span></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const category = categories.find((item) => item.id === product.categoryId);
            const isOutOfStock = controlsStock(product) && product.stock === 0;

            return (
              <tr key={product.id}>
                <td>
                  <strong>{product.title}</strong>
                  <small>{product.author ?? "COMPIA Editora"}</small>
                </td>
                <td>{category?.name ?? "Categoria não encontrada"}</td>
                <td>{getProductTypeLabel(product.type)}</td>
                <td>{formatPrice(product.priceInCents)}</td>
                <td>
                  <span className={isOutOfStock ? "stock-badge stock-badge--empty" : "stock-badge"}>
                    {controlsStock(product) ? product.stock : "Ilimitado"}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <Link href={`/admin/produtos/${product.id}/editar`}>Editar</Link>
                    <button onClick={() => handleDelete(product.id, product.title)} type="button">
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
