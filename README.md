# COMPIA Editora
 
Loja virtual demonstrativa para livros e materiais de inteligência artificial.  
Hospedada em: https://compia-store-five.vercel.app/
 
## Stack utilizada
 
- **Next.js 16.3** — framework web com App Router e renderização híbrida.
- **React 19.2** — construção das interfaces em componentes.
- **TypeScript 5.9** — tipagem estática e modelagem da aplicação.
- **CSS nativo** — identidade visual, layouts e responsividade, sem biblioteca de componentes.
- **ESLint 9** — análise e padronização do código.
- **Node.js 24 LTS e npm 11** — ambiente de desenvolvimento recomendado.
- **Vercel** — plataforma definida para hospedagem e deploy do front-end.
## Requisitos
 
- Node.js 20.9 ou superior (Node.js 24 LTS recomendado)
- npm 10 ou superior
Se você usa `nvm`, execute:
 
```bash
nvm install
nvm use
```
 
## Desenvolvimento local
 
```bash
npm install
npm run dev
```
 
A aplicação estará em `http://localhost:3000`.
 
## Validação
 
```bash
npm run lint
npm run typecheck
npm run build
```
 
## Rotas disponíveis
 
### Loja
 
- `/` — página inicial
- `/produtos` — catálogo
- `/produtos/[slug]` — detalhes do produto
- `/carrinho` — carrinho
- `/checkout` — finalização da compra
- `/login` — acesso do cliente
### Cliente
 
- `/minha-conta` — visão geral
- `/minha-conta/pedidos` — histórico de pedidos
- `/minha-conta/pedidos/[id]` — detalhes do pedido
- `/minha-conta/downloads` — biblioteca digital
### Administração
 
- `/admin` — dashboard
- `/admin/produtos` — produtos
- `/admin/produtos/novo` — cadastro de produto
- `/admin/produtos/[id]/editar` — edição de produto
- `/admin/categorias` — categorias
- `/admin/pedidos` — pedidos
- `/admin/pedidos/[id]` — gerenciamento do pedido
- `/admin/clientes` — clientes
