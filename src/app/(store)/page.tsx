import Link from "next/link";
import { CatalogCategories } from "@/components/products/catalog-categories";

const benefits = [
  { number: "01", title: "Curadoria especializada", text: "Obras selecionadas para estudantes e profissionais de tecnologia." },
  { number: "02", title: "Formatos flexíveis", text: "Escolha entre livros físicos, e-books e kits de aprendizagem." },
  { number: "03", title: "Conteúdo que acompanha o mercado", text: "Conhecimento técnico com linguagem clara e aplicação prática." },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero__content">
          <div className="hero__copy">
            <span className="eyebrow eyebrow--light">Tecnologia para quem constrói o futuro</span>
            <h1>Conhecimento em IA, da pesquisa para a prática.</h1>
            <p>
              Livros e materiais de alta qualidade para aprofundar sua jornada em
              inteligência artificial, software e segurança.
            </p>
            <div className="hero__actions">
              <Link className="button button--accent" href="/produtos">Explorar catálogo</Link>
              <a className="button button--ghost" href="#categorias">Ver categorias</a>
            </div>
          </div>

          <div className="hero-art" aria-label="Ilustração abstrata de conexões neurais">
            <div className="hero-art__book">
              <span>COMPIA</span>
              <strong>Inteligência<br />Artificial</strong>
              <small>Fundamentos e aplicações</small>
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
            <span className="eyebrow">Encontre seu próximo tema</span>
            <h2>Explore por categoria</h2>
          </div>
          <Link className="text-link" href="/produtos">Ver catálogo completo →</Link>
        </div>
        <CatalogCategories />
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Por que a COMPIA</span>
              <h2>Conhecimento feito para avançar</h2>
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
          <h2>Conteúdo relevante, direto na sua caixa de entrada.</h2>
        </div>
        <form className="newsletter__form">
          <label className="sr-only" htmlFor="newsletter-email">Seu melhor e-mail</label>
          <input id="newsletter-email" type="email" placeholder="você@exemplo.com" />
          <button className="button button--accent" type="button">Quero receber</button>
        </form>
      </section>
    </>
  );
}
