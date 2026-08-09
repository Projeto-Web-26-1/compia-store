import type { Category } from "@/entities/category";
import type { DigitalAsset } from "@/entities/digital-asset";
import type { Product } from "@/entities/product";
import type { Tag } from "@/entities/tag";
import {
  hasStorageValue,
  readStorageValue,
  writeStorageValue,
} from "@/storage/local-storage";

export const CATALOG_STORAGE_KEYS = {
  products: "compia:v1:catalog:products",
  categories: "compia:v2:catalog:categories",
  tags: "compia:v1:catalog:tags",
  digitalAssets: "compia:v1:catalog:digital-assets",
} as const;

const CATALOG_SEED_VERSION_KEY = "compia:catalog:seed-version";
const CATALOG_SEED_VERSION = 7;

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
  {
    id: "category-programming",
    name: "Programação",
    slug: "programacao",
    description: "Linguagens, boas práticas e desenvolvimento de aplicações.",
  },
  {
    id: "category-data-science",
    name: "Ciência de dados",
    slug: "ciencia-de-dados",
    description: "Análise de dados, estatística e aprendizado de máquina.",
  },
  {
    id: "category-other",
    name: "Outros",
    slug: "outros",
    description: "Temas complementares de tecnologia e inovação.",
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
    slug: "fundamentos-da-inteligencia-artificial",
    title: "Fundamentos da Inteligência Artificial",
    author: "Ricardo Murer",
    description:
      "Uma introdução objetiva aos conceitos que sustentam a inteligência artificial e suas aplicações no mercado.",
    type: "physical_book",
    priceInCents: 7900,
    stock: 18,
    categoryId: "category-ai",
    tagIds: ["tag-foundations"],
    imageUrl: "https://m.media-amazon.com/images/I/71LuGG6enfL._SY466_.jpg",
    active: true,
    createdAt: "2026-07-02T12:00:00.000Z",
    updatedAt: "2026-08-09T12:00:00.000Z",
  },
  {
    id: "product-generative-ai",
    slug: "engenharia-de-ia",
    title: "Engenharia de IA",
    author: "Chip Huyen",
    description:
      "Estratégias, padrões e exercícios para aplicar modelos generativos em produtos e processos reais.",
    type: "ebook",
    priceInCents: 4900,
    stock: null,
    categoryId: "category-ai",
    tagIds: ["tag-generative-ai", "tag-practice"],
    imageUrl: "https://m.media-amazon.com/images/I/81ohse7798L._SY425_.jpg",
    active: true,
    createdAt: "2026-07-24T12:00:00.000Z",
    updatedAt: "2026-08-09T12:00:00.000Z",
  },
  {
    id: "product-intelligent-architecture",
    slug: "fundamentos-de-arquitetura-de-software",
    title: "Fundamentos de Arquitetura de Software",
    author: "Mark Richards",
    description:
      "Decisões arquiteturais e padrões para integrar recursos de inteligência artificial a sistemas modernos.",
    type: "physical_book",
    priceInCents: 8900,
    stock: 7,
    categoryId: "category-software",
    tagIds: ["tag-architecture", "tag-practice"],
    imageUrl: "https://m.media-amazon.com/images/I/718UG0KPHpL._SY466_.jpg",
    active: true,
    createdAt: "2026-07-16T12:00:00.000Z",
    updatedAt: "2026-08-09T12:00:00.000Z",
  },
  {
    id: "product-applied-security",
    slug: "criptografia-e-seguranca-de-redes",
    title: "Criptografia e Segurança de Redes",
    author: "William Stallings",
    description:
      "Conceitos essenciais de criptografia e práticas para proteger aplicações, serviços e informações.",
    type: "physical_book",
    priceInCents: 7400,
    stock: 0,
    categoryId: "category-security",
    tagIds: ["tag-security", "tag-foundations"],
    imageUrl: "https://m.media-amazon.com/images/I/91U2KkSydQL._SY425_.jpg",
    active: true,
    createdAt: "2026-06-28T12:00:00.000Z",
    updatedAt: "2026-08-09T12:00:00.000Z",
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
  {
    id: "product-modern-typescript",
    slug: "aprendendo-typescript",
    title: "Aprendendo Typescript",
    author: "Josh Goldberg",
    description:
      "Conceitos, práticas e exemplos para desenvolver aplicações robustas com TypeScript.",
    type: "physical_book",
    priceInCents: 8290,
    stock: 14,
    categoryId: "category-programming",
    tagIds: ["tag-practice"],
    imageUrl: "https://m.media-amazon.com/images/I/81tK8zB3ZvL._AC_UF1000,1000_QL80_.jpg",
    active: true,
    createdAt: "2026-08-06T12:00:00.000Z",
    updatedAt: "2026-08-09T12:00:00.000Z",
  },
  {
    id: "product-data-science-practice",
    slug: "ciencia-de-dados-na-pratica",
    title: "Ciência de Dados na Prática",
    author: "Fabrício Bueno",
    description:
      "Uma jornada aplicada por análise, visualização e modelagem de dados para problemas reais.",
    type: "physical_book",
    priceInCents: 8690,
    stock: 10,
    categoryId: "category-data-science",
    tagIds: ["tag-foundations", "tag-practice"],
    imageUrl: "https://m.media-amazon.com/images/I/71o9SopFLpL.jpg",
    active: true,
    createdAt: "2026-08-07T12:00:00.000Z",
    updatedAt: "2026-08-09T12:00:00.000Z",
  },
] satisfies readonly Product[];

