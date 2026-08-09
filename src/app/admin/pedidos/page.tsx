import type { Metadata } from "next";
import { AdminOrderList } from "@/components/admin/admin-order-list";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Pedidos - Administracao" };

export default function AdminOrdersPage() {
  return (
    <>
      <PageIntro 
        eyebrow="Vendas" 
        title="Pedidos" 
        description="Acompanhe pagamento, separacao e entrega." 
      />
      <AdminOrderList />
    </>
  );
}