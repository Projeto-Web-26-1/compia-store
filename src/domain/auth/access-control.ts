import type { User, UserRole } from "@/entities/user";

export const ACCESS_PERMISSIONS = [
  "view_admin",
  "manage_catalog",
  "manage_orders",
  "manage_customers",
] as const;

export type AccessPermission = (typeof ACCESS_PERMISSIONS)[number];

const ROLE_PERMISSIONS: Record<UserRole, readonly AccessPermission[]> = {
  customer: [],
  seller: ["view_admin", "manage_orders", "manage_customers"],
  admin: ACCESS_PERMISSIONS,
};

const ROLE_LABELS: Record<UserRole, string> = {
  customer: "Cliente",
  seller: "Vendedor",
  admin: "Administrador",
};

export function canAccess(
  user: Pick<User, "role">,
  permission: AccessPermission,
): boolean {
  return ROLE_PERMISSIONS[user.role].includes(permission);
}

export function getRoleLabel(role: UserRole): string {
  return ROLE_LABELS[role];
}

export function getUserStartPath(user: Pick<User, "role">): string {
  return canAccess(user, "view_admin") ? "/admin" : "/minha-conta";
}

export function getAdminRoutePermission(pathname: string): AccessPermission {
  if (pathname.startsWith("/admin/produtos") || pathname.startsWith("/admin/categorias")) {
    return "manage_catalog";
  }

  if (pathname.startsWith("/admin/pedidos")) {
    return "manage_orders";
  }

  if (pathname.startsWith("/admin/clientes")) {
    return "manage_customers";
  }

  return "view_admin";
}
