"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const demoUser = {
      id: "user-customer-demo",
      name: email.split("@")[0] || "Cliente COMPIA",
      email,
      role: "customer"
    };

    localStorage.setItem("compia_logged_user", JSON.stringify(demoUser));
    router.push("/minha-conta");
  };

  return (
    <div className="container auth-page">
      <section className="auth-card">
        <span className="eyebrow">Bem-vindo de volta</span>
        <h1>Acesse sua conta</h1>
        <p>O acesso sera simulado localmente na etapa de autenticacao.</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@exemplo.com"
          />
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" placeholder=" " />
          <button className="button button--primary button--full" type="submit">Entrar</button>
        </form>
        <small>Area administrativa? <Link href="/admin">Acessar painel</Link></small>
      </section>
    </div>
  );
}