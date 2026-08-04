import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Gerenciar pedido" };

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <><Link className="back-link" href="/admin/pedidos">← Voltar para pedidos</Link><PageIntro eyebrow={`Pedido ${id}`} title="Gerenciar pedido" description="Itens, cliente, pagamento e entrega serao exibidos nesta rota." /><div className="admin-panel form-placeholder"><span>Linha do tempo do pedido</span><p>Estrutura preparada para as transicoes de status.</p></div></>;
}
