# Lumini

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Arduino](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Visão Geral

Lumini é um projeto acadêmico de monitoramento de luminosidade para plantações
de lúpulo. O objetivo é apoiar o produtor na gestão do fotoperíodo e da
intensidade de luz por meio de sensores, armazenamento de dados e dashboards
web para tomada de decisão.

O repositório reúne uma aplicação web em Node.js/Express, artefatos de banco,
componente de Arduino/LDR, um serviço separado de BobIA e documentação
acadêmica preservada.

## Problema

O problema que o Lumini resolve é a dificuldade de manter a exposição à luz
ideal no cultivo de lúpulo no Brasil.

- o Brasil tem mercado cervejeiro muito relevante, mas ainda depende fortemente
  de lúpulo importado;
- o lúpulo precisa de fotoperíodo elevado para bom desenvolvimento;
- no Brasil, a luz natural diária costuma ser insuficiente para atingir essa
  necessidade sem apoio artificial;
- erro de intensidade ou de horas de exposição reduz produtividade e pode
  prejudicar a qualidade da plantação.

Em termos de negócio, o projeto existe para responder esta pergunta:

> a plantação está recebendo luz suficiente, no intervalo certo, para sustentar
> produtividade e qualidade?

## Solução

Lumini é uma solução de monitoramento de luminosidade com foco em apoio à
decisão, não em automação direta da iluminação.

O projeto combina:

- leitura ou simulação de dados de luminosidade com sensor LDR;
- backend e interface web para consulta e visualização;
- armazenamento em banco relacional;
- dashboards e indicadores para acompanhamento;
- sinalização de condições fora do esperado;
- suporte ao produtor no manejo de luz da plantação.

O projeto busca melhorar a assertividade do manejo de luz, apoiar ganho de
produtividade e ajudar o produtor a avaliar condições para múltiplas safras
anuais.

## Arquitetura

```text
Sensor LDR / Arduino
    ↓
Leitura serial local
    ↓
web-data-viz (Node.js / Express)
    ↓
MySQL / artefatos-banco
    ↓
Dashboards e telas web

Serviço auxiliar opcional:
web-data-viz frontend → BobIA standalone → Gemini
```

Estrutura funcional do repositório:

- `web-data-viz/`: centro operacional atual;
- `artefatos-banco/`: suporte estrutural do banco;
- `firmware-arduino/`: apoio técnico da parte sensorial;
- `bobia-standalone/`: serviço separado de apoio;
- `historico-academico/`: memória documental e acadêmica.

## Tecnologias

| Camada | Tecnologias / Artefatos |
| --- | --- |
| Aplicação web | Node.js, Express, HTML, CSS, JavaScript |
| Banco | MySQL, SQL |
| Sensor e integração local | Arduino UNO R3, LDR, comunicação serial |
| Serviço auxiliar | BobIA, Google Generative AI |
| Documentação e modelagem | Draw.io, PDF, DOCX, PPTX, XLSX |

## Como Executar

### 1. Aplicação principal

```bash
cd web-data-viz
npm install
npm start
```

Para desenvolvimento com reload:

```bash
npm run dev
```

### 2. Configuração de ambiente

Preencha `.env` ou `.env.dev` em `web-data-viz/` com:

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

### 3. Banco de apoio

Use `artefatos-banco/` para subir a estrutura:

1. aplique `sql-ativo/schema-ativo-lumini.sql`;
2. opcionalmente aplique `sql-ativo/seed-ativo-lumini.sql`;
3. opcionalmente use `setup-ativo-lumini.sql` como atalho.

### 4. BobIA opcional

Se quiser incluir o BobIA:

```bash
cd bobia-standalone
npm install
npm start
```

Com:

```env
MINHA_CHAVE=
PORTA=
```

Depois, configure `BOBIA_API_BASE_URL` em `web-data-viz/`.

### 5. Leitura serial opcional

Se a demonstração incluir Arduino:

1. suba o sketch em `firmware-arduino/`;
2. escolha modo mockado ou real;
3. disponibilize a porta serial no ambiente local;
4. configure `SERIAL_PORT` no `web-data-viz`.

## Estrutura do Projeto

```text
lumini.github.io/
├── web-data-viz/            # runtime principal
├── bobia-standalone/        # serviço auxiliar separado
├── artefatos-banco/         # schema, seed, queries e modelagem
├── firmware-arduino/        # sketch e materiais do sensor
├── historico-academico/     # documentação e rastreabilidade
└── docs/                    # artefatos estruturais da revisão
```

## Dados e Exemplos

Exemplos de apoio presentes no repositório:

- `artefatos-banco/sql-ativo/seed-ativo-lumini.sql`
- consultas em `artefatos-banco/sql-ativo/consultas-referencia-lumini.sql`
- dashboards em `web-data-viz/public/TelaDash-Geral.html`,
  `TelaDash-Talhao.html` e `TelaDash-Sensor.html`
- modo mockado no sketch Arduino para testes de integração serial

Referências de operação tratadas pelo projeto:

| Indicador | Referência da documentação original |
| --- | --- |
| Fotoperíodo ideal | entre 15 e 17 horas |
| Situação crítica | abaixo de 12 horas |
| Intensidade de referência | cerca de 20.000 lux |
| Mínimo crítico | 5.000 lux |
| Mínimo ideal | 10.000 lux |
| Máximo indicado | 100.000 lux |

## Principais Aprendizados

Este projeto evidencia aprendizados importantes do desenvolvimento de uma
primeira solução tecnológica integrada para um problema real de negócio:

- tradução de um problema do cultivo de lúpulo em métricas monitoráveis, como
  fotoperíodo e intensidade luminosa;
- integração entre sensor LDR, Arduino, aplicação web, banco de dados e
  dashboards para formar um fluxo funcional de monitoramento;
- uso de dados para apoiar a tomada de decisão do produtor, em vez de depender
  apenas de observação manual;
- organização de informações técnicas e de negócio para transformar coleta de
  dados em acompanhamento mais útil da plantação;
- aprendizado prático de trabalho em grupo com rituais de Scrum, incluindo
  dailies, retrospectivas, organização das entregas por sprints e priorização
  do que gerava mais valor para o usuário;
- experiência prática de desenvolvimento em grupo, conectando hardware,
  software e modelagem de dados em um mesmo projeto.

## Limitações

- o Lumini é uma ferramenta de apoio à decisão, não uma solução de automação
  da iluminação;
- a integração com o BobIA é opcional e depende de serviço e configuração
  separados do núcleo principal do projeto;
- a demonstração completa com leitura serial em tempo real ainda depende de
  ambiente local com hardware e porta serial corretamente configurados.

## Próximos Passos

- alinhar os demais documentos públicos do projeto ao README consolidado;
- refinar a apresentação final do Lumini para futura publicação/autoria própria;
- decidir o nível final de demonstração entre setup mockado e setup sensorial
  real;
- consolidar, quando necessário, instruções de execução mais verificadas do
  runtime principal.

## Licença

As condições de uso e os créditos aplicáveis devem seguir os arquivos de
licença e os componentes correspondentes presentes neste repositório.
