"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { formatPrice, getProductTypeLabel } from "@/components/products/product-presentation";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { useCart } from "@/context/cart-context";
import { controlsStock } from "@/domain/catalog/product-rules";
import type { Address } from "@/entities/address";
import type { DeliveryMethod } from "@/entities/delivery";
import type { PaymentMethod } from "@/entities/payment";
import { useProducts } from "@/hooks/use-catalog";
import { useSession } from "@/hooks/use-session";
import {
  completeCheckout,
  getCheckoutShippingInCents,
  type CheckoutErrorCode,
  type CheckoutPaymentInput,
} from "@/services/checkout-service";

const CHECKOUT_ERROR_MESSAGES: Record<CheckoutErrorCode, string> = {
  cart_empty: "Seu carrinho está vazio.",
  product_not_found: "Um produto do carrinho não está mais disponível.",
  stock_changed: "O estoque de um produto mudou. Revise o carrinho antes de continuar.",
  delivery_invalid: "Selecione uma forma de entrega válida.",
  address_invalid: "Informe um endereço completo e um CEP válido.",
  payment_invalid: "Revise os dados do pagamento simulado.",
  customer_invalid: "Entre com uma conta de cliente para concluir a compra.",
};

const EMPTY_ADDRESS: Address = {
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  zipCode: "",
};

