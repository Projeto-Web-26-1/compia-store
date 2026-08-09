"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { getProductTypeLabel } from "@/components/products/product-presentation";
import type { DigitalAsset } from "@/entities/digital-asset";
import { findDigitalAssetsByProductId } from "@/repositories/digital-asset-repository";
import { useProducts } from "@/hooks/use-catalog";
import { useOrders } from "@/hooks/use-orders";
import { useSession } from "@/hooks/use-session";

export function CustomerDownloads() {
  const session = useSession();
  const orders = useOrders();
  const products = useProducts();

  if (session.status !== "authenticated") {
    return null;
  }

  const userOrders = orders.filter((order) => order.userId === session.user.id);
  const purchasedProductIds = new Set(
    userOrders.flatMap((order) => order.items.map((item) => item.productId))
  );

  const assetsByProduct: Record<string, readonly DigitalAsset[]> = {};
  
  purchasedProductIds.forEach((productId) => {
    const productAssets = findDigitalAssetsByProductId(productId);
    if (productAssets.length > 0) {
      assetsByProduct[productId] = productAssets;
    }
  });

  const purchasedProductsWithAssets = products.filter(
    (product) => assetsByProduct[product.id]
  );

  if (purchasedProductsWithAssets.length === 0) {
    return (
      <EmptyState
        action="Explorar e-books"
        description="E-books de pedidos aprovados aparecerão nesta biblioteca."
        href="/produtos"
        icon="📖"
        title="Nenhum download disponível"
      />
    );
  }

  return (
    <div className="benefit-grid">
      {purchasedProductsWithAssets.map((product) => (
        <article key={product.id} className="benefit-card" style={{ display: "flex", flexDirection: "column" }}>
          <span className="tag" style={{ width: "fit-content" }}>
            {getProductTypeLabel(product.type)}
          </span>
          <h3 style={{ marginTop: "12px", marginBottom: "20px", fontSize: "18px" }}>
            {product.title}
          </h3>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
            {assetsByProduct[product.id].map((asset) => (
              <a
                key={asset.id}
                className="button button--secondary button--full"
                href={asset.downloadUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Baixar {asset.format.toLocaleUpperCase("pt-BR")}
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}