import type { Metadata } from "next";
import { AdminCustomerList } from "@/components/admin/admin-customer-list";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Clientes - Administracao" };

export default function AdminCustomersPage() {
  return (
    <>
      <PageIntro
        description="Consulte os clientes cadastrados e seus dados de compra."
        eyebrow="Relacionamento"
        title="Clientes"
      />
      <AdminCustomerList />
    </>
  );
}
