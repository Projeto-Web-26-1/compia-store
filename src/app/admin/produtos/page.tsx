import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Produtos - Administracao" };

export default function AdminProductsPage() {
  return (
    <>
      <PageIntro eyebrow="Catalogo" title="Produtos" description="Cadastre e mantenha os itens publicados na loja." actionHref="/admin/produtos/novo" actionLabel="Novo produto" />
      <div className="admin-panel"><EmptyState icon="□" title="Nenhum produto cadastrado" description="Os produtos iniciais serao adicionados na etapa de persistencia." href="/admin/produtos/novo" action="Cadastrar produto" /></div>
    </>
  );
}
