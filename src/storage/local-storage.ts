const STORAGE_CHANGE_EVENT = "compia:storage-change";

function canUseLocalStorage(): boolean {
  return typeof window !== "undefined";
}

export function hasStorageValue(key: string): boolean {
  return canUseLocalStorage() && window.localStorage.getItem(key) !== null;
}

export function readStorageValue<T>(key: string): T | null {
  if (!canUseLocalStorage()) {
    return null;
  }

  const storedValue = window.localStorage.getItem(key);

  if (storedValue === null) {
    return null;
  }

  try {
    return JSON.parse(storedValue) as T;
  } catch {
    return null;
  }
}

export function readStorageSnapshot(key: string, fallback: string): string {
  if (!canUseLocalStorage()) {
    return fallback;
  }

  return window.localStorage.getItem(key) ?? fallback;
}

export function writeStorageValue<T>(key: string, value: T): void {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(STORAGE_CHANGE_EVENT, { detail: { key } }));
}

export function removeStorageValue(key: string): void {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(key);
  window.dispatchEvent(new CustomEvent(STORAGE_CHANGE_EVENT, { detail: { key } }));
}

export function subscribeToStorage(key: string, onStoreChange: () => void): () => void {
  if (!canUseLocalStorage()) {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === key) {
      onStoreChange();
    }
  };

  const handleLocalChange = (event: Event) => {
    if (event instanceof CustomEvent && event.detail?.key === key) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(STORAGE_CHANGE_EVENT, handleLocalChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(STORAGE_CHANGE_EVENT, handleLocalChange);
  };
}
