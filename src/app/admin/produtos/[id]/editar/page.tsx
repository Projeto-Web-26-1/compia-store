import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Editar produto" };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <Link className="back-link" href="/admin/produtos">← Voltar para produtos</Link>
      <PageIntro eyebrow={`Produto ${id}`} title="Editar produto" description="Esta rota esta pronta para carregar e atualizar um produto local." />
      <div className="admin-panel form-placeholder"><span>Formulario de edicao</span><p>Os campos serao conectados ao repositorio de produtos.</p></div>
    </>
  );
}
