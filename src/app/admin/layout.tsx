import { AdminGuard } from "@/components/auth/admin-guard";
import { AdminSessionUser } from "@/components/auth/admin-session-user";
import {
  AdminMobileNavigation,
  AdminSidebar,
} from "@/components/layout/admin-sidebar";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminGuard>
      <div className="admin-shell">
        <AdminSidebar />
        <div className="admin-main">
          <header className="admin-topbar">
            <AdminMobileNavigation />
            <AdminSessionUser />
          </header>
          <main className="admin-content">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
