import type { DigitalAsset } from "@/entities/digital-asset";
import {
  CATALOG_STORAGE_KEYS,
  DIGITAL_ASSET_SEED,
  initializeCatalogSeed,
} from "@/storage/seeds/catalog";
import { readStorageValue, writeStorageValue } from "@/storage/local-storage";

export function listDigitalAssets(): readonly DigitalAsset[] {
  initializeCatalogSeed();
  return (
    readStorageValue<DigitalAsset[]>(CATALOG_STORAGE_KEYS.digitalAssets) ?? DIGITAL_ASSET_SEED
  );
}

export function findDigitalAssetsByProductId(productId: string): readonly DigitalAsset[] {
  return listDigitalAssets().filter((asset) => asset.productId === productId);
}

export function saveDigitalAsset(asset: DigitalAsset): void {
  const assets = [...listDigitalAssets()];
  const assetIndex = assets.findIndex((currentAsset) => currentAsset.id === asset.id);

  if (assetIndex === -1) {
    assets.push(asset);
  } else {
    assets[assetIndex] = asset;
  }

  writeStorageValue(CATALOG_STORAGE_KEYS.digitalAssets, assets);
}

export function deleteDigitalAsset(id: string): boolean {
  const assets = listDigitalAssets();
  const remainingAssets = assets.filter((asset) => asset.id !== id);

  if (remainingAssets.length === assets.length) {
    return false;
  }

  writeStorageValue(CATALOG_STORAGE_KEYS.digitalAssets, remainingAssets);
  return true;
}
