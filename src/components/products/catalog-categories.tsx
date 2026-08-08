"use client";

import Link from "next/link";
import { useCategories, useProducts } from "@/hooks/use-catalog";

const CATEGORY_TONES = ["violet", "blue", "green", "orange", "rose", "cyan"] as const;

export function CatalogCategories() {
  const categories = useCategories();
  const products = useProducts();

  return (
    <div className="topic-grid">
      {categories.map((category, index) => {
        const productCount = products.filter(
          (product) => product.active && product.categoryId === category.id,
        ).length;
        const tone = CATEGORY_TONES[index % CATEGORY_TONES.length];

        return (
          <Link
            className={`topic-card topic-card--${tone}`}
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