export function CheckoutForm() {
  const router = useRouter();
  const { items } = useCart();
  const products = useProducts();
  const session = useSession();
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("shipping");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS);
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cartLines = items.map((item) => ({
    item,
    product: products.find((product) => product.id === item.productId) ?? null,
  }));
  const hasShippableProduct = cartLines.some(
    ({ product }) => product && controlsStock(product),
  );
  const effectiveDeliveryMethod: DeliveryMethod = hasShippableProduct
    ? deliveryMethod
    : "digital";
  const subtotalInCents = cartLines.reduce(
    (subtotal, { item, product }) =>
      subtotal + (product ? product.priceInCents * item.quantity : 0),
    0,
  );
  const shippingInCents = getCheckoutShippingInCents(
    hasShippableProduct,
    effectiveDeliveryMethod,
  );
  const totalInCents = subtotalInCents + shippingInCents;
  const hasMissingProduct = cartLines.some(({ product }) => !product);

  const updateAddress = (field: keyof Address, value: string) => {
    setAddress((currentAddress) => ({ ...currentAddress, [field]: value }));
    setError("");
  };

  const updateCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits.match(/.{1,4}/g)?.join(" ") ?? "");
    setError("");
  };

  const updateSecurityCode = (value: string) => {
    setSecurityCode(value.replace(/\D/g, "").slice(0, 3));
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (session.status !== "authenticated") {
      setError(CHECKOUT_ERROR_MESSAGES.customer_invalid);
      return;
    }

    const payment: CheckoutPaymentInput = paymentMethod === "pix"
      ? { method: "pix" }
      : {
          method: "credit_card",
          cardHolder,
          cardNumber,
          expiration,
          securityCode,
        };

    setIsSubmitting(true);

    try {
      const result = completeCheckout({
        user: session.user,
        deliveryMethod: effectiveDeliveryMethod,
        address: effectiveDeliveryMethod === "shipping" ? address : undefined,
        payment,
      });

      if (!result.ok) {
        setError(CHECKOUT_ERROR_MESSAGES[result.error]);
        return;
      }

      router.replace(`/checkout/sucesso/${result.order.id}`);
    } catch {
      setError("Não foi possível concluir o pedido neste navegador.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container page-space page-narrow">
        <PageIntro
          description="Adicione produtos antes de iniciar uma compra."
          eyebrow="Finalizar compra"
          title="Seu carrinho está vazio"
        />
        <EmptyState
          action="Explorar catálogo"
          description="Encontre livros e e-books para continuar."
          href="/produtos"
          icon="◇"
          title="Nenhum item para finalizar"
        />
      </div>
    );
  }

  return (
    <div className="container page-space">
      <PageIntro
        description="Confirme a entrega e o pagamento para gerar seu pedido local."
        eyebrow="Compra segura"
        title="Finalizar compra"
      />

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-form-sections">
          <section className="form-section">
            <div className="form-section__heading">
              <h2>Identificação</h2>
              <p>O pedido será associado à conta conectada.</p>
            </div>
            <div className="checkout-customer">
              <strong>{session.status === "authenticated" ? session.user.name : "Cliente"}</strong>
              <span>{session.status === "authenticated" ? session.user.email : ""}</span>
            </div>
          </section>

          <section className="form-section">
            <div className="form-section__heading">
              <h2>Entrega</h2>
              <p>Escolha como deseja receber os itens físicos.</p>
            </div>

            {hasShippableProduct ? (
              <div className="checkout-options">
                <label className="checkout-option">
                  <input
                    checked={deliveryMethod === "shipping"}
                    name="delivery"
                    onChange={() => setDeliveryMethod("shipping")}
                    type="radio"
                  />
                  <span><strong>Entrega simulada</strong><small>Frete fixo de {formatPrice(1500)}</small></span>
                </label>
                <label className="checkout-option">
                  <input
                    checked={deliveryMethod === "pickup"}
                    name="delivery"
                    onChange={() => setDeliveryMethod("pickup")}
                    type="radio"
                  />
                  <span><strong>Retirada no local</strong><small>Sem cobrança de frete</small></span>
                </label>
              </div>
            ) : (
              <div className="checkout-digital-notice">
                Seus e-books serão disponibilizados digitalmente, sem cobrança de frete.
              </div>
            )}

            {effectiveDeliveryMethod === "shipping" && (
              <div className="form-grid checkout-address">
                <div className="form-field form-field--wide">
                  <label htmlFor="checkout-street">Rua</label>
                  <input id="checkout-street" onChange={(event) => updateAddress("street", event.target.value)} required value={address.street} />
                </div>
                <div className="form-field">
                  <label htmlFor="checkout-number">Número</label>
                  <input id="checkout-number" onChange={(event) => updateAddress("number", event.target.value)} required value={address.number} />
                </div>
                <div className="form-field">
                  <label htmlFor="checkout-complement">Complemento</label>
                  <input id="checkout-complement" onChange={(event) => updateAddress("complement", event.target.value)} value={address.complement ?? ""} />
                </div>
                <div className="form-field">
                  <label htmlFor="checkout-neighborhood">Bairro</label>
                  <input id="checkout-neighborhood" onChange={(event) => updateAddress("neighborhood", event.target.value)} required value={address.neighborhood} />
                </div>
                <div className="form-field">
                  <label htmlFor="checkout-city">Cidade</label>
                  <input id="checkout-city" onChange={(event) => updateAddress("city", event.target.value)} required value={address.city} />
                </div>
                <div className="form-field">
                  <label htmlFor="checkout-state">UF</label>
                  <input id="checkout-state" maxLength={2} onChange={(event) => updateAddress("state", event.target.value)} placeholder="PB" required value={address.state} />
                </div>
                <div className="form-field">
                  <label htmlFor="checkout-zip">CEP</label>
                  <input id="checkout-zip" inputMode="numeric" maxLength={9} onChange={(event) => updateAddress("zipCode", event.target.value)} placeholder="00000-000" required value={address.zipCode} />
                </div>
              </div>
            )}
          </section>

          <section className="form-section">
            <div className="form-section__heading">
              <h2>Pagamento</h2>
              <p>A aprovação é imediata e totalmente simulada.</p>
            </div>
            <div className="checkout-options">
              <label className="checkout-option">
                <input checked={paymentMethod === "pix"} name="payment" onChange={() => setPaymentMethod("pix")} type="radio" />
                <span><strong>PIX</strong><small>Aprovação simulada imediata</small></span>
              </label>
              <label className="checkout-option">
                <input checked={paymentMethod === "credit_card"} name="payment" onChange={() => setPaymentMethod("credit_card")} type="radio" />
                <span><strong>Cartão de crédito</strong><small>Nenhum dado real será processado</small></span>
              </label>
            </div>

            {paymentMethod === "credit_card" && (
              <div className="form-grid checkout-card-fields">
                <div className="form-field form-field--wide">
                  <label htmlFor="checkout-card-holder">Nome impresso no cartão</label>
                  <input id="checkout-card-holder" onChange={(event) => setCardHolder(event.target.value)} required value={cardHolder} />
                </div>
                <div className="form-field form-field--wide">
                  <label htmlFor="checkout-card-number">Número do cartão simulado</label>
                  <input id="checkout-card-number" inputMode="numeric" maxLength={19} onChange={(event) => updateCardNumber(event.target.value)} pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}" placeholder="4111 1111 1111 1111" required value={cardNumber} />
                </div>
                <div className="form-field">
                  <label htmlFor="checkout-card-expiration">Validade</label>
                  <input id="checkout-card-expiration" maxLength={5} onChange={(event) => setExpiration(event.target.value)} placeholder="12/30" required value={expiration} />
                </div>
                <div className="form-field">
                  <label htmlFor="checkout-card-code">Código de segurança</label>
                  <input id="checkout-card-code" inputMode="numeric" maxLength={3} onChange={(event) => updateSecurityCode(event.target.value)} pattern="[0-9]{3}" placeholder="123" required value={securityCode} />
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="checkout-summary">
          <h2>Resumo do pedido</h2>
          <div className="checkout-items">
            {cartLines.map(({ item, product }) => (
              <div key={item.productId}>
                <span>
                  <strong>{product?.title ?? "Produto indisponível"}</strong>
                  <small>{product ? getProductTypeLabel(product.type) : "Revise o carrinho"} · {item.quantity} un.</small>
                </span>
                <strong>{product ? formatPrice(product.priceInCents * item.quantity) : "—"}</strong>
              </div>
            ))}
          </div>
          <div className="checkout-totals">
            <div><span>Subtotal</span><strong>{formatPrice(subtotalInCents)}</strong></div>
            <div><span>Frete</span><strong>{formatPrice(shippingInCents)}</strong></div>
            <div className="checkout-total"><span>Total</span><strong>{formatPrice(totalInCents)}</strong></div>
          </div>
          {error && <div className="form-alert" role="alert">{error}</div>}
          <button className="button button--primary button--full" disabled={isSubmitting || hasMissingProduct} type="submit">
            {isSubmitting ? "Gerando pedido…" : "Confirmar pedido"}
          </button>
          <Link className="checkout-back" href="/carrinho">← Voltar ao carrinho</Link>
        </aside>
      </form>
    </div>
  );
}
