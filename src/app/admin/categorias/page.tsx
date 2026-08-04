import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Categorias - Administracao" };

export default function AdminCategoriesPage() {
  return <><PageIntro eyebrow="Organizacao" title="Categorias" description="Organize os produtos por areas de conhecimento." actionHref="#" actionLabel="Nova categoria" /><div className="admin-panel"><EmptyState icon="#" title="Categorias em preparacao" description="O gerenciamento sera conectado ao armazenamento local." /></div></>;
}
