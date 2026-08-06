import type { Metadata } from "next";
import { ProductCatalog } from "@/components/products/product-catalog";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Catalogo" };

export default function ProductsPage() {
  return (
    <div className="container page-space">
      <PageIntro
        eyebrow="Catalogo COMPIA"
        title="Conhecimento para o proximo passo"
        description="Explore livros fisicos, e-books e kits sobre os temas que estao transformando a tecnologia."
      />
      <ProductCatalog />
    </div>
  );
}
