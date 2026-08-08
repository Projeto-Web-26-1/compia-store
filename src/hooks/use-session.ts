"use client";

import { useSyncExternalStore } from "react";
import type { User } from "@/entities/user";
import {
  LOADING_SESSION_SNAPSHOT,
  parseSessionSnapshot,
  sessionRepository,
} from "@/repositories/session-repository";

export type SessionState =
  | { readonly status: "loading"; readonly user: null }
  | { readonly status: "anonymous"; readonly user: null }
  | { readonly status: "authenticated"; readonly user: User };

export function useSession(): SessionState {
  const snapshot = useSyncExternalStore(
    sessionRepository.subscribe,
    sessionRepository.getSnapshot,
    sessionRepository.getServerSnapshot,
  );

  if (snapshot === LOADING_SESSION_SNAPSHOT) {
    return { status: "loading", user: null };
  }

  const user = parseSessionSnapshot(snapshot);
  return user
    ? { status: "authenticated", user }
    : { status: "anonymous", user: null };
}
