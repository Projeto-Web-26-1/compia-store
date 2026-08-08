"use client";

import Link from "next/link";
import {
  canAccess,
  type AccessPermission,
} from "@/domain/auth/access-control";
import { useSession } from "@/hooks/use-session";
import { Brand } from "./brand";

const adminLinks = [
  { href: "/admin", label: "Visão geral", icon: "⌂", permission: "view_admin" },
  { href: "/admin/produtos", label: "Produtos", icon: "□", permission: "manage_catalog" },
  { href: "/admin/categorias", label: "Categorias", icon: "#", permission: "manage_catalog" },
  { href: "/admin/pedidos", label: "Pedidos", icon: "≡", permission: "manage_orders" },
  { href: "/admin/clientes", label: "Clientes", icon: "○", permission: "manage_customers" },
] satisfies readonly {
  href: string;
  label: string;
  icon: string;
  permission: AccessPermission;
}[];

function useVisibleAdminLinks() {
  const session = useSession();

  if (session.status !== "authenticated") {
    return [];
  }

  return adminLinks.filter((link) => canAccess(session.user, link.permission));
}

export function AdminSidebar() {
  const visibleLinks = useVisibleAdminLinks();

  return (
    <aside className="admin-sidebar">
      <Brand compact inverted />
      <div className="admin-sidebar__label">Administração</div>
      <nav aria-label="Navegação administrativa">
        {visibleLinks.map((link) => (
          <Link href={link.href} key={link.href}><span aria-hidden="true">{link.icon}</span>{link.label}</Link>
        ))}
      </nav>
      <Link className="admin-sidebar__store" href="/">← Voltar para a loja</Link>
    </aside>
  );
}

export function AdminMobileNavigation() {
  const visibleLinks = useVisibleAdminLinks();

  return (
    <details className="admin-mobile-menu">
      <summary>Menu</summary>
      <nav aria-label="Navegação administrativa para dispositivos móveis">
        {visibleLinks.map((link) => (
          <Link href={link.href} key={link.href}>{link.label}</Link>
        ))}
        <Link href="/">Voltar para a loja</Link>
      </nav>
    </details>
  );
}
