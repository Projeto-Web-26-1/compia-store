import type { Metadata } from "next";
import { CustomerOrderList } from "@/components/account/customer-order-list";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Meus pedidos" };

export default function OrdersPage() {
  return (
    <>
      <PageIntro
        description="Consulte compras, pagamentos e entregas."
        eyebrow="Histórico"
        title="Meus pedidos"
      />
      <CustomerOrderList />
    </>
  );
}