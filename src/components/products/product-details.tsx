"use client";

import Link from "next/link";
import { isAvailable } from "@/domain/catalog/product-rules";
import { EmptyState } from "@/components/ui/empty-state";
import {
  formatPrice,
  getAvailabilityLabel,
  getProductTypeLabel,
} from "@/components/products/product-presentation";
import { useCategories, useProducts } from "@/hooks/use-catalog";

interface ProductDetailsProps {
  readonly slug: string;
}

export function ProductDetails({ slug }: ProductDetailsProps) {
  const products = useProducts();
  const categories = useCategories();
  const product = products.find((currentProduct) => currentProduct.active && currentProduct.slug === slug);

  if (!product) {
    return (
      <div className="container page-space">
        <EmptyState
          icon="?"
          title="Produto não encontrado"
          description="O produto informado não existe ou não está disponível no catálogo."
          href="/produtos"
          action="Voltar ao catálogo"
        />
      </div>
    );
  }

  const category = categories.find((currentCategory) => currentCategory.id === product.categoryId);
  const available = isAvailable(product);

  return (
    <div className="container page-space">
      <nav className="breadcrumb" aria-label="Navegação estrutural">
        <Link href="/">Início</Link>
        <span>/</span>
        <Link href="/produtos">Catálogo</Link>
        <span>/</span>
        <span>{product.title}</span>
      </nav>
      <section className="product-detail">
        <div className="product-detail__cover">
          <small>COMPIA</small>
          <strong>{product.title}</strong>
          <span>{getProductTypeLabel(product.type)}</span>
        </div>
        <div className="product-detail__content">
          <span className="tag">{category?.name ?? getProductTypeLabel(product.type)}</span>
          <h1>{product.title}</h1>
          <p className="product-author">Por {product.author ?? "COMPIA Editora"}</p>
          <p className="product-description">{product.description}</p>
          <strong className="product-price">{formatPrice(product.priceInCents)}</strong>
          <div className="product-actions">
            <button
              className="button button--primary"
              disabled
              title="A integração com o carrinho será feita com o Dev 2"
              type="button"
            >
              {available ? "Adicionar ao carrinho" : "Produto indisponível"}
            </button>
            <span>{getAvailabilityLabel(product)}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
