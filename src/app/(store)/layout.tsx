import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CartProvider } from "@/context/cart-context";

export default function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <CartProvider>
      <div className="site-shell">
        <SiteHeader />
        <main className="site-main">{children}</main>
        <SiteFooter />
      </div>
    </CartProvider>
  );
}