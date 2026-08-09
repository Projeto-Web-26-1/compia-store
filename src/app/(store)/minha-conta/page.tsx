"use client";

import { PageIntro } from "@/components/ui/page-intro";
import { useSession } from "@/hooks/use-session";
import { useOrders } from "@/hooks/use-orders";
import { useProducts } from "@/hooks/use-catalog";
import { findDigitalAssetsByProductId } from "@/repositories/digital-asset-repository";

export default function AccountPage() {
  const session = useSession();
  const orders = useOrders();
  const products = useProducts();

  const userName = session.status === "authenticated" ? session.user.name : "leitor";

  let orderCount = 0;
  let downloadCount = 0;

  if (session.status === "authenticated") {
    const userOrders = orders.filter((order) => order.userId === session.user.id);
    orderCount = userOrders.length;

    const purchasedProductIds = new Set(
      userOrders.flatMap((order) => order.items.map((item) => item.productId))
    );

    const assetsByProduct: Record<string, boolean> = {};
    
    purchasedProductIds.forEach((productId) => {
      const productAssets = findDigitalAssetsByProductId(productId);
      if (productAssets.length > 0) {
        assetsByProduct[productId] = true;
      }
    });

    const purchasedProductsWithAssets = products.filter(
      (product) => assetsByProduct[product.id]
    );
    
    downloadCount = purchasedProductsWithAssets.length;
  }

  return (
    <>
      <PageIntro
        eyebrow="Área do cliente"
        title={`Olá, ${userName}`}
        description="Acompanhe seus pedidos e materiais digitais em um só lugar."
      />
      <div className="metric-grid">
        <article>
          <span>Pedidos</span>
          <strong>{orderCount}</strong>
          <small>
            {orderCount === 1 
              ? "1 pedido realizado" 
              : orderCount === 0 
                ? "Nenhum pedido realizado" 
                : `${orderCount} pedidos realizados`}
          </small>
        </article>
        <article>
          <span>Downloads</span>
          <strong>{downloadCount}</strong>
          <small>
            {downloadCount === 1 
              ? "1 arquivo disponível" 
              : downloadCount === 0 
                ? "Nenhum arquivo disponível" 
                : `${downloadCount} arquivos disponíveis`}
          </small>
        </article>
      </div>
    </>
  );
}