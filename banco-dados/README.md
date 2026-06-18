# Banco de dados

## Objetivo deste diretório

Este diretório reúne os artefatos de banco associados ao projeto Lumini
original. No estado atual do saneamento estrutural, ele deve ser lido com a
seguinte distinção:

- `BancoLumini.sql`: principal candidato a schema vigente esperado pela
  aplicação atual.
- `BancoLegado.sql`: artefato legado ou histórico, preservado para rastreio
  até validação final.
- `ModelagemLuminiV2.mwb`: modelagem de apoio, não consumida diretamente pelo
  runtime.
- `ModelagemLuminiV2.mwb.bak`: cópia de apoio da modelagem.

## Leitura operacional atual

Com base no fluxo confirmado em `web-data-viz/`:

- o domínio ativo observado usa `empresa`, `usuario`, `talhao`, `sensor`,
  `dadosSensor` e `filtragemDados`;
- esse domínio se alinha a `BancoLumini.sql`;
- `web-data-viz/src/database/script-tabelas.sql` continua tratado como
  artefato herdado de template e não como fonte principal do schema Lumini.

## Regra de saneamento nesta fase

- não renomear ou remover artefatos de banco ainda;
- não assumir `BancoLegado.sql` como descartável sem validar se alguma parte
  dele ainda serve como referência técnica;
- usar este diretório para explicitar ativo versus legado antes de qualquer
  reorganização física.
