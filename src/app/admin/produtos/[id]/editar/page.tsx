import type { Metadata } from "next";
import Link from "next/link";
import { ProductEditor } from "@/components/admin/product-editor";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Editar produto" };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <Link className="back-link" href="/admin/produtos">← Voltar para produtos</Link>
      <PageIntro eyebrow="Catálogo" title="Editar produto" description="Atualize as informações publicadas na loja." />
      <ProductEditor productId={id} />
    </>
  );
}
