# Artefatos template

## Objetivo

Este diretório reúne materiais herdados de template, exemplos de apoio e
componentes paralelos que não fazem parte do núcleo principal de runtime de
`web-data-viz`.

## Conteúdo isolado nesta fase

- `documentos-de-apoio/`: guias, exemplos e miniaplicações de apoio herdadas do
  template acadêmico `web-data-viz`.
- `bobia-standalone/`: cópia local de um projeto BobIA standalone com `main.js`,
  `package.json` e `public/` próprios.

## Interpretação atual

- `documentos-de-apoio/` não participa do fluxo principal confirmado de login,
  sessão e dashboards do Lumini.
- `bobia-standalone/` não é o caminho usado pela página `public/bobIA.html`,
  que hoje consome um endpoint externo por JavaScript próprio em `public/js/BOBIA.js`.
- estes artefatos foram isolados para reduzir ambiguidade estrutural, sem
  alterar a superfície principal de execução.
