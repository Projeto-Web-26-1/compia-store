export const PRODUCT_TYPES = ["physical_book", "ebook", "kit"] as const;

export type ProductType = (typeof PRODUCT_TYPES)[number];

export interface Product {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly author?: string;
  readonly description: string;
  readonly type: ProductType;
  readonly priceInCents: number;
  readonly stock: number | null;
  readonly categoryId: string;
  readonly tagIds: readonly string[];
  readonly imageUrl?: string;
  readonly active: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
