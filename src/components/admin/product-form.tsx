"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  controlsStock,
  createProductSlug,
  validateProduct,
  type ProductValidationField,
  type ProductValidationIssue,
} from "@/domain/catalog/product-rules";
import {
  PRODUCT_TYPES,
  type Product,
  type ProductType,
} from "@/entities/product";
import { useCategories, useProducts } from "@/hooks/use-catalog";
import { saveProduct } from "@/repositories/product-repository";
import { listTags } from "@/repositories/tag-repository";
import { getProductTypeLabel } from "@/components/products/product-presentation";

interface ProductFormProps {
  readonly product?: Product;
}

interface ProductFormState {
  readonly title: string;
  readonly author: string;
  readonly description: string;
  readonly type: ProductType;
  readonly price: string;
  readonly stock: string;
  readonly categoryId: string;
  readonly imageUrl: string;
}

const VALIDATION_MESSAGES: Record<ProductValidationIssue["code"], string> = {
  id_required: "Não foi possível gerar o identificador do produto.",
  title_required: "Informe o título.",
  description_required: "Informe a descrição.",
  slug_invalid: "Informe um título que possa gerar um endereço válido.",
  slug_duplicated: "Já existe um produto com este título.",
  price_invalid: "Informe um preço válido, igual ou maior que zero.",
  stock_invalid: "Informe um estoque inteiro, igual ou maior que zero.",
  category_required: "Selecione uma categoria.",
  category_not_found: "Selecione uma das categorias disponíveis.",
  tag_duplicated: "O produto possui classificações duplicadas.",
  tag_not_found: "O produto possui uma classificação inválida.",
};

function getInitialState(product?: Product): ProductFormState {
  return {
    title: product?.title ?? "",
    author: product?.author ?? "",
    description: product?.description ?? "",
    type: product?.type ?? "physical_book",
    price: product ? (product.priceInCents / 100).toFixed(2) : "",
    stock: product?.stock === null || product?.stock === undefined ? "" : String(product.stock),
    categoryId: product?.categoryId ?? "",
    imageUrl: product?.imageUrl ?? "",
  };
}

function mapValidationField(field: ProductValidationField): keyof ProductFormState | "form" {
  if (field === "slug") {
    return "title";
  }

  if (field === "priceInCents") {
    return "price";
  }

  if (field === "id" || field === "tagIds") {
    return "form";
  }

  return field;
}

export function ProductForm({ product: initialProduct }: ProductFormProps) {
  const router = useRouter();
  const categories = useCategories();
  const products = useProducts();
  const [form, setForm] = useState<ProductFormState>(() => getInitialState(initialProduct));
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormState | "form", string>>>({});
  const hasStock = controlsStock({ type: form.type });

  const updateField = <Field extends keyof ProductFormState>(
    field: Field,
    value: ProductFormState[Field],
  ) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined, form: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const price = Number.parseFloat(form.price.replace(",", "."));
    const stock = hasStock && form.stock.trim() ? Number(form.stock) : Number.NaN;
    const now = new Date().toISOString();
    const nextProduct: Product = {
      id: initialProduct?.id ?? `product-${crypto.randomUUID()}`,
      slug: createProductSlug(form.title),
      title: form.title.trim(),
      author: form.author.trim() || undefined,
      description: form.description.trim(),
      type: form.type,
      priceInCents: Number.isFinite(price) ? Math.round(price * 100) : Number.NaN,
      stock: hasStock ? stock : null,
      categoryId: form.categoryId,
      tagIds: initialProduct?.tagIds ?? [],
      imageUrl: form.imageUrl.trim() || undefined,
      active: initialProduct?.active ?? true,
      createdAt: initialProduct?.createdAt ?? now,
      updatedAt: now,
    };
    const issues = validateProduct(nextProduct, {
      categoryIds: categories.map((category) => category.id),
      tagIds: listTags().map((tag) => tag.id),
      existingProducts: products,
    });

    if (issues.length > 0) {
      const nextErrors: Partial<Record<keyof ProductFormState | "form", string>> = {};

      for (const issue of issues) {
        const field = mapValidationField(issue.field);
        nextErrors[field] ??= VALIDATION_MESSAGES[issue.code];
      }

      setErrors(nextErrors);
      return;
    }

    saveProduct(nextProduct);
    router.push("/admin/produtos");
  };

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      {errors.form && <div className="form-alert" role="alert">{errors.form}</div>}

      <section className="form-section">
        <div className="form-section__heading">
          <h2>Informações do livro</h2>
          <p>Dados usados na apresentação do produto no catálogo.</p>
        </div>
        <div className="form-grid">
          <div className="form-field form-field--wide">
            <label htmlFor="product-title">Título</label>
            <input
              aria-invalid={Boolean(errors.title)}
              id="product-title"
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Ex.: Introdução à ciência de dados"
              value={form.title}
            />
            {errors.title && <small className="form-error">{errors.title}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="product-author">Autor</label>
            <input
              id="product-author"
              onChange={(event) => updateField("author", event.target.value)}
              placeholder="Nome do autor"
              value={form.author}
            />
          </div>

          <div className="form-field">
            <label htmlFor="product-category">Categoria</label>
            <select
              aria-invalid={Boolean(errors.categoryId)}
              id="product-category"
              onChange={(event) => updateField("categoryId", event.target.value)}
              value={form.categoryId}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.categoryId && <small className="form-error">{errors.categoryId}</small>}
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="product-description">Descrição</label>
            <textarea
              aria-invalid={Boolean(errors.description)}
              id="product-description"
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="Apresente o conteúdo e o público da obra."
              rows={5}
              value={form.description}
            />
            {errors.description && <small className="form-error">{errors.description}</small>}
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="product-image">URL da imagem (opcional)</label>
            <input
              id="product-image"
              onChange={(event) => updateField("imageUrl", event.target.value)}
              placeholder="https://exemplo.com/capa.jpg"
              type="url"
              value={form.imageUrl}
            />
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="form-section__heading">
          <h2>Venda e estoque</h2>
          <p>O preço é informado em reais e armazenado em centavos.</p>
        </div>
        <div className="form-grid form-grid--three">
          <div className="form-field">
            <label htmlFor="product-type">Formato</label>
            <select
              id="product-type"
              onChange={(event) => updateField("type", event.target.value as ProductType)}
              value={form.type}
            >
              {PRODUCT_TYPES.map((type) => (
                <option key={type} value={type}>{getProductTypeLabel(type)}</option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="product-price">Preço (R$)</label>
            <input
              aria-invalid={Boolean(errors.price)}
              id="product-price"
              min="0"
              onChange={(event) => updateField("price", event.target.value)}
              placeholder="79,90"
              step="0.01"
              type="number"
              value={form.price}
            />
            {errors.price && <small className="form-error">{errors.price}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="product-stock">Estoque</label>
            <input
              aria-invalid={Boolean(errors.stock)}
              disabled={!hasStock}
              id="product-stock"
              min="0"
              onChange={(event) => updateField("stock", event.target.value)}
              placeholder={hasStock ? "0" : "Ilimitado"}
              step="1"
              type="number"
              value={hasStock ? form.stock : ""}
            />
            {hasStock ? (
              errors.stock && <small className="form-error">{errors.stock}</small>
            ) : (
              <small>E-books possuem estoque ilimitado.</small>
            )}
          </div>
        </div>
      </section>

      <div className="form-actions">
        <Link className="button button--secondary" href="/admin/produtos">Cancelar</Link>
        <button className="button button--primary" type="submit">
          {initialProduct ? "Salvar alterações" : "Cadastrar produto"}
        </button>
      </div>
    </form>
  );
}
