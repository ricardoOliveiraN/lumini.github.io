# BobIA no Lumini

## Visão Geral

Este diretório contém o serviço separado do BobIA usado como apoio ao projeto
Lumini no contexto acadêmico em que ele foi exigido.

Ele não faz parte do backend principal de `web-data-viz/`, mas pode ser
consumido pelo frontend do Lumini quando `BOBIA_API_BASE_URL` aponta para uma
instância ativa deste serviço.

## O Que Este Diretório É

`bobia-standalone/` é uma aplicação Node.js/Express com:

- uma API HTTP simples;
- uma interface web mínima para teste local;
- integração com Google Generative AI;
- uma rota `POST /perguntar` para receber perguntas e devolver respostas.

## Papel Dentro do Lumini

No contexto atual do Lumini, o BobIA funciona como um serviço auxiliar
separado.

Sua função é oferecer uma camada de interação por IA sem incorporar essa
responsabilidade diretamente ao backend principal do projeto.

## Como Ele Se Conecta ao Lumini

A integração com o Lumini acontece por configuração externa.

O fluxo atual é:

1. `web-data-viz/` expõe `GET /js/bobia-config.js`;
2. o frontend do Lumini lê `window.LUMINI_CONFIG.bobiaApiBaseUrl`;
3. os scripts do frontend montam chamadas para `POST /perguntar`;
4. este serviço responde usando a chave configurada para o Gemini.

Se `BOBIA_API_BASE_URL` não estiver configurada no `web-data-viz/`, o Lumini
continua existindo sem esse serviço.

## Tecnologias

- Node.js
- Express
- `dotenv`
- `@google/generative-ai`
- HTML/CSS para interface local simples

## Setup Local

1. Instale as dependências:

```bash
npm install
```

2. Crie `.env` a partir de `.env.example`.

3. Configure as variáveis:

```env
MINHA_CHAVE=
PORTA=
```

4. Inicie o serviço:

```bash
npm start
```

## Superfície Exposta

Pontos principais:

- `main.js`
- `public/index.html`
- `POST /perguntar`

O serviço também publica a interface estática de teste em `/`.

## Como Testar

Depois de iniciar o servidor:

- acesse `http://localhost:<PORTA>`;
- envie uma pergunta pela interface local;
- ou faça uma chamada HTTP para `POST /perguntar`.

## Limitações

- depende de uma chave válida do Google Generative AI;
- o serviço é opcional do ponto de vista do runtime principal do Lumini;
- este diretório não substitui o backend principal de `web-data-viz/`;
- a interface local existe principalmente para teste direto do serviço.

## Estrutura

```text
bobia-standalone/
├── main.js
├── package.json
├── .env.example
├── README.md
└── public/
    ├── index.html
    └── style.css
```

## Crédito de Origem

Este serviço tem origem acadêmica ligada à São Paulo Tech School / Bandtec e
foi utilizado no projeto Lumini conforme a diretriz do projeto da faculdade.
Este README descreve o papel atual do diretório dentro do Lumini, sem tratar o
BobIA como criação original deste repositório.