export const DIGITAL_ASSET_SEED = [
  {
    id: "asset-generative-ai-pdf",
    productId: "product-generative-ai",
    name: "Engenharia de IA — PDF",
    format: "pdf",
    downloadUrl: "/downloads/engenharia-de-ia.pdf",
  },
  {
    id: "asset-generative-ai-epub",
    productId: "product-generative-ai",
    name: "Engenharia de IA — EPUB",
    format: "epub",
    downloadUrl: "/downloads/engenharia-de-ia.epub",
  },
] satisfies readonly DigitalAsset[];

const CATALOG_SECTIONS = [
  [CATALOG_STORAGE_KEYS.products, PRODUCT_SEED],
  [CATALOG_STORAGE_KEYS.categories, CATEGORY_SEED],
  [CATALOG_STORAGE_KEYS.tags, TAG_SEED],
  [CATALOG_STORAGE_KEYS.digitalAssets, DIGITAL_ASSET_SEED],
] as const;

function migrateProductSeed(): void {
  const currentVersion = readStorageValue<number>(CATALOG_SEED_VERSION_KEY) ?? 0;

  if (currentVersion >= CATALOG_SEED_VERSION) {
    return;
  }

  const storedProducts = readStorageValue<Product[]>(CATALOG_STORAGE_KEYS.products) ?? [];
  const storedProductIds = new Set(storedProducts.map((product) => product.id));
  const missingProducts = PRODUCT_SEED.filter(
    (product) => !storedProductIds.has(product.id),
  );

  if (missingProducts.length > 0) {
    writeStorageValue(CATALOG_STORAGE_KEYS.products, [
      ...storedProducts,
      ...missingProducts,
    ]);
  }

  if (currentVersion < 3) {
    const products = readStorageValue<Product[]>(CATALOG_STORAGE_KEYS.products) ?? [];

    writeStorageValue(
      CATALOG_STORAGE_KEYS.products,
      products.map((product) =>
        product.id === "product-data-science-practice"
          ? {
              ...product,
              author: "Fabrício Bueno",
              imageUrl: "https://m.media-amazon.com/images/I/71o9SopFLpL.jpg",
              updatedAt: "2026-08-09T12:00:00.000Z",
            }
          : product,
      ),
    );
  }

  if (currentVersion < 5) {
    const productUpdates: Partial<Record<string, Partial<Product>>> = {
      "product-generative-ai": {
        slug: "engenharia-de-ia",
        title: "Engenharia de IA",
        author: "Chip Huyen",
        imageUrl: "https://m.media-amazon.com/images/I/81ohse7798L._SY425_.jpg",
        updatedAt: "2026-08-09T12:00:00.000Z",
      },
      "product-intelligent-architecture": {
        slug: "fundamentos-de-arquitetura-de-software",
        title: "Fundamentos de Arquitetura de Software",
        author: "Mark Richards",
        imageUrl: "https://m.media-amazon.com/images/I/718UG0KPHpL._SY466_.jpg",
        updatedAt: "2026-08-09T12:00:00.000Z",
      },
      "product-modern-typescript": {
        slug: "aprendendo-typescript",
        title: "Aprendendo Typescript",
        author: "Josh Goldberg",
        imageUrl:
          "https://m.media-amazon.com/images/I/81tK8zB3ZvL._AC_UF1000,1000_QL80_.jpg",
        updatedAt: "2026-08-09T12:00:00.000Z",
      },
    };
    const products = readStorageValue<Product[]>(CATALOG_STORAGE_KEYS.products) ?? [];
    const digitalAssets =
      readStorageValue<DigitalAsset[]>(CATALOG_STORAGE_KEYS.digitalAssets) ?? [];

    writeStorageValue(
      CATALOG_STORAGE_KEYS.products,
      products.map((product) => ({
        ...product,
        ...productUpdates[product.id],
      })),
    );
    writeStorageValue(
      CATALOG_STORAGE_KEYS.digitalAssets,
      digitalAssets.map((asset) => {
        if (asset.id === "asset-generative-ai-pdf") {
          return { ...asset, name: "Engenharia de IA — PDF" };
        }

        if (asset.id === "asset-generative-ai-epub") {
          return { ...asset, name: "Engenharia de IA — EPUB" };
        }

        return asset;
      }),
    );
  }

  if (currentVersion < 6) {
    const productUpdates: Partial<Record<string, Partial<Product>>> = {
      "product-ai-foundations": {
        slug: "fundamentos-da-inteligencia-artificial",
        title: "Fundamentos da Inteligência Artificial",
        author: "Ricardo Murer",
        imageUrl: "https://m.media-amazon.com/images/I/71LuGG6enfL._SY466_.jpg",
        updatedAt: "2026-08-09T12:00:00.000Z",
      },
      "product-applied-security": {
        slug: "criptografia-e-seguranca-de-redes",
        title: "Criptografia e Segurança de Redes",
        author: "William Stallings",
        imageUrl: "https://m.media-amazon.com/images/I/91U2KkSydQL._SY425_.jpg",
        updatedAt: "2026-08-09T12:00:00.000Z",
      },
    };
    const products = readStorageValue<Product[]>(CATALOG_STORAGE_KEYS.products) ?? [];

    writeStorageValue(
      CATALOG_STORAGE_KEYS.products,
      products.map((product) => ({
        ...product,
        ...productUpdates[product.id],
      })),
    );
  }

  if (currentVersion < 7) {
    const digitalAssets =
      readStorageValue<DigitalAsset[]>(CATALOG_STORAGE_KEYS.digitalAssets) ?? [];

    writeStorageValue(
      CATALOG_STORAGE_KEYS.digitalAssets,
      digitalAssets.map((asset) => {
        if (asset.id === "asset-generative-ai-pdf") {
          return {
            ...asset,
            name: "Engenharia de IA — PDF",
            downloadUrl: "/downloads/engenharia-de-ia.pdf",
          };
        }

        if (asset.id === "asset-generative-ai-epub") {
          return {
            ...asset,
            name: "Engenharia de IA — EPUB",
            downloadUrl: "/downloads/engenharia-de-ia.epub",
          };
        }

        return asset;
      }),
    );
  }

  writeStorageValue(CATALOG_SEED_VERSION_KEY, CATALOG_SEED_VERSION);
}

export function initializeCatalogSeed(): void {
  for (const [key, values] of CATALOG_SECTIONS) {
    if (!hasStorageValue(key)) {
      writeStorageValue(key, values);
    }
  }

  migrateProductSeed();
}

export function resetCatalogSeed(): void {
  for (const [key, values] of CATALOG_SECTIONS) {
    writeStorageValue(key, values);
  }

  writeStorageValue(CATALOG_SEED_VERSION_KEY, CATALOG_SEED_VERSION);
}
