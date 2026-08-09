import type { Metadata } from "next";
import Link from "next/link";
import { CustomerOrderDetail } from "@/components/account/customer-order-detail";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Detalhes do pedido" };

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const displayId = id.replace("order-", "").slice(0, 8).toLocaleUpperCase("pt-BR");

  return (
    <>
      <Link className="back-link" href="/minha-conta/pedidos">
        ← Voltar aos pedidos
      </Link>
      <PageIntro
        description="Consulte os itens, valores e o status de entrega desta compra."
        eyebrow={`Pedido #${displayId}`}
        title="Detalhes do pedido"
      />
      <CustomerOrderDetail orderId={id} />
    </>
  );
}