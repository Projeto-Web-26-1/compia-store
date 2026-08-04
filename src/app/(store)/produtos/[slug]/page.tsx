import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Detalhes do produto" };

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const readableName = slug.replaceAll("-", " ");

  return (
    <div className="container page-space">
      <nav className="breadcrumb" aria-label="Navegacao estrutural">
        <Link href="/">Inicio</Link><span>/</span><Link href="/produtos">Catalogo</Link><span>/</span><span>Produto</span>
      </nav>
      <section className="product-detail">
        <div className="product-detail__cover">
          <small>COMPIA</small><strong>{readableName}</strong><span>Edicao demonstrativa</span>
        </div>
        <div className="product-detail__content">
          <span className="tag">Livro fisico</span>
          <h1>{readableName}</h1>
          <p className="product-author">Por COMPIA Editora</p>
          <p className="product-description">
            Esta rota esta pronta para receber os dados reais do produto na etapa de catalogo.
            A estrutura ja responde corretamente em telas pequenas e grandes.
          </p>
          <strong className="product-price">R$ 79,00</strong>
          <div className="product-actions">
            <button className="button button--primary" type="button">Adicionar ao carrinho</button>
            <span>Disponivel em estoque</span>
          </div>
        </div>
      </section>
    </div>
  );
}
