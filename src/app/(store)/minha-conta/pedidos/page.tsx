import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Meus pedidos" };

export default function OrdersPage() {
  return (
    <>
      <PageIntro eyebrow="Historico" title="Meus pedidos" description="Consulte compras, pagamentos e entregas." />
      <EmptyState icon="□" title="Nenhum pedido por aqui" description="Quando uma compra for concluida, ela aparecera nesta pagina." href="/produtos" action="Conhecer catalogo" />
    </>
  );
}
