import type { Product } from "@/entities/product";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function createProductSlug(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const PRODUCT_VALIDATION_CODES = [
  "id_required",
  "title_required",
  "description_required",
  "slug_invalid",
  "slug_duplicated",
  "price_invalid",
  "stock_invalid",
  "category_required",
  "category_not_found",
  "tag_duplicated",
  "tag_not_found",
] as const;

export type ProductValidationCode = (typeof PRODUCT_VALIDATION_CODES)[number];

export type ProductValidationField =
  | "id"
  | "title"
  | "description"
  | "slug"
  | "priceInCents"
  | "stock"
  | "categoryId"
  | "tagIds";

export interface ProductValidationIssue {
  readonly code: ProductValidationCode;
  readonly field: ProductValidationField;
}

export interface ProductValidationContext {
  readonly categoryIds: readonly string[];
  readonly tagIds: readonly string[];
  readonly existingProducts: readonly Pick<Product, "id" | "slug">[];
}

export function controlsStock(product: Pick<Product, "type">): boolean {
  return product.type !== "ebook";
}

export function isValidPriceInCents(priceInCents: number): boolean {
  return Number.isInteger(priceInCents) && priceInCents >= 0;
}

export function isValidStock(product: Pick<Product, "type" | "stock">): boolean {
  if (!controlsStock(product)) {
    return product.stock === null;
  }

  return product.stock !== null && Number.isInteger(product.stock) && product.stock >= 0;
}

export function isValidPurchaseQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity > 0;
}

export function hasAvailableStock(
  product: Pick<Product, "type" | "stock">,
  quantity = 1,
): boolean {
  if (!isValidPurchaseQuantity(quantity)) {
    return false;
  }

  if (!isValidStock(product)) {
    return false;
  }

  if (!controlsStock(product)) {
    return true;
  }

  return product.stock !== null && product.stock >= quantity;
}

export function isAvailable(
  product: Pick<Product, "active" | "type" | "stock">,
): boolean {
  return product.active && hasAvailableStock(product);
}

export function canPurchase(
  product: Pick<Product, "active" | "priceInCents" | "type" | "stock">,
  quantity: number,
): boolean {
  return (
    product.active &&
    isValidPriceInCents(product.priceInCents) &&
    hasAvailableStock(product, quantity)
  );
}

export function validateProduct(
  product: Product,
  context: ProductValidationContext,
): ProductValidationIssue[] {
  const issues: ProductValidationIssue[] = [];

  if (!product.id.trim()) {
    issues.push({ code: "id_required", field: "id" });
  }

  if (!product.title.trim()) {
    issues.push({ code: "title_required", field: "title" });
  }

  if (!product.description.trim()) {
    issues.push({ code: "description_required", field: "description" });
  }

  if (!SLUG_PATTERN.test(product.slug)) {
    issues.push({ code: "slug_invalid", field: "slug" });
  } else if (
    context.existingProducts.some(
      (existingProduct) =>
        existingProduct.id !== product.id && existingProduct.slug === product.slug,
    )
  ) {
    issues.push({ code: "slug_duplicated", field: "slug" });
  }

  if (!isValidPriceInCents(product.priceInCents)) {
    issues.push({ code: "price_invalid", field: "priceInCents" });
  }

  if (!isValidStock(product)) {
    issues.push({ code: "stock_invalid", field: "stock" });
  }

  if (!product.categoryId.trim()) {
    issues.push({ code: "category_required", field: "categoryId" });
  } else if (!context.categoryIds.includes(product.categoryId)) {
    issues.push({ code: "category_not_found", field: "categoryId" });
  }

  if (new Set(product.tagIds).size !== product.tagIds.length) {
    issues.push({ code: "tag_duplicated", field: "tagIds" });
  }

  if (product.tagIds.some((tagId) => !context.tagIds.includes(tagId))) {
    issues.push({ code: "tag_not_found", field: "tagIds" });
  }

  return issues;
}
