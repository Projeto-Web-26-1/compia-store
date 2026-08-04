import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Clientes - Administracao" };

export default function AdminCustomersPage() {
  return <><PageIntro eyebrow="Relacionamento" title="Clientes" description="Consulte clientes e seus historicos de compra." /><div className="admin-panel"><EmptyState icon="○" title="Nenhum cliente cadastrado" description="Os perfis de demonstracao serao criados com os dados iniciais." /></div></>;
}
