# historico-academico

## Visão Geral

`historico-academico/` é a área de preservação histórica, acadêmica e
documental do Lumini.

Esta pasta reúne materiais que ajudam a explicar a origem, a evolução e os
entregáveis acadêmicos do projeto, mas que não fazem parte da superfície
executável principal.

Dentro do conjunto do Lumini, esta é a área de memória documental e
rastreabilidade.

## Papel no Projeto

`historico-academico/` existe para preservar:

- apresentações acadêmicas;
- documentação de sprint;
- documentos finais exportados e editáveis;
- diagramas técnicos e de visão de negócio;
- fluxogramas;
- artefatos administrativos ou históricos de apoio.

Seu valor principal está em ajudar a responder:

- como o projeto foi apresentado ao longo da sua evolução acadêmica;
- quais documentos e diagramas foram produzidos;
- quais materiais ajudam a entender contexto e decisões do projeto;
- o que pertence à história do Lumini e não ao runtime atual.

## O Que Fica Aqui

Os grupos principais desta pasta são:

- `apresentacoes/`
- `documentacao-academica/`
- `diagramas-solucao-tecnica/`
- `diagramas-visao-negocio/`
- `documentacao-academica/fluxogramas/`

Exemplos concretos de artefatos:

- `apresentacoes/sprint-01/apresentacao-lumini-sprint-01.pdf`
- `documentacao-academica/documentacao-lumini-fonte-editavel.docx`
- `documentacao-academica/documentacao-lumini-exportada.pdf`
- `documentacao-academica/apresentacao-final-lumini-exportada.pdf`
- `documentacao-academica/backlog-lumini-fonte-editavel.xlsx`
- `documentacao-academica/gmud-lumini-grupo-03-exportada.pdf`
- `diagramas-solucao-tecnica/diagrama-solucao-tecnica-lumini.png`
- `diagramas-visao-negocio/diagrama-visao-negocio-lumini-2024-09.pdf`

## Como Esta Pasta Deve Ser Lida

Esta pasta deve ser lida como:

- apoio documental;
- memória acadêmica;
- evidência histórica;
- contexto para entendimento do projeto.

Ela não deve ser tratada como:

- núcleo operacional;
- fonte normativa do runtime atual;
- substituta dos documentos técnicos ativos das outras áreas.

## Relação com o Restante do Lumini

### Relação com `web-data-viz/`

Há uma relação de contexto e rastreabilidade.

`web-data-viz/` mostra a superfície executável atual, enquanto
`historico-academico/` preserva parte do material que ajuda a explicar origem,
entregáveis acadêmicos e evolução do projeto.

### Relação com `artefatos-banco/`

Há uma relação indireta de apoio documental.

Diagramas, fluxogramas e documentos acadêmicos podem ajudar a interpretar o
domínio do banco, mas não substituem a leitura técnica da estrutura SQL ativa.

### Relação com `firmware-arduino/`

Há uma relação contextual e explicativa.

Parte dos materiais históricos pode ajudar a contextualizar o papel do sensor,
da coleta física e da proposta técnica do projeto.

### Relação com `bobia-standalone/`

Não há ligação estrutural direta identificada.

No máximo, existe proximidade de contexto acadêmico dentro do mesmo projeto.

## Estrutura

```text
historico-academico/
├── README.md
├── apresentacoes/
│   └── sprint-01/
├── documentacao-academica/
│   ├── sprint-01/
│   └── fluxogramas/
├── diagramas-solucao-tecnica/
└── diagramas-visao-negocio/
```

## Observações

- esta pasta preserva materiais úteis para leitura histórica e explicativa do
  Lumini;
- parte dos nomes atuais foi organizada para facilitar navegação e leitura;
- a utilidade de cada artefato pode variar entre evidência histórica, apoio
  explicativo e documentação acadêmica;
- qualquer reaproveitamento futuro de conteúdo desta pasta para documentação
  ativa deve ser explícito e validado contra o estado real do projeto.

## Relação com o README Principal

O README da raiz de `lumini.github.io/` apresenta o Lumini como projeto
completo.

Este README foca apenas em `historico-academico/`, isto é:

- a memória documental do projeto;
- os grupos de material preservados;
- o papel histórico/acadêmico dessa pasta;
- e os limites corretos de interpretação dessa área.
