import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span>404</span><h1>Pagina nao encontrada</h1><p>O endereco informado nao existe ou foi alterado.</p>
      <Link className="button button--primary" href="/">Voltar ao inicio</Link>
    </main>
  );
}
