import type { Product, ProductType } from "@/entities/product";
import { controlsStock, isAvailable } from "@/domain/catalog/product-rules";

const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  physical_book: "Livro físico",
  ebook: "E-book",
  kit: "Kit",
};

export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceInCents / 100);
}

export function getProductTypeLabel(type: ProductType): string {
  return PRODUCT_TYPE_LABELS[type];
}

export function getAvailabilityLabel(product: Product): string {
  if (!isAvailable(product)) {
    return "Produto esgotado";
  }

  if (!controlsStock(product)) {
    return "Disponível para download";
  }

  return `${product.stock} ${product.stock === 1 ? "unidade disponível" : "unidades disponíveis"}`;
}
