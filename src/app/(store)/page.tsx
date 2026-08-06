import Link from "next/link";
import { CatalogCategories } from "@/components/products/catalog-categories";

const benefits = [
  { number: "01", title: "Curadoria especializada", text: "Obras selecionadas para estudantes e profissionais de tecnologia." },
  { number: "02", title: "Formatos flexiveis", text: "Escolha entre livros fisicos, e-books e kits de aprendizagem." },
  { number: "03", title: "Conteudo que acompanha o mercado", text: "Conhecimento tecnico com linguagem clara e aplicacao pratica." },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero__content">
          <div className="hero__copy">
            <span className="eyebrow eyebrow--light">Tecnologia para quem constroi o futuro</span>
            <h1>Conhecimento em IA, da pesquisa para a pratica.</h1>
            <p>
              Livros e materiais de alta qualidade para aprofundar sua jornada em
              inteligencia artificial, software e seguranca.
            </p>
            <div className="hero__actions">
              <Link className="button button--accent" href="/produtos">Explorar catalogo</Link>
              <a className="button button--ghost" href="#categorias">Ver categorias</a>
            </div>
          </div>

          <div className="hero-art" aria-label="Ilustracao abstrata de conexoes neurais">
            <div className="hero-art__book">
              <span>COMPIA</span>
              <strong>Inteligencia<br />Artificial</strong>
              <small>Fundamentos e aplicacoes</small>
            </div>
            <span className="orbit orbit--one" />
            <span className="orbit orbit--two" />
            <span className="node node--one" />
            <span className="node node--two" />
            <span className="node node--three" />
          </div>
        </div>
      </section>

      <section className="section container" id="categorias">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Encontre seu proximo tema</span>
            <h2>Explore por categoria</h2>
          </div>
          <Link className="text-link" href="/produtos">Ver catalogo completo →</Link>
        </div>
        <CatalogCategories />
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Por que a COMPIA</span>
              <h2>Conhecimento feito para avancar</h2>
            </div>
          </div>
          <div className="benefit-grid">
            {benefits.map((benefit) => (
              <article className="benefit-card" key={benefit.number}>
                <span>{benefit.number}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container newsletter">
        <div>
          <span className="eyebrow eyebrow--light">Novidades da editora</span>
          <h2>Conteudo relevante, direto na sua caixa de entrada.</h2>
        </div>
        <form className="newsletter__form">
          <label className="sr-only" htmlFor="newsletter-email">Seu melhor e-mail</label>
          <input id="newsletter-email" type="email" placeholder="voce@exemplo.com" />
          <button className="button button--accent" type="button">Quero receber</button>
        </form>
      </section>
    </>
  );
}
