# artefatos-banco

## Visão Geral

`artefatos-banco/` é a área de apoio estrutural de banco do Lumini.

Esta pasta concentra os arquivos que sustentam a leitura da camada relacional
do projeto, incluindo:

- o schema ativo esperado pela aplicação;
- a seed mockada para apoio local;
- consultas de referência;
- um atalho de bootstrap;
- artefatos de modelagem visual.

Dentro do conjunto do Lumini, esta pasta não executa a aplicação, mas sustenta
tecnicamente a estrutura de dados esperada pelo runtime principal.

## Papel no Projeto

`artefatos-banco/` é a base de apoio para entender e montar o domínio
persistido do Lumini.

Ela ajuda a sustentar entidades e relações ligadas a:

- `empresa`
- `endereco`
- `usuario`
- `talhao`
- `sensor`
- `filtragemDados`
- `dadosSensor`

Se o README principal explica o projeto como um todo, este README explica a
parte que ancora a estrutura relacional usada pelo Lumini.

## O Que Esta Pasta Contém

### `sql-ativo/schema-ativo-lumini.sql`

É o principal candidato a schema vigente esperado pela aplicação atual.

Contém a estrutura relacional do banco.

### `sql-ativo/seed-ativo-lumini.sql`

É a carga de dados mockados para apoio local, testes manuais e demonstração.

Não deve ser tratada como definição estrutural do banco.

### `sql-ativo/consultas-referencia-lumini.sql`

Preserva consultas `SELECT` como referência funcional e analítica.

Serve para leitura, inspeção e apoio, não como etapa obrigatória de
inicialização.

### `setup-ativo-lumini.sql`

É o atalho de bootstrap local do conjunto ativo.

Hoje ele contém:

```sql
SOURCE sql-ativo/schema-ativo-lumini.sql;
SOURCE sql-ativo/seed-ativo-lumini.sql;
```

### `modelo-workbench-lumini.mwb`

É um artefato de modelagem de apoio em formato MySQL Workbench.

Não é consumido diretamente pelo runtime.

### `diagrama-er-lumini.drawio`

É a versão editável do diagrama ER do projeto.

## Conexão com o Lumini

A conexão mais forte desta pasta é com `web-data-viz/`.

O runtime principal do Lumini depende desta área para:

- entender a estrutura de banco esperada;
- subir o banco local;
- consultar dados mockados;
- inspecionar queries e relações do domínio.

Na prática:

- `web-data-viz/` usa esta pasta como referência estrutural de banco;
- esta pasta sustenta a leitura relacional do domínio;
- a modelagem visual ajuda a explicar o banco, mas não substitui o SQL ativo.

## Como Usar

### 1. Estrutura mínima

Para montar o banco do projeto:

1. aplique `sql-ativo/schema-ativo-lumini.sql`;
2. opcionalmente aplique `sql-ativo/seed-ativo-lumini.sql`.

### 2. Atalho de bootstrap

Se preferir, use:

```sql
SOURCE setup-ativo-lumini.sql;
```

Isso aplica:

- `sql-ativo/schema-ativo-lumini.sql`
- `sql-ativo/seed-ativo-lumini.sql`

### 3. Inspeção e apoio

Use os demais arquivos para:

- consultar exemplos em `consultas-referencia-lumini.sql`;
- inspecionar a modelagem em `.mwb`;
- editar ou visualizar o diagrama ER em `.drawio`.

## Estrutura

```text
artefatos-banco/
├── README.md
├── setup-ativo-lumini.sql
├── diagrama-er-lumini.drawio
├── modelo-workbench-lumini.mwb
└── sql-ativo/
    ├── schema-ativo-lumini.sql
    ├── seed-ativo-lumini.sql
    └── consultas-referencia-lumini.sql
```

## Limitações

- esta pasta deve ser lida como apoio estrutural de banco, não como runtime
  principal do Lumini;
- a seed mockada existe para apoio local e demonstração, não como definição
  estrutural;
- as consultas de referência ajudam na leitura funcional, mas não são etapa
  obrigatória de inicialização;
- os arquivos de modelagem ajudam a explicar o domínio, mas não são consumidos
  diretamente pela aplicação;
- o fato de esta pasta existir não prova, sozinho, alinhamento integral do
  backend sem nova verificação quando necessário.

## Relação com o README Principal

O README da raiz de `lumini.github.io/` apresenta o Lumini como projeto
completo.

Este README foca apenas em `artefatos-banco/`, isto é:

- a base relacional esperada;
- o papel de cada artefato SQL;
- o setup mínimo de banco;
- e os limites específicos desta área dentro do projeto.
