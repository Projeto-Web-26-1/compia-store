import Link from "next/link";
import { Brand } from "./brand";

const adminLinks = [
  { href: "/admin", label: "Visão geral", icon: "⌂" },
  { href: "/admin/produtos", label: "Produtos", icon: "□" },
  { href: "/admin/categorias", label: "Categorias", icon: "#" },
  { href: "/admin/pedidos", label: "Pedidos", icon: "≡" },
  { href: "/admin/clientes", label: "Clientes", icon: "○" },
];

export function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <Brand compact inverted />
      <div className="admin-sidebar__label">Administração</div>
      <nav aria-label="Navegacao administrativa">
        {adminLinks.map((link) => (
          <Link href={link.href} key={link.href}><span aria-hidden="true">{link.icon}</span>{link.label}</Link>
        ))}
      </nav>
      <Link className="admin-sidebar__store" href="/">← Voltar para a loja</Link>
    </aside>
  );
}
