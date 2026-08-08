"use client";

import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";
import { Brand } from "./brand";
import { useCart } from "@/context/cart-context";
import { useSession } from "@/hooks/use-session";

const navigation = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Catálogo" },
];

export function SiteHeader() {
  const { count } = useCart();
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const isCustomer = isAuthenticated && session.user.role === "customer";
  const isStaff = isAuthenticated && session.user.role !== "customer";

  return (
    <header className="site-header">
      <div className="container site-header__content">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
          {isCustomer && <Link href="/minha-conta/pedidos">Meus pedidos</Link>}
        </nav>
        <div className="header-actions">
          {!isAuthenticated && <Link className="header-link" href="/admin">Painel administrativo</Link>}
          {isStaff && <Link className="header-link" href="/admin">Painel administrativo</Link>}
          {isCustomer && <Link className="header-link" href="/minha-conta">Minha conta</Link>}
          {isAuthenticated ? (
            <LogoutButton className="header-link header-link--button" />
          ) : (
            <Link className="header-link" href="/login">Entrar</Link>
          )}
          <Link className="cart-link" href="/carrinho" aria-label={`Abrir carrinho, ${count} itens`}>
            <span aria-hidden="true">Carrinho</span>
            <span className="cart-count">{count}</span>
          </Link>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Abrir menu"><span /><span /><span /></summary>
          <nav aria-label="Navegação para dispositivos móveis">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
            {isCustomer && <Link href="/minha-conta/pedidos">Meus pedidos</Link>}
            {(!isAuthenticated || isStaff) && <Link href="/admin">Painel administrativo</Link>}
            {isCustomer && <Link href="/minha-conta">Minha conta</Link>}
            {isAuthenticated ? (
              <LogoutButton className="mobile-menu__button" />
            ) : (
              <>
                <Link href="/login">Entrar</Link>
                <Link href="/cadastro">Criar conta</Link>
              </>
            )}
            <Link href="/carrinho">Carrinho ({count})</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
