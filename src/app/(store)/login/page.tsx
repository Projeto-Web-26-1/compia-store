import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <div className="container auth-page">
      <section className="auth-card">
        <span className="eyebrow">Bem-vindo de volta</span>
        <h1>Acesse sua conta</h1>
        <p>O acesso sera simulado localmente na etapa de autenticacao.</p>
        <form>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" placeholder="voce@exemplo.com" />
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" placeholder="••••••••" />
          <button className="button button--primary button--full" type="button">Entrar</button>
        </form>
        <small>Area administrativa? <Link href="/admin">Acessar painel</Link></small>
      </section>
    </div>
  );
}
