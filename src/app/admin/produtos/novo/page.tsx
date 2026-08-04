import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Novo produto" };

export default function NewProductPage() {
  return (
    <>
      <Link className="back-link" href="/admin/produtos">← Voltar para produtos</Link>
      <PageIntro eyebrow="Catalogo" title="Novo produto" description="O formulario completo sera implementado junto ao CRUD de produtos." />
      <div className="admin-panel form-placeholder"><span>Formulario de produto</span><p>Informacoes, imagens, preco, classificacao e estoque.</p></div>
    </>
  );
}
