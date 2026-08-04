import Link from "next/link";

const accountLinks = [
  { href: "/minha-conta", label: "Visao geral" },
  { href: "/minha-conta/pedidos", label: "Meus pedidos" },
  { href: "/minha-conta/downloads", label: "Downloads" },
];

export default function AccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container account-shell page-space">
      <aside className="section-nav">
        <span className="eyebrow">Minha conta</span>
        <nav aria-label="Navegacao da conta">
          {accountLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
        </nav>
        <Link className="section-nav__exit" href="/">Sair</Link>
      </aside>
      <div className="account-content">{children}</div>
    </div>
  );
}
