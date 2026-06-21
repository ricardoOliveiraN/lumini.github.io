# web-data-viz

## Visão Geral

`web-data-viz/` é o centro operacional atual do Lumini.

Este diretório concentra a aplicação web principal do projeto, reunindo:

- backend HTTP em Node.js/Express;
- frontend estático servido pelo próprio backend;
- rotas, controllers e models do domínio atual;
- configuração de ambiente;
- leitura serial local ligada ao sensor;
- ponte de integração opcional com o BobIA.

Dentro do conjunto do Lumini, esta é a pasta que melhor representa onde o
projeto efetivamente roda hoje.

## Papel no Projeto

`web-data-viz/` é a camada que conecta:

- interface do usuário;
- lógica HTTP;
- acesso ao banco do domínio Lumini;
- leitura serial relacionada ao sensor Arduino;
- integração opcional com o serviço separado do BobIA.

Se o README principal da raiz explica o projeto como um todo, este README
explica a parte que sustenta a superfície executável principal.

## Backend Exposto

O `app.js` registra atualmente:

- `/`
- `/usuarios`
- `/medidas`
- `/sensores`
- `/empresas`
- `/dashFunc`
- `/funcionarios`

Também expõe:

- `GET /js/bobia-config.js`

Essa rota injeta no frontend a configuração de `BOBIA_API_BASE_URL`.

## Frontend do Diretório

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

## Dependências Principais

- Node.js
- npm
- MySQL compatível com o schema ativo do Lumini
- configuração local de ambiente
- opcionalmente, porta serial para leitura de sensor
- opcionalmente, serviço BobIA externo

## Banco de Dados

O schema esperado por este diretório fica fora dele, em:

- `../artefatos-banco/sql-ativo/schema-ativo-lumini.sql`

Arquivos auxiliares:

- `../artefatos-banco/sql-ativo/seed-ativo-lumini.sql`
- `../artefatos-banco/sql-ativo/consultas-referencia-lumini.sql`
- `../artefatos-banco/setup-ativo-lumini.sql`

## Configuração de Ambiente

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

SERIAL_PORT=
SERIAL_BAUD_RATE=9600
SERIAL_BUFFER_MAX=100
```

Observações:

- `app.js` escolhe entre `.env` e `.env.dev`;
- a seleção ainda depende da variável local `ambiente_processo` dentro do
  próprio `app.js`;
- hoje o arquivo está configurado para `desenvolvimento`;
- sem `SERIAL_PORT`, a aplicação continua subindo, mas a leitura serial em
  tempo real não funciona.

## Como Executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar ambiente

Crie e preencha `.env.dev` a partir de `.env.dev.example` ou ajuste `.env`,
conforme o ambiente que deseja usar.

### 3. Subir o banco

Monte o banco com base em `../artefatos-banco/`, usando pelo menos o schema
ativo do Lumini.

### 4. Iniciar a aplicação

```bash
npm start
```

Para desenvolvimento com reload:

```bash
npm run dev
```

Quando o servidor subir, o terminal exibirá a URL formada com `APP_HOST` e
`APP_PORT`.

## BobIA

O frontend do Lumini não implementa o BobIA dentro deste backend.

O fluxo atual é:

- o backend expõe `GET /js/bobia-config.js`;
- o frontend lê `window.LUMINI_CONFIG.bobiaApiBaseUrl`;
- as chamadas do BobIA seguem para a base configurada externamente.

Se o serviço estiver ativo em outra pasta do repositório ou em outro host,
ajuste apenas `BOBIA_API_BASE_URL` no `.env` ou `.env.dev`.

## Leitura Serial do Sensor

Este diretório também inicializa `serialSensorService`, responsável por tentar
ler dados em tempo real por porta serial.

Na prática:

- a rota `/sensores` participa dessa superfície;
- `TelaDash-Sensor.html` usa essa leitura em tempo real;
- a integração depende de hardware, porta serial e ambiente local compatíveis.

## Estrutura

```text
web-data-viz/
├── app.js
├── package.json
├── .env.example
├── .env.dev.example
├── public/
│   ├── *.html
│   ├── css/
│   ├── js/
│   └── Imagens/
└── src/
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    └── services/
```

Áreas internas mais importantes:

- `public/`: interface estática e scripts do navegador;
- `src/routes/`: definição dos grupos de rotas;
- `src/controllers/`: camada intermediária da aplicação;
- `src/models/`: acesso ao banco;
- `src/config/`: configuração de banco;
- `src/services/`: serviços auxiliares, incluindo leitura serial.

## Limitações

- este diretório representa o centro operacional atual, mas não explica sozinho
  toda a composição do Lumini;
- a seleção de ambiente ainda depende de edição manual em `app.js`;
- a leitura serial depende de setup local real e não apenas de dependências
  instaladas;
- o frontend ainda usa HTML/CSS/JS estático, sem bundler;
- a integração com o BobIA é opcional e externa ao backend principal.

## Relação com o README Principal

O README da raiz de `lumini.github.io/` apresenta o Lumini como projeto
completo.

Este README foca somente na pasta `web-data-viz/`, isto é:

- a superfície executável principal;
- o setup da aplicação web;
- os pontos de integração ativos;
- e os limites específicos desta parte do projeto.
