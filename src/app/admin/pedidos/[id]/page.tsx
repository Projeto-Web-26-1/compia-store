import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";
import { AdminOrderDetail } from "@/components/admin/admin-order-detail";

export const metadata: Metadata = { title: "Gerenciar pedido" };

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const displayId = id.replace("order-", "").slice(0, 8).toLocaleUpperCase("pt-BR");

  return (
    <>
      <Link className="back-link" href="/admin/pedidos">
        ← Voltar para pedidos
      </Link>
      <PageIntro
        description="Visualize os itens, cliente, pagamento e atualize o status de entrega."
        eyebrow={`Pedido #${displayId}`}
        title="Gerenciar pedido"
      />
      <AdminOrderDetail orderId={id} />
    </>
  );
}