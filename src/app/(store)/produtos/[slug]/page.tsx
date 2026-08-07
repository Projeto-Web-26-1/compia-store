import type { Metadata } from "next";
import { ProductDetails } from "@/components/products/product-details";

export const metadata: Metadata = { title: "Detalhes do produto" };

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetails slug={slug} />;
}
