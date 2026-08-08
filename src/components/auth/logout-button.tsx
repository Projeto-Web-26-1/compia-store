"use client";

import { useRouter } from "next/navigation";
import { sessionRepository } from "@/repositories/session-repository";

interface LogoutButtonProps {
  readonly className?: string;
  readonly redirectTo?: string;
}

export function LogoutButton({
  className,
  redirectTo = "/login",
}: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = () => {
    sessionRepository.clear();
    router.replace(redirectTo);
  };

  return (
    <button className={className} onClick={handleLogout} type="button">
      Sair
    </button>
  );
}
