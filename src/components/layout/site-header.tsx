import Link from "next/link";
import { Brand } from "./brand";

const navigation = [
  { href: "/", label: "Inicio" },
  { href: "/produtos", label: "Catalogo" },
  { href: "/minha-conta/pedidos", label: "Meus pedidos" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__content">
        <Brand />

        <nav className="desktop-nav" aria-label="Navegacao principal">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="header-link" href="/login">Entrar</Link>
          <Link className="cart-link" href="/carrinho" aria-label="Abrir carrinho, zero itens">
            <span aria-hidden="true">Sacola</span>
            <span className="cart-count">0</span>
          </Link>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Abrir menu"><span /><span /><span /></summary>
          <nav aria-label="Navegacao para dispositivos moveis">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
            <Link href="/login">Entrar</Link>
            <Link href="/carrinho">Carrinho (0)</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
