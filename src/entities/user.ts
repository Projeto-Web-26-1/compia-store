export const USER_ROLES = ["customer", "seller", "admin"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: UserRole;
}

export function isUser(value: unknown): value is User {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    Boolean(candidate.id.trim()) &&
    typeof candidate.name === "string" &&
    Boolean(candidate.name.trim()) &&
    typeof candidate.email === "string" &&
    Boolean(candidate.email.trim()) &&
    typeof candidate.role === "string" &&
    USER_ROLES.includes(candidate.role as UserRole)
  );
}
