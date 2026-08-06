"use client";

import Link from "next/link";
import { useCategories, useProducts } from "@/hooks/use-catalog";

const CATEGORY_TONES = ["violet", "blue", "green"] as const;

export function CatalogCategories() {
  const categories = useCategories();
  const products = useProducts();

  return (
    <div className="topic-grid">
      {categories.slice(0, 3).map((category, index) => {
        const productCount = products.filter(
          (product) => product.active && product.categoryId === category.id,
        ).length;

        return (
          <Link
            className={`topic-card topic-card--${CATEGORY_TONES[index]}`}
            href="/produtos"
            key={category.id}
          >
            <span className="topic-card__pattern" aria-hidden="true" />
            <div>
              <small>{productCount} {productCount === 1 ? "título" : "títulos"}</small>
              <h3>{category.name}</h3>
            </div>
            <span aria-hidden="true">↗</span>
          </Link>
        );
      })}
    </div>
  );
}
