import type { Metadata } from "next";
import { AdminMetrics } from "@/components/admin/admin-metrics";
import { AdminQuickActions } from "@/components/admin/admin-quick-actions";
import { AdminLowStock } from "@/components/admin/admin-low-stock";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Painel administrativo" };

export default function AdminDashboardPage() {
  return (
    <>
      <PageIntro
        description="Acompanhe a operação demonstrativa da editora."
        eyebrow="Painel administrativo"
        title="Visão geral"
      />
      <AdminMetrics />
      <section className="admin-panel">
        <div className="admin-panel__heading">
          <div>
            <h2>Gestão da loja</h2>
            <p>Acesse rapidamente os módulos de administração.</p>
          </div>
        </div>
        <AdminQuickActions />
      </section>
      <AdminLowStock />
    </>
  );
}