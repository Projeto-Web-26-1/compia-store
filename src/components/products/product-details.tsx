"use client";

import Link from "next/link";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
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
  const coverStyle = product.imageUrl
    ? {
        backgroundImage: `url(${JSON.stringify(product.imageUrl)})`,
      }
    : undefined;

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
        <div
          aria-label={product.imageUrl ? `Capa do livro ${product.title}` : undefined}
          className={`product-detail__cover${product.imageUrl ? " product-detail__cover--image" : ""}`}
          role={product.imageUrl ? "img" : undefined}
          style={coverStyle}
        >
          {!product.imageUrl && (
            <>
              <small>COMPIA</small>
              <strong>{product.title}</strong>
              <span>{getProductTypeLabel(product.type)}</span>
            </>
          )}
        </div>
        <div className="product-detail__content">
          <span className="tag">{category?.name ?? getProductTypeLabel(product.type)}</span>
          <h1>{product.title}</h1>
          <p className="product-author">Por {product.author ?? "COMPIA Editora"}</p>
          <p className="product-description">{product.description}</p>
          <strong className="product-price">{formatPrice(product.priceInCents)}</strong>
          <div className="product-actions">
            {available ? (
              <AddToCartButton productId={product.id} />
            ) : (
              <button className="button button--primary" disabled type="button">
                Produto esgotado
              </button>
            )}
            <span>{getAvailabilityLabel(product)}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
