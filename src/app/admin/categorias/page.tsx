import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { CATEGORY_SEED } from "@/storage/seeds/catalog";

export const metadata: Metadata = { title: "Categorias - Administracao" };

export default function AdminCategoriesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Organização"
        title="Categorias"
        description="Estrutura fixa usada na classificação dos livros da loja."
      />
      <div className="category-admin-grid">
        {CATEGORY_SEED.map((category) => (
          <article className="category-admin-card" key={category.id}>
            <span aria-hidden="true">#</span>
            <div>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="category-admin-note">
        As categorias são definidas pelo projeto e selecionadas no cadastro do produto.
      </p>
    </>
  );
}
