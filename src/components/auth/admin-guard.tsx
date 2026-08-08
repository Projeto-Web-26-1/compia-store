"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  canAccess,
  getAdminRoutePermission,
} from "@/domain/auth/access-control";
import { useSession } from "@/hooks/use-session";
import { EmptyState } from "@/components/ui/empty-state";

export function AdminGuard({ children }: { readonly children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const role = session.status === "authenticated" ? session.user.role : null;

  useEffect(() => {
    if (session.status === "anonymous") {
      router.replace("/login");
    } else if (session.status === "authenticated" && role === "customer") {
      router.replace("/minha-conta");
    }
  }, [role, router, session.status]);

  if (session.status !== "authenticated" || session.user.role === "customer") {
    return (
      <div className="route-loading" role="status">
        Verificando acesso…
      </div>
    );
  }

  const requiredPermission = getAdminRoutePermission(pathname);

  if (!canAccess(session.user, requiredPermission)) {
    return (
      <div className="access-denied-page">
        <EmptyState
          action="Voltar ao painel"
          description="Seu perfil não possui permissão para acessar esta área."
          href="/admin"
          icon="!"
          title="Acesso não autorizado"
        />
      </div>
    );
  }

  return children;
}
