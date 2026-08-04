import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Minha conta" };

export default function AccountPage() {
  return (
    <>
      <PageIntro eyebrow="Area do cliente" title="Ola, leitor" description="Acompanhe seus pedidos e materiais digitais em um so lugar." />
      <div className="metric-grid">
        <article><span>Pedidos</span><strong>0</strong><small>Nenhum pedido realizado</small></article>
        <article><span>Downloads</span><strong>0</strong><small>Nenhum arquivo disponivel</small></article>
      </div>
    </>
  );
}
