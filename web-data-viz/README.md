# web-data-viz

Aplicação web Node.js/Express do projeto Lumini.

Este diretório concentra:

- backend HTTP em Express;
- arquivos estáticos do frontend em `public/`;
- rotas, controllers e models do domínio atual;
- integração opcional com o serviço externo do BobIA.

## Estrutura

```text
web-data-viz/
├── app.js
├── package.json
├── public/
│   ├── *.html
│   ├── css/
│   └── js/
└── src/
    ├── config/
    ├── controllers/
    ├── models/
    └── routes/
```

## Backend exposto

O `app.js` registra atualmente:

- `/`
- `/usuarios`
- `/medidas`
- `/empresas`
- `/dashFunc`
- `/funcionarios`

Também expõe:

- `GET /js/bobia-config.js`

Essa rota injeta no frontend a configuração de `BOBIA_API_BASE_URL`.

## Frontend do diretório

As páginas HTML ficam em `public/` e são servidas pelo próprio Express via
`express.static(...)`.

Entre as telas atuais estão:

- `index.html`
- `TelaLogin.html`
- `TelaDash-Geral.html`
- `TelaDash-Talhao.html`
- `TelaDash-Sensor.html`
- `CadastrarEmpresa.html`
- `CadastrarUsuario.html`
- `DashFuncionario.html`
- `bobIA.html`

## Requisitos

- Node.js
- npm
- MySQL compatível com o schema ativo do projeto

## Banco de dados

O schema usado por este diretório fica fora dele, em:

- `../artefatos-banco/sql-ativo/schema-ativo-lumini.sql`

Arquivos auxiliares:

- `../artefatos-banco/sql-ativo/seed-ativo-lumini.sql`
- `../artefatos-banco/sql-ativo/consultas-referencia-lumini.sql`
- `../artefatos-banco/setup-ativo-lumini.sql`

## Configuração de ambiente

Os arquivos de exemplo estão neste diretório:

- `.env.example`
- `.env.dev.example`

As variáveis esperadas são:

```env
AMBIENTE_PROCESSO=

DB_HOST=
DB_DATABASE=
DB_USER=
DB_PASSWORD=
DB_PORT=

APP_PORT=
APP_HOST=
BOBIA_API_BASE_URL=
```

Observações:

- `app.js` escolhe entre `.env` e `.env.dev`.
- A seleção é controlada manualmente pela variável `ambiente_processo` no
  próprio `app.js`.
- Hoje o arquivo está configurado para `desenvolvimento`.

## Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Crie e preencha `.env.dev` a partir de `.env.dev.example`.

3. Suba o banco com o schema do Lumini.

4. Inicie a aplicação:

```bash
npm start
```

Para desenvolvimento com reload:

```bash
npm run dev
```

Quando o servidor subir, o terminal exibirá a URL montada com `APP_HOST` e
`APP_PORT`.

## BobIA

O frontend do Lumini não implementa o BobIA dentro deste backend.
Ele espera um serviço externo configurado por `BOBIA_API_BASE_URL`.

O fluxo atual é:

- o backend expõe `GET /js/bobia-config.js`;
- o frontend lê `window.LUMINI_CONFIG.bobiaApiBaseUrl`;
- as chamadas do BobIA seguem para a base configurada externamente.

Se o serviço estiver local em outra pasta do repositório, ajuste apenas a URL
base no `.env` ou `.env.dev`.

## Observações de manutenção

- Este README descreve o estado atual do diretório `web-data-viz`, não o
  template acadêmico original.
- A aplicação ainda usa HTML/CSS/JS estático no frontend, sem bundler.
- Parte da seleção de ambiente ainda depende de edição manual em `app.js`.
