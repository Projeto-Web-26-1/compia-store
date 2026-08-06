import type { Product } from "@/entities/product";
import {
  CATALOG_STORAGE_KEYS,
  initializeCatalogSeed,
  PRODUCT_SEED,
} from "@/storage/seeds/catalog";
import {
  readStorageSnapshot,
  readStorageValue,
  subscribeToStorage,
  writeStorageValue,
} from "@/storage/local-storage";

const PRODUCT_SEED_SNAPSHOT = JSON.stringify(PRODUCT_SEED);

export function listProducts(): readonly Product[] {
  initializeCatalogSeed();
  return readStorageValue<Product[]>(CATALOG_STORAGE_KEYS.products) ?? PRODUCT_SEED;
}

export function findProductById(id: string): Product | null {
  return listProducts().find((product) => product.id === id) ?? null;
}

export function findProductBySlug(slug: string): Product | null {
  return listProducts().find((product) => product.slug === slug) ?? null;
}

export function saveProduct(product: Product): void {
  const products = [...listProducts()];
  const productIndex = products.findIndex((currentProduct) => currentProduct.id === product.id);

  if (productIndex === -1) {
    products.push(product);
  } else {
    products[productIndex] = product;
  }

  writeStorageValue(CATALOG_STORAGE_KEYS.products, products);
}

export function deleteProduct(id: string): boolean {
  const products = listProducts();
  const remainingProducts = products.filter((product) => product.id !== id);

  if (remainingProducts.length === products.length) {
    return false;
  }

  writeStorageValue(CATALOG_STORAGE_KEYS.products, remainingProducts);
  return true;
}

export function getProductsSnapshot(): string {
  return readStorageSnapshot(CATALOG_STORAGE_KEYS.products, PRODUCT_SEED_SNAPSHOT);
}

export function getProductsServerSnapshot(): string {
  return PRODUCT_SEED_SNAPSHOT;
}

export function subscribeToProducts(onStoreChange: () => void): () => void {
  const unsubscribe = subscribeToStorage(CATALOG_STORAGE_KEYS.products, onStoreChange);
  initializeCatalogSeed();
  return unsubscribe;
}
