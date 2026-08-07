import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Painel administrativo" };

export default function AdminDashboardPage() {
  return (
    <>
      <PageIntro eyebrow="Painel administrativo" title="Visão geral" description="Acompanhe a operação demonstrativa da editora." actionHref="/admin/produtos/novo" actionLabel="Novo produto" />
      <div className="admin-metrics">
        {[["Produtos", "0", "Catalogo local"], ["Pedidos", "0", "Este mes"], ["Clientes", "0", "Cadastrados"], ["Faturamento", "R$ 0", "Simulado"]].map(([label, value, detail]) => (
          <article key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>
        ))}
      </div>
      <section className="admin-panel">
        <div className="admin-panel__heading"><div><h2>Primeiros passos</h2><p>A estrutura está pronta para receber os dados locais.</p></div></div>
        <div className="admin-actions">
          <Link href="/admin/produtos/novo"><span>01</span><div><strong>Cadastrar produtos</strong><small>Preencha o catálogo inicial</small></div><b>→</b></Link>
          <Link href="/admin/categorias"><span>02</span><div><strong>Organizar categorias</strong><small>Estruture os temas da editora</small></div><b>→</b></Link>
          <Link href="/admin/pedidos"><span>03</span><div><strong>Acompanhar pedidos</strong><small>Visualize o fluxo de vendas</small></div><b>→</b></Link>
        </div>
      </section>
    </>
  );
}
