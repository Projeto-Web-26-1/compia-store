import type { Category } from "@/entities/category";
import {
  CATALOG_STORAGE_KEYS,
  CATEGORY_SEED,
  initializeCatalogSeed,
} from "@/storage/seeds/catalog";
import {
  readStorageSnapshot,
  readStorageValue,
  subscribeToStorage,
} from "@/storage/local-storage";

const CATEGORY_SEED_SNAPSHOT = JSON.stringify(CATEGORY_SEED);

export function listCategories(): readonly Category[] {
  initializeCatalogSeed();
  return readStorageValue<Category[]>(CATALOG_STORAGE_KEYS.categories) ?? CATEGORY_SEED;
}

export function findCategoryById(id: string): Category | null {
  return listCategories().find((category) => category.id === id) ?? null;
}

export function getCategoriesSnapshot(): string {
  return readStorageSnapshot(CATALOG_STORAGE_KEYS.categories, CATEGORY_SEED_SNAPSHOT);
}

export function getCategoriesServerSnapshot(): string {
  return CATEGORY_SEED_SNAPSHOT;
}

export function subscribeToCategories(onStoreChange: () => void): () => void {
  const unsubscribe = subscribeToStorage(CATALOG_STORAGE_KEYS.categories, onStoreChange);
  initializeCatalogSeed();
  return unsubscribe;
}
