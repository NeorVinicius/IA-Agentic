# Sitech

Site institucional em TypeScript, com frontend React, API Node.js e banco SQLite.
Esta entrega implementa a fundação técnica; catálogo de cursos, autenticação e
gerenciamento de notícias permanecem fora do escopo atual.

## Requisitos

- Node.js 20 ou superior e npm.
- Durante o desenvolvimento, a interface fica em `http://localhost:5173` e a
  API em `http://localhost:3001`.

## Configuração e execução local

Na raiz do repositório, instale as dependências e inicie os dois serviços:

```sh
npm install
npm run dev
```

Abra `http://localhost:5173`. A interface consulta `GET /api/health` pelo proxy
do Vite e exibe o estado da conexão. A API abre ou cria `apps/api/data/sitech.sqlite`
ao iniciar.

Para executar os serviços separadamente, use terminais distintos:

```sh
npm run dev --workspace @sitech/api
npm run dev --workspace @sitech/web
```

O caminho do arquivo SQLite pode ser alterado pela variável `DATABASE_PATH`;
`PORT` altera a porta da API (padrão `3001`).

## Verificação

```sh
npm test
npm run typecheck
npm run build
```

`npm test` executa os testes da rota de saúde e da abertura/query SQLite.
`npm run typecheck` verifica os tipos de frontend e API, e `npm run build` gera
as versões de produção. Para iniciar a API compilada, execute
`npm run start --workspace @sitech/api`.
