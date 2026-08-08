"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { getRoleLabel } from "@/domain/auth/access-control";
import { useSession } from "@/hooks/use-session";

export function AdminSessionUser() {
  const session = useSession();

  if (session.status !== "authenticated") {
    return null;
  }

  const roleLabel = getRoleLabel(session.user.role);
  const initials = roleLabel.slice(0, 2).toLocaleUpperCase("pt-BR");

  return (
    <div className="admin-session-user">
      <div className="admin-user">
        <span>{initials}</span>
        <div>
          <strong>{roleLabel}</strong>
          <small>{session.user.email}</small>
        </div>
      </div>
      <LogoutButton className="admin-logout" />
    </div>
  );
}
