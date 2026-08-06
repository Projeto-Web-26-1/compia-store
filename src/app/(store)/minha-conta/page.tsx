"use client";

import React, { useEffect, useState } from "react";
import { PageIntro } from "@/components/ui/page-intro";
import { User } from "@/entities/user";

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("compia_logged_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  return (
    <>
      <PageIntro
        eyebrow="Area do cliente"
        title={`Ola, ${user ? user.name : "leitor"}`}
        description="Acompanhe seus pedidos e materiais digitais em um so lugar."
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
          <small>Nenhum arquivo disponivel</small>
        </article>
      </div>
    </>
  );
}