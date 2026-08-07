"use client";

import { ProductForm } from "@/components/admin/product-form";
import { EmptyState } from "@/components/ui/empty-state";
import { useProducts } from "@/hooks/use-catalog";

interface ProductEditorProps {
  readonly productId: string;
}

export function ProductEditor({ productId }: ProductEditorProps) {
  const products = useProducts();
  const product = products.find((currentProduct) => currentProduct.id === productId);

  if (!product) {
    return (
      <div className="admin-panel">
        <EmptyState
          action="Voltar para produtos"
          description="O produto pode ter sido excluído ou não existe neste navegador."
          href="/admin/produtos"
          icon="?"
          title="Produto não encontrado"
        />
      </div>
    );
  }

  return <ProductForm product={product} />;
}
