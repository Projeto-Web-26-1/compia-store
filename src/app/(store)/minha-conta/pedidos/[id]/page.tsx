import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Detalhes do pedido" };

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <Link className="back-link" href="/minha-conta/pedidos">← Voltar aos pedidos</Link>
      <PageIntro eyebrow={`Pedido ${id}`} title="Detalhes do pedido" description="Esta tela recebera itens, pagamento, entrega e linha do tempo do pedido." />
      <div className="notice-card"><strong>Rota preparada</strong><p>Os dados serao conectados ao repositorio local nas proximas etapas.</p></div>
    </>
  );
}
