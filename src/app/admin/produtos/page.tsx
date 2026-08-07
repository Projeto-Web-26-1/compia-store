import type { Metadata } from "next";
import { ProductList } from "@/components/admin/product-list";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Produtos - Administracao" };

export default function AdminProductsPage() {
  return (
    <>
      <PageIntro eyebrow="Catalogo" title="Produtos" description="Cadastre e mantenha os itens publicados na loja." actionHref="/admin/produtos/novo" actionLabel="Novo produto" />
      <ProductList />
    </>
  );
}
