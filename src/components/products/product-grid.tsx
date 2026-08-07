import type { Product } from "@/entities/product";
import { ProductCard } from "@/components/products/product-card";
import { EmptyState } from "@/components/ui/empty-state";

interface ProductGridProps {
  readonly products: readonly Product[];
  readonly filtered?: boolean;
}

export function ProductGrid({ products, filtered = false }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon="◇"
        title={filtered ? "Nenhum produto encontrado" : "Nenhum produto disponível"}
        description={
          filtered
            ? "Tente remover algum filtro ou buscar por outro termo."
            : "O catálogo será atualizado em breve com novos títulos."
        }
      />
    );
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard index={index} key={product.id} product={product} />
      ))}
    </div>
  );
}
