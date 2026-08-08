"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { sessionRepository } from "@/repositories/session-repository";
import { registerCustomer } from "@/repositories/user-repository";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("A confirmação da senha não corresponde à senha informada.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registerCustomer(name, email, password);

      if (!result.ok) {
        setError(
          result.reason === "email_in_use"
            ? "Já existe uma conta com este e-mail."
            : "Revise os dados informados.",
        );
        return;
      }

      sessionRepository.saveUser(result.user);
      router.replace("/minha-conta");
    } catch {
      setError("Não foi possível criar a conta neste navegador.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container auth-page">
      <section className="auth-card">
        <span className="eyebrow">Novo cliente</span>
        <h1>Crie sua conta</h1>
        <p>O cadastro ficará salvo somente neste navegador para fins demonstrativos.</p>
        <form onSubmit={handleRegister}>
          <label htmlFor="register-name">Nome</label>
          <input
            autoComplete="name"
            id="register-name"
            onChange={(event) => setName(event.target.value)}
            required
            value={name}
          />
          <label htmlFor="register-email">E-mail</label>
          <input
            autoComplete="email"
            id="register-email"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
          <label htmlFor="register-password">Senha demonstrativa</label>
          <input
            autoComplete="new-password"
            id="register-password"
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
          <label htmlFor="register-password-confirmation">Confirmar senha</label>
          <input
            autoComplete="new-password"
            id="register-password-confirmation"
            minLength={6}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
            type="password"
            value={passwordConfirmation}
          />
          {error && <div className="auth-error" role="alert">{error}</div>}
          <button className="button button--primary button--full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Criando conta…" : "Criar conta"}
          </button>
        </form>
        <div className="auth-warning">
          Não utilize uma senha real. Este projeto simula autenticação usando dados locais.
        </div>
        <small>Já possui uma conta? <Link href="/login">Entrar</Link></small>
      </section>
    </div>
  );
}
