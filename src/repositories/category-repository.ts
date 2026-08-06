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
  writeStorageValue,
} from "@/storage/local-storage";

const CATEGORY_SEED_SNAPSHOT = JSON.stringify(CATEGORY_SEED);

export function listCategories(): readonly Category[] {
  initializeCatalogSeed();
  return readStorageValue<Category[]>(CATALOG_STORAGE_KEYS.categories) ?? CATEGORY_SEED;
}

export function findCategoryById(id: string): Category | null {
  return listCategories().find((category) => category.id === id) ?? null;
}

export function saveCategory(category: Category): void {
  const categories = [...listCategories()];
  const categoryIndex = categories.findIndex((currentCategory) => currentCategory.id === category.id);

  if (categoryIndex === -1) {
    categories.push(category);
  } else {
    categories[categoryIndex] = category;
  }

  writeStorageValue(CATALOG_STORAGE_KEYS.categories, categories);
}

export function deleteCategory(id: string): boolean {
  const categories = listCategories();
  const remainingCategories = categories.filter((category) => category.id !== id);

  if (remainingCategories.length === categories.length) {
    return false;
  }

  writeStorageValue(CATALOG_STORAGE_KEYS.categories, remainingCategories);
  return true;
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
