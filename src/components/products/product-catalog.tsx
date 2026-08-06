"use client";

import { ProductGrid } from "@/components/products/product-grid";
import { useProducts } from "@/hooks/use-catalog";

export function ProductCatalog() {
  const products = useProducts();
  const activeProducts = products
    .filter((product) => product.active)
    .toSorted((firstProduct, secondProduct) =>
      secondProduct.createdAt.localeCompare(firstProduct.createdAt),
    );

  return (
    <>
      <div className="catalog-toolbar" aria-label="Resumo do catálogo">
        <strong>Catálogo local</strong>
        <span>
          {activeProducts.length} {activeProducts.length === 1 ? "produto" : "produtos"}
        </span>
      </div>
      <ProductGrid products={activeProducts} />
    </>
  );
}
