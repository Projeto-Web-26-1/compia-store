import type { Metadata } from "next";
import { AdminMetrics } from "@/components/admin/admin-metrics";
import { AdminQuickActions } from "@/components/admin/admin-quick-actions";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Painel administrativo" };

export default function AdminDashboardPage() {
  return (
    <>
      <PageIntro eyebrow="Painel administrativo" title="Visão geral" description="Acompanhe a operação demonstrativa da editora." />
      <AdminMetrics />
      <section className="admin-panel">
        <div className="admin-panel__heading"><div><h2>Primeiros passos</h2><p>A estrutura está pronta para receber os dados locais.</p></div></div>
        <AdminQuickActions />
      </section>
    </>
  );
}
