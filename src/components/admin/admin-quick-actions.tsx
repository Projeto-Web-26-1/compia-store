"use client";

import Link from "next/link";
import {
  canAccess,
  type AccessPermission,
} from "@/domain/auth/access-control";
import { useSession } from "@/hooks/use-session";

const quickActions = [
  {
    href: "/admin/produtos/novo",
    title: "Cadastrar produtos",
    description: "Preencha o catálogo inicial",
    permission: "manage_catalog",
  },
  {
    href: "/admin/categorias",
    title: "Consultar categorias",
    description: "Veja os temas fixos da editora",
    permission: "manage_catalog",
  },
  {
    href: "/admin/pedidos",
    title: "Acompanhar pedidos",
    description: "Visualize o fluxo de vendas",
    permission: "manage_orders",
  },
  {
    href: "/admin/clientes",
    title: "Consultar clientes",
    description: "Acompanhe os clientes cadastrados",
    permission: "manage_customers",
  },
] satisfies readonly {
  href: string;
  title: string;
  description: string;
  permission: AccessPermission;
}[];

export function AdminQuickActions() {
  const session = useSession();

  if (session.status !== "authenticated") {
    return null;
  }

  const visibleActions = quickActions.filter((action) =>
    canAccess(session.user, action.permission),
  );

  return (
    <div className="admin-actions">
      {visibleActions.map((action, index) => (
        <Link href={action.href} key={action.href}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <strong>{action.title}</strong>
            <small>{action.description}</small>
          </div>
          <b>→</b>
        </Link>
      ))}
    </div>
  );
}
