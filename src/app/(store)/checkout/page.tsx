import type { Metadata } from "next";
import { AccountGuard } from "@/components/auth/account-guard";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = { title: "Finalizar compra" };

export default function CheckoutPage() {
  return (
    <AccountGuard loginPath="/login?redirect=/checkout">
      <CheckoutForm />
    </AccountGuard>
  );
}
