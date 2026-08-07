import type { Metadata } from "next";
import Link from "next/link";
import { ProductForm } from "@/components/admin/product-form";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Novo produto" };

export default function NewProductPage() {
  return (
    <>
      <Link className="back-link" href="/admin/produtos">← Voltar para produtos</Link>
      <PageIntro eyebrow="Catálogo" title="Novo produto" description="Cadastre um livro e publique-o no catálogo local." />
      <ProductForm />
    </>
  );
}
