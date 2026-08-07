import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import {
  formatPrice,
  getProductTypeLabel,
} from "@/components/products/product-presentation";
import { findProductBySlug } from "@/repositories/product-repository";

export const metadata: Metadata = { title: "Detalhes do produto" };

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container page-space">
      <nav className="breadcrumb" aria-label="Navegacao estrutural">
        <Link href="/">Inicio</Link><span>/</span><Link href="/produtos">Catalogo</Link><span>/</span><span>Produto</span>
      </nav>
      <section className="product-detail">
        <div className="product-detail__cover">
          <small>COMPIA</small><strong>{product.title}</strong><span>Edicao demonstrativa</span>
        </div>
        <div className="product-detail__content">
          <span className="tag">{getProductTypeLabel(product.type)}</span>
          <h1>{product.title}</h1>
          <p className="product-author">Por {product.author ?? "COMPIA Editora"}</p>
          <p className="product-description">{product.description}</p>
          <strong className="product-price">
            {formatPrice(product.priceInCents)}
          </strong>
          <div className="product-actions">
            <AddToCartButton
              product={{
                productId: product.id,
                name: product.title,
                price: product.priceInCents / 100,
                format: getProductTypeLabel(product.type)
              }}
            />
            <span>Disponivel em estoque</span>
          </div>
        </div>
      </section>
    </div>
  );
}
