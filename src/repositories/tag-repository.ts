import type { Tag } from "@/entities/tag";
import {
  CATALOG_STORAGE_KEYS,
  initializeCatalogSeed,
  TAG_SEED,
} from "@/storage/seeds/catalog";
import { readStorageValue, writeStorageValue } from "@/storage/local-storage";

export function listTags(): readonly Tag[] {
  initializeCatalogSeed();
  return readStorageValue<Tag[]>(CATALOG_STORAGE_KEYS.tags) ?? TAG_SEED;
}

export function findTagById(id: string): Tag | null {
  return listTags().find((tag) => tag.id === id) ?? null;
}

export function saveTag(tag: Tag): void {
  const tags = [...listTags()];
  const tagIndex = tags.findIndex((currentTag) => currentTag.id === tag.id);

  if (tagIndex === -1) {
    tags.push(tag);
  } else {
    tags[tagIndex] = tag;
  }

  writeStorageValue(CATALOG_STORAGE_KEYS.tags, tags);
}

export function deleteTag(id: string): boolean {
  const tags = listTags();
  const remainingTags = tags.filter((tag) => tag.id !== id);

  if (remainingTags.length === tags.length) {
    return false;
  }

  writeStorageValue(CATALOG_STORAGE_KEYS.tags, remainingTags);
  return true;
}
