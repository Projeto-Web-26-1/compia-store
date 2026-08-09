import type { Metadata } from "next";
import { CustomerDownloads } from "@/components/account/customer-downloads";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Downloads" };

export default function DownloadsPage() {
  return (
    <>
      <PageIntro
        description="Seus e-books adquiridos ficarão disponíveis aqui."
        eyebrow="Biblioteca digital"
        title="Meus downloads"
      />
      <CustomerDownloads />
    </>
  );
}