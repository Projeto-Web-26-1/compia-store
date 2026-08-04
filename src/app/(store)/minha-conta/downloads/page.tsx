import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Downloads" };

export default function DownloadsPage() {
  return (
    <>
      <PageIntro eyebrow="Biblioteca digital" title="Meus downloads" description="Seus e-books adquiridos ficarao disponiveis aqui." />
      <EmptyState icon="↓" title="Nenhum download disponivel" description="E-books de pedidos aprovados aparecerao nesta biblioteca." href="/produtos" action="Explorar e-books" />
    </>
  );
}
