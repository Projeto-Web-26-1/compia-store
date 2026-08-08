import Link from "next/link";
import { AccountGuard } from "@/components/auth/account-guard";
import { LogoutButton } from "@/components/auth/logout-button";

const accountLinks = [
  { href: "/minha-conta", label: "Visão geral" },
  { href: "/minha-conta/pedidos", label: "Meus pedidos" },
  { href: "/minha-conta/downloads", label: "Downloads" },
];

export default function AccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AccountGuard>
      <div className="container account-shell page-space">
        <aside className="section-nav">
          <span className="eyebrow">Minha conta</span>
          <nav aria-label="Navegação da conta">
            {accountLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
          </nav>
          <LogoutButton className="section-nav__exit" />
        </aside>
        <div className="account-content">{children}</div>
      </div>
    </AccountGuard>
  );
}
