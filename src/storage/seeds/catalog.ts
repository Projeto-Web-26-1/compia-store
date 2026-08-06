import type { Category } from "@/entities/category";
import type { DigitalAsset } from "@/entities/digital-asset";
import type { Product } from "@/entities/product";
import type { Tag } from "@/entities/tag";
import { hasStorageValue, writeStorageValue } from "@/storage/local-storage";

export const CATALOG_STORAGE_KEYS = {
  products: "compia:v1:catalog:products",
  categories: "compia:v1:catalog:categories",
  tags: "compia:v1:catalog:tags",
  digitalAssets: "compia:v1:catalog:digital-assets",
} as const;

export const CATEGORY_SEED = [
  {
    id: "category-ai",
    name: "Inteligência artificial",
    slug: "inteligencia-artificial",
    description: "Fundamentos, aplicações e tendências em inteligência artificial.",
  },
  {
    id: "category-software",
    name: "Arquitetura de software",
    slug: "arquitetura-de-software",
    description: "Projeto e evolução de sistemas de software inteligentes.",
  },
  {
    id: "category-security",
    name: "Cibersegurança",
    slug: "ciberseguranca",
    description: "Criptografia, segurança aplicada e proteção de sistemas.",
  },
] satisfies readonly Category[];

export const TAG_SEED = [
  { id: "tag-foundations", name: "Fundamentos", slug: "fundamentos" },
  { id: "tag-generative-ai", name: "IA generativa", slug: "ia-generativa" },
  { id: "tag-practice", name: "Prática", slug: "pratica" },
  { id: "tag-architecture", name: "Arquitetura", slug: "arquitetura" },
  { id: "tag-security", name: "Segurança", slug: "seguranca" },
  { id: "tag-learning-kit", name: "Kit de aprendizagem", slug: "kit-aprendizagem" },
] satisfies readonly Tag[];

export const PRODUCT_SEED = [
  {
    id: "product-ai-foundations",
    slug: "inteligencia-artificial-fundamentos-e-aplicacoes",
    title: "Inteligência Artificial: Fundamentos e Aplicações",
    author: "COMPIA Editora",
    description:
      "Uma introdução objetiva aos conceitos que sustentam a inteligência artificial e suas aplicações no mercado.",
    type: "physical_book",
    priceInCents: 7900,
    stock: 18,
    categoryId: "category-ai",
    tagIds: ["tag-foundations"],
    active: true,
    createdAt: "2026-07-02T12:00:00.000Z",
    updatedAt: "2026-07-02T12:00:00.000Z",
  },
  {
    id: "product-generative-ai",
    slug: "ia-generativa-na-pratica",
    title: "IA Generativa na Prática",
    author: "Marina Alves",
    description:
      "Estratégias, padrões e exercícios para aplicar modelos generativos em produtos e processos reais.",
    type: "ebook",
    priceInCents: 4900,
    stock: null,
    categoryId: "category-ai",
    tagIds: ["tag-generative-ai", "tag-practice"],
    active: true,
    createdAt: "2026-07-24T12:00:00.000Z",
    updatedAt: "2026-07-24T12:00:00.000Z",
  },
  {
    id: "product-intelligent-architecture",
    slug: "arquitetura-de-software-inteligente",
    title: "Arquitetura de Software Inteligente",
    author: "Rafael Costa",
    description:
      "Decisões arquiteturais e padrões para integrar recursos de inteligência artificial a sistemas modernos.",
    type: "physical_book",
    priceInCents: 8900,
    stock: 7,
    categoryId: "category-software",
    tagIds: ["tag-architecture", "tag-practice"],
    active: true,
    createdAt: "2026-07-16T12:00:00.000Z",
    updatedAt: "2026-07-16T12:00:00.000Z",
  },
  {
    id: "product-applied-security",
    slug: "criptografia-e-seguranca-aplicada",
    title: "Criptografia e Segurança Aplicada",
    author: "Beatriz Lima",
    description:
      "Conceitos essenciais de criptografia e práticas para proteger aplicações, serviços e informações.",
    type: "physical_book",
    priceInCents: 7400,
    stock: 0,
    categoryId: "category-security",
    tagIds: ["tag-security", "tag-foundations"],
    active: true,
    createdAt: "2026-06-28T12:00:00.000Z",
    updatedAt: "2026-07-30T12:00:00.000Z",
  },
  {
    id: "product-ai-kit",
    slug: "kit-fundamentos-de-inteligencia-artificial",
    title: "Kit Fundamentos de Inteligência Artificial",
    author: "COMPIA Editora",
    description:
      "Livro, guia de estudos e materiais de apoio reunidos para uma jornada completa pelos fundamentos de IA.",
    type: "kit",
    priceInCents: 14990,
    stock: 5,
    categoryId: "category-ai",
    tagIds: ["tag-foundations", "tag-learning-kit"],
    active: true,
    createdAt: "2026-08-01T12:00:00.000Z",
    updatedAt: "2026-08-01T12:00:00.000Z",
  },
  {
    id: "product-blockchain",
    slug: "blockchain-para-sistemas-distribuidos",
    title: "Blockchain para Sistemas Distribuídos",
    author: "COMPIA Editora",
    description:
      "Material em preparação sobre os princípios e usos de blockchain em sistemas distribuídos.",
    type: "ebook",
    priceInCents: 5900,
    stock: null,
    categoryId: "category-security",
    tagIds: ["tag-security"],
    active: false,
    createdAt: "2026-07-20T12:00:00.000Z",
    updatedAt: "2026-07-20T12:00:00.000Z",
  },
] satisfies readonly Product[];

export const DIGITAL_ASSET_SEED = [
  {
    id: "asset-generative-ai-pdf",
    productId: "product-generative-ai",
    name: "IA Generativa na Prática — PDF",
    format: "pdf",
    downloadUrl: "/downloads/ia-generativa-na-pratica.pdf",
  },
  {
    id: "asset-generative-ai-epub",
    productId: "product-generative-ai",
    name: "IA Generativa na Prática — EPUB",
    format: "epub",
    downloadUrl: "/downloads/ia-generativa-na-pratica.epub",
  },
] satisfies readonly DigitalAsset[];

const CATALOG_SECTIONS = [
  [CATALOG_STORAGE_KEYS.products, PRODUCT_SEED],
  [CATALOG_STORAGE_KEYS.categories, CATEGORY_SEED],
  [CATALOG_STORAGE_KEYS.tags, TAG_SEED],
  [CATALOG_STORAGE_KEYS.digitalAssets, DIGITAL_ASSET_SEED],
] as const;

export function initializeCatalogSeed(): void {
  for (const [key, values] of CATALOG_SECTIONS) {
    if (!hasStorageValue(key)) {
      writeStorageValue(key, values);
    }
  }
}

export function resetCatalogSeed(): void {
  for (const [key, values] of CATALOG_SECTIONS) {
    writeStorageValue(key, values);
  }
}
