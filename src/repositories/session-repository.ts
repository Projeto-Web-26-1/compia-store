import { isUser, type User } from "@/entities/user";
import {
  readStorageSnapshot,
  readStorageValue,
  removeStorageValue,
  subscribeToStorage,
  writeStorageValue,
} from "@/storage/local-storage";

const SESSION_STORAGE_KEY = "compia:v1:session";
const LEGACY_SESSION_STORAGE_KEY = "compia_logged_user";
const EMPTY_SESSION_SNAPSHOT = "null";
export const LOADING_SESSION_SNAPSHOT = "__compia_session_loading__";

export function parseSessionSnapshot(snapshot: string): User | null {
  if (snapshot === LOADING_SESSION_SNAPSHOT) {
    return null;
  }

  try {
    const value: unknown = JSON.parse(snapshot);
    return isUser(value) ? value : null;
  } catch {
    return null;
  }
}

export const sessionRepository = {
  getUser(): User | null {
    const value = readStorageValue<unknown>(SESSION_STORAGE_KEY);
    return isUser(value) ? value : null;
  },

  saveUser(user: User): void {
    writeStorageValue(SESSION_STORAGE_KEY, user);
    removeStorageValue(LEGACY_SESSION_STORAGE_KEY);
  },

  clear(): void {
    removeStorageValue(SESSION_STORAGE_KEY);
    removeStorageValue(LEGACY_SESSION_STORAGE_KEY);
  },

  getSnapshot(): string {
    const snapshot = readStorageSnapshot(SESSION_STORAGE_KEY, EMPTY_SESSION_SNAPSHOT);
    return parseSessionSnapshot(snapshot) ? snapshot : EMPTY_SESSION_SNAPSHOT;
  },

  getServerSnapshot(): string {
    return LOADING_SESSION_SNAPSHOT;
  },

  subscribe(onStoreChange: () => void): () => void {
    return subscribeToStorage(SESSION_STORAGE_KEY, onStoreChange);
  },
};
