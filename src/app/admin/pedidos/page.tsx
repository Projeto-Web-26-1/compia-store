import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Pedidos - Administracao" };

export default function AdminOrdersPage() {
  return <><PageIntro eyebrow="Vendas" title="Pedidos" description="Acompanhe pagamento, separacao e entrega." /><div className="admin-panel"><EmptyState icon="≡" title="Nenhum pedido recebido" description="Pedidos simulados aparecerao aqui depois do checkout." /></div></>;
}
