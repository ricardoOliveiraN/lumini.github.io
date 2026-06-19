# Artefatos de banco

## Objetivo deste diretório

Este diretório reúne os artefatos de banco associados ao projeto Lumini
original. No estado atual da revisão estrutural, ele deve ser lido com nomes
que deixem claro o papel de cada arquivo:

- `sql-ativo/schema-ativo-lumini.sql`: principal candidato a schema vigente
  esperado pela aplicação atual, contendo apenas estrutura de banco.
- `sql-ativo/seed-ativo-lumini.sql`: carga de dados mockados para apoio local
  e validação manual.
- `sql-ativo/consultas-referencia-lumini.sql`: consultas `SELECT` preservadas
  como referência funcional e analítica.
- `setup-ativo-lumini.sql`: atalho para bootstrap local com schema e seed.
- `modelo-workbench-lumini.mwb`: modelagem de apoio em formato MySQL
  Workbench, não consumida diretamente pelo
  runtime.
- `diagrama-er-lumini.drawio`: versão editável do diagrama ER.

## Leitura operacional atual

Com base no fluxo confirmado em `web-data-viz/`:

- o domínio ativo observado usa `empresa`, `usuario`, `talhao`, `sensor`,
  `dadosSensor` e `filtragemDados`;
- esse domínio se alinha a `sql-ativo/schema-ativo-lumini.sql`;
- `sql-ativo/seed-ativo-lumini.sql` deve ser lido como apoio de ambiente
  local, não como definição estrutural;
- `sql-ativo/consultas-referencia-lumini.sql` deve ser lido como material de
  referência, não como etapa obrigatória de inicialização;
- `web-data-viz/artefatos-template/script-tabelas-template-aquatech.sql`
  continua tratado como artefato herdado de template e não como fonte
  principal do schema Lumini.

## Regra de saneamento nesta fase

- manter a distinção explícita entre schema ativo, schema legado e modelagem;
- manter a distinção explícita entre estrutura, carga mockada e consultas de
  referência dentro do conjunto ativo;
- manter `setup-ativo-lumini.sql` como ponto de entrada visível, com os SQLs
  ativos agrupados em `sql-ativo/`;
- usar este diretório para deixar claro que estes arquivos são artefatos de
  apoio à revisão estrutural, e não a árvore principal de runtime.
