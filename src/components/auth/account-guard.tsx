"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";

export function AccountGuard({ children }: { readonly children: ReactNode }) {
  const router = useRouter();
  const session = useSession();
  const role = session.status === "authenticated" ? session.user.role : null;

  useEffect(() => {
    if (session.status === "anonymous") {
      router.replace("/login");
    } else if (session.status === "authenticated" && role !== "customer") {
      router.replace("/admin");
    }
  }, [role, router, session.status]);

  if (session.status !== "authenticated" || session.user.role !== "customer") {
    return (
      <div className="route-loading" role="status">
        Verificando acesso…
      </div>
    );
  }

  return children;
}
