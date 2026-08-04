import Link from "next/link";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <header className="admin-topbar">
          <details className="admin-mobile-menu">
            <summary>Menu</summary>
            <nav>
              <Link href="/admin">Visao geral</Link>
              <Link href="/admin/produtos">Produtos</Link>
              <Link href="/admin/categorias">Categorias</Link>
              <Link href="/admin/pedidos">Pedidos</Link>
              <Link href="/admin/clientes">Clientes</Link>
              <Link href="/">Voltar para a loja</Link>
            </nav>
          </details>
          <span className="admin-topbar__environment">Ambiente demonstrativo</span>
          <div className="admin-user"><span>AD</span><div><strong>Administrador</strong><small>admin@compia.com.br</small></div></div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
