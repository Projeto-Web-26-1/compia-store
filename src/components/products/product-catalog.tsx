"use client";

import { useMemo, useState } from "react";
import { isAvailable } from "@/domain/catalog/product-rules";
import type { ProductType } from "@/entities/product";
import { ProductGrid } from "@/components/products/product-grid";
import { useCategories, useProducts } from "@/hooks/use-catalog";

type AvailabilityFilter = "all" | "available" | "out_of_stock";
type CatalogOrder = "newest" | "price_asc" | "price_desc" | "title";

function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

export function ProductCatalog() {
  const products = useProducts();
  const categories = useCategories();
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [type, setType] = useState<ProductType | "all">("all");
  const [availability, setAvailability] = useState<AvailabilityFilter>("all");
  const [order, setOrder] = useState<CatalogOrder>("newest");
  const hasFilters = Boolean(search.trim()) || categoryId !== "all" || type !== "all" || availability !== "all";

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeSearch(search.trim());
    const nextProducts = products.filter((product) => {
      if (!product.active) {
        return false;
      }

      const searchableContent = normalizeSearch(
        `${product.title} ${product.author ?? ""} ${product.description}`,
      );

      if (normalizedSearch && !searchableContent.includes(normalizedSearch)) {
        return false;
      }

      if (categoryId !== "all" && product.categoryId !== categoryId) {
        return false;
      }

      if (type !== "all" && product.type !== type) {
        return false;
      }

      if (availability === "available" && !isAvailable(product)) {
        return false;
      }

      if (availability === "out_of_stock" && isAvailable(product)) {
        return false;
      }

      return true;
    });

    return nextProducts.toSorted((firstProduct, secondProduct) => {
      if (order === "price_asc") {
        return firstProduct.priceInCents - secondProduct.priceInCents;
      }

      if (order === "price_desc") {
        return secondProduct.priceInCents - firstProduct.priceInCents;
      }

      if (order === "title") {
        return firstProduct.title.localeCompare(secondProduct.title, "pt-BR");
      }

      return secondProduct.createdAt.localeCompare(firstProduct.createdAt);
    });
  }, [availability, categoryId, order, products, search, type]);

  const clearFilters = () => {
    setSearch("");
    setCategoryId("all");
    setType("all");
    setAvailability("all");
  };

  return (
    <>
      <section className="catalog-filters" aria-label="Busca e filtros do catálogo">
        <div className="catalog-search">
          <label htmlFor="catalog-search">Buscar no catálogo</label>
          <input
            id="catalog-search"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Título, autor ou palavra-chave"
            type="search"
            value={search}
          />
        </div>
        <div className="catalog-filter-grid">
          <div>
            <label htmlFor="catalog-category">Categoria</label>
            <select
              id="catalog-category"
              onChange={(event) => setCategoryId(event.target.value)}
              value={categoryId}
            >
              <option value="all">Todas as categorias</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="catalog-type">Formato</label>
            <select
              id="catalog-type"
              onChange={(event) => setType(event.target.value as ProductType | "all")}
              value={type}
            >
              <option value="all">Todos os formatos</option>
              <option value="physical_book">Livro físico</option>
              <option value="ebook">E-book</option>
              <option value="kit">Kit</option>
            </select>
          </div>
          <div>
            <label htmlFor="catalog-availability">Disponibilidade</label>
            <select
              id="catalog-availability"
              onChange={(event) => setAvailability(event.target.value as AvailabilityFilter)}
              value={availability}
            >
              <option value="all">Todos</option>
              <option value="available">Em estoque</option>
              <option value="out_of_stock">Esgotados</option>
            </select>
          </div>
        </div>
      </section>
      <div className="catalog-toolbar" aria-label="Resumo do catálogo">
        <div>
          <strong>
            {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </strong>
          {hasFilters && <button className="catalog-clear" onClick={clearFilters} type="button">Limpar filtros</button>}
        </div>
        <div className="catalog-order">
          <label htmlFor="catalog-order">Ordenar por</label>
          <select
            id="catalog-order"
            onChange={(event) => setOrder(event.target.value as CatalogOrder)}
            value={order}
          >
            <option value="newest">Mais recentes</option>
            <option value="price_asc">Menor preço</option>
            <option value="price_desc">Maior preço</option>
            <option value="title">Título de A a Z</option>
          </select>
        </div>
      </div>
      <ProductGrid filtered={hasFilters} products={filteredProducts} />
    </>
  );
}
