import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = { title: "Catalogo" };

const placeholders = ["IA generativa", "Software inteligente", "Ciberseguranca"];

export default function ProductsPage() {
  return (
    <div className="container page-space">
      <PageIntro
        eyebrow="Catalogo COMPIA"
        title="Conhecimento para o proximo passo"
        description="Explore livros fisicos, e-books e kits sobre os temas que estao transformando a tecnologia."
      />
      <div className="catalog-toolbar" aria-label="Controles do catalogo">
        <button type="button">Filtros</button>
        <span>Produtos demonstrativos</span>
        <select aria-label="Ordenar produtos" defaultValue="recentes">
          <option value="recentes">Mais recentes</option>
          <option value="menor-preco">Menor preco</option>
          <option value="maior-preco">Maior preco</option>
        </select>
      </div>
      <div className="product-grid">
        {placeholders.map((name, index) => (
          <article className="product-card" key={name}>
            <Link className={`product-card__cover cover--${index + 1}`} href={`/produtos/produto-${index + 1}`}>
              <small>COMPIA</small>
              <strong>{name}</strong>
              <span>Edicao demonstrativa</span>
            </Link>
            <div className="product-card__body">
              <span className="tag">Livro fisico</span>
              <h2><Link href={`/produtos/produto-${index + 1}`}>{name}</Link></h2>
              <p>Produto de exemplo para validacao da estrutura visual.</p>
              <div className="product-card__footer">
                <strong>R$ {(59 + index * 20).toFixed(2).replace(".", ",")}</strong>
                <Link href={`/produtos/produto-${index + 1}`} aria-label={`Ver ${name}`}>Ver →</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
