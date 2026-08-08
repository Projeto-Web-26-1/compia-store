"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPostLoginPath } from "@/domain/auth/access-control";
import { sessionRepository } from "@/repositories/session-repository";
import { authenticateUser } from "@/repositories/user-repository";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const user = await authenticateUser(email, password);

      if (!user) {
        setError("E-mail ou senha inválidos.");
        return;
      }

      sessionRepository.saveUser(user);
      const requestedPath = new URLSearchParams(window.location.search).get("redirect");
      router.replace(getPostLoginPath(user, requestedPath));
    } catch {
      setError("Não foi possível realizar o login neste navegador.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container auth-page">
      <section className="auth-card">
        <span className="eyebrow">Bem-vindo de volta</span>
        <h1>Acesse sua conta</h1>
        <p>Use sua conta de cliente ou um dos acessos demonstrativos da equipe.</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="você@exemplo.com"
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
          {error && <div className="auth-error" role="alert">{error}</div>}
          <button className="button button--primary button--full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Entrando…" : "Entrar"}
          </button>
        </form>
        <div className="demo-credentials">
          <strong>Acessos demonstrativos</strong>
          <span>Administrador: admin@compia.com.br / admin123</span>
          <span>Vendedor: vendedor@compia.com.br / vendedor123</span>
          <span>Cliente: cliente@compia.com.br / cliente123</span>
        </div>
        <small>Ainda não tem conta? <Link href="/cadastro">Criar conta</Link></small>
      </section>
    </div>
  );
}
