"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";

interface AccountGuardProps {
  readonly children: ReactNode;
  readonly loginPath?: string;
}

export function AccountGuard({ children, loginPath = "/login" }: AccountGuardProps) {
  const router = useRouter();
  const session = useSession();
  const role = session.status === "authenticated" ? session.user.role : null;

  useEffect(() => {
    if (session.status === "anonymous") {
      router.replace(loginPath);
    } else if (session.status === "authenticated" && role !== "customer") {
      router.replace("/admin");
    }
  }, [loginPath, role, router, session.status]);

  if (session.status !== "authenticated" || session.user.role !== "customer") {
    return (
      <div className="route-loading" role="status">
        Verificando acesso…
      </div>
    );
  }

  return children;
}
