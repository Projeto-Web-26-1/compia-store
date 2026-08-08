import type { Metadata } from "next";
import { AccountGuard } from "@/components/auth/account-guard";
import { OrderConfirmation } from "@/components/checkout/order-confirmation";

export const metadata: Metadata = { title: "Pedido confirmado" };

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AccountGuard loginPath="/login">
      <OrderConfirmation orderId={id} />
    </AccountGuard>
  );
}
