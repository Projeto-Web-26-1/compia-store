import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Finalizar compra" };

export default function CheckoutPage() {
  return (
    <div className="container page-space page-narrow">
      <PageIntro eyebrow="Etapa segura" title="Finalizar compra" description="Identificacao, entrega e pagamento serao implementados na etapa de checkout." />
      <div className="step-list">
        {[
          ["01", "Identificacao", "Dados pessoais e contato"],
          ["02", "Entrega", "Endereco, frete ou retirada"],
          ["03", "Pagamento", "PIX ou cartao simulado"],
        ].map(([number, title, text]) => (
          <div className="step-item" key={number}><span>{number}</span><div><strong>{title}</strong><p>{text}</p></div></div>
        ))}
      </div>
    </div>
  );
}
