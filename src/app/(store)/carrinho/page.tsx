import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Carrinho" };

export default function CartPage() {
  return (
    <div className="container page-space page-narrow">
      <PageIntro eyebrow="Sua selecao" title="Carrinho" description="Revise os itens antes de seguir para o checkout." />
      <EmptyState icon="◇" title="Seu carrinho esta vazio" description="Explore o catalogo e encontre seu proximo livro." href="/produtos" action="Explorar catalogo" />
    </div>
  );
}
