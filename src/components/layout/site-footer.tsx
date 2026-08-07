import Link from "next/link";
import { Brand } from "./brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Brand inverted />
          <p>Conhecimento que conecta pesquisa, tecnologia e mercado.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/produtos">Catálogo</Link>
          <Link href="/minha-conta/downloads">Meus downloads</Link>
          <Link href="/minha-conta/pedidos">Meus pedidos</Link>
        </div>
        <div>
          <h2>Atendimento</h2>
          <a href="mailto:contato@compia.com.br">contato@compia.com.br</a>
          <span>Segunda a sexta, das 8h às 18h</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} COMPIA Editora.</span>
        <span>Projeto demonstrativo — compras simuladas.</span>
      </div>
    </footer>
  );
}
