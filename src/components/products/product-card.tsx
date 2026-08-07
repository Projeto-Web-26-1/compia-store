import Link from "next/link";
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
    ? {
        backgroundImage: `linear-gradient(rgba(16, 27, 45, 0.22), rgba(16, 27, 45, 0.74)), url(${JSON.stringify(product.imageUrl)})`,
      }
    : undefined;

  return (
    <article className="product-card">
      <Link className={`product-card__cover cover--${coverTone}`} href={href} style={coverStyle}>
        <small>COMPIA</small>
        <strong>{product.title}</strong>
        <span>{product.author ?? "COMPIA Editora"}</span>
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
