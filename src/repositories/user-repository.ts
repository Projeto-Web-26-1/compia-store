import { isUser, type User } from "@/entities/user";
import {
  hasStorageValue,
  readStorageValue,
  subscribeToStorage,
  writeStorageValue,
} from "@/storage/local-storage";

const USER_STORAGE_KEY = "compia:v1:users";

interface UserAccount {
  readonly user: User;
  readonly passwordHash: string;
}

const USER_ACCOUNT_SEED = [
  {
    user: {
      id: "user-admin-demo",
      name: "Administrador COMPIA",
      email: "admin@compia.com.br",
      role: "admin",
    },
    passwordHash: "ef9c9c323a8d0252e5f5ee9857c74e409e0992ddb44543090a8c9a62855be6c2",
  },
  {
    user: {
      id: "user-seller-demo",
      name: "Vendedor COMPIA",
      email: "vendedor@compia.com.br",
      role: "seller",
    },
    passwordHash: "42b0508dd8c85af34f955d2018563b778b1a6ed41d9809e0ad3b8195da6686c3",
  },
  {
    user: {
      id: "user-customer-demo",
      name: "Cliente COMPIA",
      email: "cliente@compia.com.br",
      role: "customer",
    },
    passwordHash: "a32884cf10f83309e4837faf80d7c0c6397489ad6fcfceecde4e7ae4e6ac6a50",
  },
] satisfies readonly UserAccount[];

const CUSTOMER_SEED = USER_ACCOUNT_SEED
  .map((account) => account.user)
  .filter((user) => user.role === "customer");
const CUSTOMER_SEED_SNAPSHOT = JSON.stringify(CUSTOMER_SEED);

export type RegisterCustomerResult =
  | { readonly ok: true; readonly user: User }
  | { readonly ok: false; readonly reason: "email_in_use" | "invalid_data" };

function normalizeEmail(email: string): string {
  return email.trim().toLocaleLowerCase("pt-BR");
}

function isUserAccount(value: unknown): value is UserAccount {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return isUser(candidate.user) && typeof candidate.passwordHash === "string";
}

function initializeUserSeed(): void {
  if (!hasStorageValue(USER_STORAGE_KEY)) {
    writeStorageValue(USER_STORAGE_KEY, USER_ACCOUNT_SEED);
  }
}

function listAccounts(): readonly UserAccount[] {
  initializeUserSeed();
  const storedAccounts = readStorageValue<unknown>(USER_STORAGE_KEY);

  if (!Array.isArray(storedAccounts) || !storedAccounts.every(isUserAccount)) {
    return USER_ACCOUNT_SEED;
  }

  return storedAccounts;
}

export function listCustomers(): readonly User[] {
  return listAccounts()
    .map((account) => account.user)
    .filter((user) => user.role === "customer");
}

export function getCustomersSnapshot(): string {
  return JSON.stringify(listCustomers());
}

export function getCustomersServerSnapshot(): string {
  return CUSTOMER_SEED_SNAPSHOT;
}

export function subscribeToCustomers(onStoreChange: () => void): () => void {
  initializeUserSeed();
  return subscribeToStorage(USER_STORAGE_KEY, onStoreChange);
}

async function hashPassword(email: string, password: string): Promise<string> {
  const content = new TextEncoder().encode(`${normalizeEmail(email)}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", content);

  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const normalizedEmail = normalizeEmail(email);
  const account = listAccounts().find(
    (currentAccount) => normalizeEmail(currentAccount.user.email) === normalizedEmail,
  );

  if (!account) {
    return null;
  }

  const passwordHash = await hashPassword(normalizedEmail, password);
  return passwordHash === account.passwordHash ? account.user : null;
}

export async function registerCustomer(
  name: string,
  email: string,
  password: string,
): Promise<RegisterCustomerResult> {
  const normalizedName = name.trim();
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedName || !normalizedEmail || password.length < 6) {
    return { ok: false, reason: "invalid_data" };
  }

  const accounts = [...listAccounts()];

  if (
    accounts.some(
      (account) => normalizeEmail(account.user.email) === normalizedEmail,
    )
  ) {
    return { ok: false, reason: "email_in_use" };
  }

  const user: User = {
    id: `user-${crypto.randomUUID()}`,
    name: normalizedName,
    email: normalizedEmail,
    role: "customer",
  };
  const passwordHash = await hashPassword(normalizedEmail, password);

  writeStorageValue(USER_STORAGE_KEY, [...accounts, { user, passwordHash }]);
  return { ok: true, user };
}
