"use client";

import { PageIntro } from "@/components/ui/page-intro";
import { useSession } from "@/hooks/use-session";

export default function AccountPage() {
  const session = useSession();
  const userName = session.status === "authenticated" ? session.user.name : "leitor";

  return (
    <>
      <PageIntro
        eyebrow="Área do cliente"
        title={`Olá, ${userName}`}
        description="Acompanhe seus pedidos e materiais digitais em um só lugar."
      />
      <div className="metric-grid">
        <article>
          <span>Pedidos</span>
          <strong>0</strong>
          <small>Nenhum pedido realizado</small>
        </article>
        <article>
          <span>Downloads</span>
          <strong>0</strong>
          <small>Nenhum arquivo disponível</small>
        </article>
      </div>
    </>
  );
}
