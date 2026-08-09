import Link from "next/link";
import type { CSSProperties } from "react";
import type { Product } from "@/entities/product";
import {
  formatPrice,
  getAvailabilityLabel,
  getProductTypeLabel,
} from "@/components/products/product-presentation";

interface ProductCardProps {
  readonly product: Product;
  readonly index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const href = `/produtos/${product.slug}`;
  const coverTone = (index % 3) + 1;
  const coverStyle = product.imageUrl
    ? ({
        "--cover-image": `url(${JSON.stringify(product.imageUrl)})`,
      } as CSSProperties)
    : undefined;

  return (
    <article className="product-card">
      <Link
        aria-label={`Ver ${product.title}`}
        className={`product-card__cover cover--${coverTone}${product.imageUrl ? " product-card__cover--image" : ""}`}
        href={href}
        style={coverStyle}
      >
        {!product.imageUrl && (
          <>
            <small>COMPIA</small>
            <strong>{product.title}</strong>
            <span>{product.author ?? "COMPIA Editora"}</span>
          </>
        )}
      </Link>
      <div className="product-card__body">
        <span className="tag">{getProductTypeLabel(product.type)}</span>
        <h2><Link href={href}>{product.title}</Link></h2>
        <p>{product.description}</p>
        <small className="product-card__availability">{getAvailabilityLabel(product)}</small>
        <div className="product-card__footer">
          <strong>{formatPrice(product.priceInCents)}</strong>
          <Link href={href} aria-label={`Ver ${product.title}`}>Ver →</Link>
        </div>
      </div>
    </article>
  );
}
