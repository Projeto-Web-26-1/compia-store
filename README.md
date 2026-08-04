# COMPIA Editora

Loja virtual demonstrativa para livros e materiais de inteligencia artificial. Esta primeira etapa entrega a fundacao em Next.js, as rotas da loja, a area do cliente e o painel administrativo.

## Stack utilizada

- **Next.js 16.3** — framework web com App Router e renderizacao hibrida.
- **React 19.2** — construcao das interfaces em componentes.
- **TypeScript 5.9** — tipagem estatica e modelagem da aplicacao.
- **CSS nativo** — identidade visual, layouts e responsividade, sem biblioteca de componentes.
- **ESLint 9** — analise e padronizacao do codigo.
- **Node.js 24 LTS e npm 11** — ambiente de desenvolvimento recomendado.
- **Vercel** — plataforma definida para hospedagem e deploy do front-end.

A aplicacao usa uma unica base de codigo. A persistencia local e os servicos simulados de pagamento e frete serao adicionados nas proximas etapas.

## Requisitos

- Node.js 20.9 ou superior (Node.js 24 LTS recomendado)
- npm 10 ou superior

Se voce usa `nvm`, execute:

```bash
nvm install
nvm use
```

## Desenvolvimento local

```bash
npm install
npm run dev
```

A aplicacao estara em `http://localhost:3000`.

## Validacao

```bash
npm run lint
npm run typecheck
npm run build
```

## Rotas disponiveis

### Loja

- `/` — pagina inicial
- `/produtos` — catalogo
- `/produtos/[slug]` — detalhes do produto
- `/carrinho` — carrinho
- `/checkout` — finalizacao da compra
- `/login` — acesso do cliente

### Cliente

- `/minha-conta` — visao geral
- `/minha-conta/pedidos` — historico de pedidos
- `/minha-conta/pedidos/[id]` — detalhes do pedido
- `/minha-conta/downloads` — biblioteca digital

### Administracao

- `/admin` — dashboard
- `/admin/produtos` — produtos
- `/admin/produtos/novo` — cadastro de produto
- `/admin/produtos/[id]/editar` — edicao de produto
- `/admin/categorias` — categorias
- `/admin/pedidos` — pedidos
- `/admin/pedidos/[id]` — gerenciamento do pedido
- `/admin/clientes` — clientes

## Deploy na Vercel

1. Envie este projeto para um repositorio Git.
2. Na Vercel, selecione **Add New > Project** e importe o repositorio.
3. Mantenha o framework detectado como **Next.js**.
4. Use `npm run build` como comando de build, caso a Vercel nao o detecte automaticamente.
5. Publique o projeto.

Nao existem variaveis de ambiente obrigatorias nesta etapa. A persistencia local sera adicionada posteriormente e funcionara no navegador de cada usuario.

## Estado atual

As paginas possuem layout responsivo e conteudo demonstrativo. Botoes, formularios, carrinho, autenticacao e administracao de dados ainda nao executam operacoes; esses comportamentos pertencem as proximas etapas do projeto.
