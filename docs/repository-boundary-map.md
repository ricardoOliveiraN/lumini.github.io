# Mapa de Limites do Repositório Lumini

## Propósito

Este documento registra o escopo executável atual e os principais limites do
repositório identificados durante o ciclo inicial de recuperação estrutural de
`lumini.github.io`.

Ele existe para apoiar o refinamento de baixo risco do repositório original
antes de qualquer correção mais profunda ou trabalho de derivação.

Este projeto está sendo revisado como um **piloto de refinamento de portfólio**,
não como a principal vitrine de Engenharia de Dados. O objetivo imediato é
tornar o repositório compreensível, estruturalmente mais seguro para inspeção e
preparado para uma versão derivada futura com escopo, origem e limitações
explícitos.

## Intenção da Revisão

A revisão atual segue estas restrições:

- preservar o repositório histórico como referência;
- evitar refatoração profunda no primeiro ciclo;
- evitar apagar material legado antes da classificação;
- separar escopo executável, material de apoio e artefatos históricos;
- esclarecer o que o sistema realmente executa antes de decidir o que arquivar,
  isolar, reescrever ou remover.

## Centro Operacional Atual

O centro operacional atual do repositório é:

- `web-data-viz/`

Evidências:

- contém `package.json` e `app.js`;
- contém `public/` e `src/`;
- expõe rotas backend e serve assets frontend;
- contém o único ponto de entrada claro da aplicação identificado até agora.

## Superfície de Runtime Confirmada

### Ponto de entrada backend

- `web-data-viz/app.js`

### Grupos de rotas ativos confirmados no fluxo atual

- `/usuarios`
- `/medidas`
- `/dashFunc`
- `/funcionarios`
- `/empresas` (fluxo do domínio Lumini, parcialmente adaptado e estruturalmente frágil)

### Fluxo frontend confirmado no fluxo atual

- `web-data-viz/public/index.html`
- `web-data-viz/public/TelaLogin.html`
- `web-data-viz/public/TelaDash-Geral.html`
- `web-data-viz/public/TelaDash-Talhao.html`
- `web-data-viz/public/TelaDash-Sensor.html`

### Comportamento de sessão e navegação

O frontend atualmente usa `sessionStorage` para propagar estado de runtime como:

- usuário logado;
- id da empresa;
- tipo de usuário;
- `talhao` selecionado;
- `sensor` selecionado.

Isso confirma que o runtime não é apenas um protótipo estático. Existe um fluxo
real de aplicação web acoplando páginas frontend a endpoints backend.

## Superfície de Domínio Ativa Identificada Até Agora

A superfície de domínio atualmente ativa parece estar centrada em:

- `empresa`
- `usuario`
- `talhao`
- `sensor`
- `dadosSensor`
- `filtragemDados`

Evidências:

- os dashboards atuais usam endpoints `/medidas/*` ligados a `talhao`, `sensor`,
  `dadosSensor` e `filtragemDados`;
- o comportamento de autenticação e sessão usa `usuario` e `empresa`;
- dashboards agregados usam `/dashFunc/*` contra `empresa`, `usuario`, `sensor`
  e dados relacionados.

## Fluxos Parciais de Runtime Validados

### `/empresas`

Classificação:

- fluxo do domínio Lumini;
- parcialmente adaptado a partir do template acadêmico;
- deve permanecer na árvore executável por enquanto;
- não deve ser tratado como limpo ou totalmente alinhado até ser corrigido em
  uma passada futura de implementação.

Evidências de alinhamento com Lumini:

- `web-data-viz/public/js/CadastrarEmpresa.js` chama
  `/empresas/cadastrarEmpresa`, `/empresas/buscarID/:cnpj` e
  `/empresas/cadastrarEndereco`;
- `web-data-viz/src/models/empresaModel.js` insere em colunas de `empresa` que
  existem em `artefatos-banco/sql-ativo/schema-ativo-lumini.sql`: `nomeFantasia`,
  `cnpj`,
  `tamanhoEmpresa`, `qtdHectares` e `dtCriacao`;
- `web-data-viz/src/models/empresaModel.js` insere endereços em `endereco` com
  `fkEndereco_Empresa`, que também existe em
  `schema-ativo-lumini.sql`;
- `buscarId(cnpj)` lê `idEmpresa`, alinhando-se ao schema Lumini e ao fluxo
  frontend que armazena `sessionStorage.ID_EMPRESA`.

Evidências de resíduo herdado ou quebrado de template:

- `buscarPorId(id)` consulta `empresa.id`, mas `schema-ativo-lumini.sql` define
  `idEmpresa`;
- `listar()` seleciona `id`, `razao_social` e `codigo_ativacao`, que não existem
  na tabela `empresa` do Lumini;
- `empresaController.cadastrarEmpresa()` valida as variáveis `StatusCadastro` e
  `DataCriacao`, que não são definidas no escopo do controller;
- `public/js/CadastrarEmpresa.js` também referencia `StatusCadastro` e
  `DataCriacao` sem defini-las antes da expressão de validação;
- `routes/empresas.js` expõe `/buscarIDEndereco`, mas
  `empresaController.buscarIDEndereco` não é exportado nem definido.

Interpretação atual:

- a intenção de cadastrar empresa e endereço faz parte da superfície da
  aplicação Lumini;
- os helpers de listagem e busca ainda contêm pressupostos da era do template;
- este fluxo deve ser classificado como ativo-mas-parcial, e não como legado
  puro ou código seguro para produção.

## Registros de Runtime Derivados de Template Validados

### `/avisos`

Classificação:

- grupo de rotas legado derivado de template;
- registrado por `web-data-viz/app.js`, mas desalinhado do schema Lumini;
- nenhum chamador frontend de runtime foi confirmado nesta passada;
- deve permanecer no lugar até que uma passada futura de limpeza decida se deve
  isolar ou remover rotas de template.

Evidências:

- `web-data-viz/src/models/avisoModel.js` consulta e altera uma tabela `aviso`;
- `artefatos-banco/sql-ativo/schema-ativo-lumini.sql` não define uma tabela `aviso`;
- `avisoModel.js` espera colunas de template como `aviso.id`,
  `aviso.fk_usuario` e `usuario.id`, enquanto
  `schema-ativo-lumini.sql` usa
  `usuario.idUsuario` e `usuario.fkUsuario_Empresa`;
- `web-data-viz/artefatos-template/script-tabelas-template-aquatech.sql`, o arquivo SQL de template
  herdado já identificado, define `CREATE TABLE aviso`;
- a busca no frontend encontrou conteúdo textual com "aviso", mas nenhuma
  chamada ativa de `fetch` ou navegação para `/avisos`.

Interpretação atual:

- `/avisos` não faz parte do domínio operacional Lumini confirmado;
- é melhor tratá-lo como resíduo de template registrado, e não como código ativo
  do Lumini ou módulo de negócio ambíguo.

## Candidato Ativo de Banco de Dados

A fonte de banco de dados atualmente mais alinhada ao runtime é:

- `artefatos-banco/sql-ativo/schema-ativo-lumini.sql`
- `artefatos-banco/sql-ativo/seed-ativo-lumini.sql`
- `artefatos-banco/sql-ativo/consultas-referencia-lumini.sql`

Por que este é o principal candidato:

- suas entidades correspondem ao domínio de runtime já confirmado no backend e
  no fluxo frontend;
- ele se alinha a `empresa`, `usuario`, `talhao`, `sensor`, `dadosSensor` e
  `filtragemDados`.

Rotulagem operacional nesta branch:

- `sql-ativo/schema-ativo-lumini.sql` deve ser tratado atualmente como o
  candidato ativo de banco de dados para o runtime da aplicação;
- `sql-ativo/seed-ativo-lumini.sql` deve ser tratado como carga mockada de
  apoio local, e não como definição estrutural do banco;
- `sql-ativo/consultas-referencia-lumini.sql` deve ser tratado como referência
  analítica e de inspeção, não como parte obrigatória do bootstrap;
- este é um rótulo estrutural para fins de revisão, ainda não uma afirmação de
  que todos os módulos backend estão totalmente alinhados a ele.

## Ambiguidade Conhecida de Banco de Dados

O repositório ainda contém fontes SQL concorrentes ou legadas:

- `web-data-viz/artefatos-template/script-tabelas-template-aquatech.sql`
- `artefatos-banco/sql-ativo/seed-ativo-lumini.sql`
- `artefatos-banco/sql-ativo/consultas-referencia-lumini.sql`
- `artefatos-banco/modelo-workbench-lumini.mwb`

Interpretação atual:

- `sql-ativo/schema-ativo-lumini.sql` é o principal candidato operacional;
- `sql-ativo/seed-ativo-lumini.sql` representa dados mockados locais acoplados
  ao schema ativo;
- `sql-ativo/consultas-referencia-lumini.sql` preserva consultas utilitárias
  associadas ao domínio ativo;
- `script-tabelas-template-aquatech.sql` parece herdado do template acadêmico original e
  referencia outro domínio;
- os arquivos `.mwb` são artefatos de modelagem/apoio, não entradas de runtime.

Ação atual de baixo risco no repositório:

- manter todos os arquivos SQL e de modelagem no lugar;
- rotular `sql-ativo/schema-ativo-lumini.sql` como candidato ativo;
- rotular `sql-ativo/seed-ativo-lumini.sql` como carga mockada opcional;
- rotular `sql-ativo/consultas-referencia-lumini.sql` como referência de apoio;
- manter a pasta `artefatos-banco/` como área explícita de apoio estrutural;
- manter o SQL legado isolado em `web-data-viz/artefatos-template/` e o schema
  ativo em `artefatos-banco/sql-ativo/schema-ativo-lumini.sql`.

## Limite de Firmware e Hardware

Material relevante relacionado a hardware identificado até agora:

- `firmware-arduino/codigo-ldr/codigoArduino.ino`
- `firmware-arduino/Relatório Técnico - Sensor de Luminosidade LDR - Grupo 08.pdf`
- `firmware-arduino/Arquitetura de montagem do Sensor Arduino.png`

Interpretação atual:

- o código Arduino é relevante como contexto técnico para captura do sensor;
- os materiais de hardware ainda não foram confirmados como parte de um caminho
  de ingestão ativo no runtime atual;
- eles devem ser preservados durante o primeiro ciclo estrutural.

## Material Histórico, Acadêmico e de Apoio

A raiz do repositório atualmente mistura material executável e não executável.

Material atualmente isolado como contexto histórico, acadêmico ou de apoio:

- `historico-academico/apresentacoes/`
- `historico-academico/documentacao-academica/`
- `historico-academico/diagramas-solucao-tecnica/`
- `historico-academico/diagramas-visao-negocio/`
- `historico-academico/documentacao-academica/fluxogramas/`
- `historico-academico/documentacao-academica/gmud-lumini-fonte-editavel.docx`

Esses itens podem conter contexto útil, mas atualmente não são a fonte primária
de verdade para o comportamento de runtime.

## Artefatos de Raiz Não-Runtime Validados

### `package-lock.json` raiz

Classificação:

- lockfile npm órfão no nível raiz;
- não existe `package.json` raiz ao lado dele;
- o lockfile não possui entradas de pacote em `packages`;
- o pacote real da aplicação Node.js é `web-data-viz/package.json`.

Interpretação atual:

- o `package-lock.json` raiz não faz parte da configuração ativa de runtime;
- ele é candidato de limpeza, enquanto `web-data-viz/package.json` permanece
  como manifesto operacional do pacote.

## Áreas Derivadas de Template ou Suspeitas de Legado

As áreas abaixo mostram sinais fortes de código herdado de template, material
somente de apoio ou exemplos paralelos:

- `web-data-viz/src/routes/aquarios.js`
- `web-data-viz/src/models/aquarioModel.js`
- `web-data-viz/src/routes/avisos.js`
- `web-data-viz/src/controllers/avisoController.js`
- `web-data-viz/src/models/avisoModel.js`
- `web-data-viz/artefatos-template/script-tabelas-template-aquatech.sql`
- `web-data-viz/README.md`
- `web-data-viz/artefatos-template/documentos-de-apoio/`
- `bobia-standalone/`

Essas áreas não devem ser removidas no ciclo inicial. Elas devem primeiro ser
classificadas, validadas e, quando apropriado, isoladas da superfície
operacional.

## Itens Ambíguos Pendentes de Validação

Nenhuma ambiguidade de raiz permanece aberta na fila inicial de revisão
estrutural. Ambiguidades futuras devem ser adicionadas aqui apenas quando novas
evidências forem encontradas durante validação de runtime ou limpeza.

## O Que Está Dentro do Escopo da Recuperação Estrutural Inicial

- confirmar como o sistema roda hoje;
- confirmar qual superfície de runtime é realmente usada;
- identificar a fonte de banco de dados mais compatível com o runtime;
- separar escopo executável de material de apoio e histórico;
- rotular módulos legados ou derivados de template sem alterar comportamento;
- preparar o repositório para uma versão derivada futura com enquadramento de
  portfólio explícito.

## O Que Está Fora do Escopo Deste Primeiro Ciclo

- reescritas amplas de lógica de negócio;
- refatoração arquitetural profunda;
- deleção agressiva de material antigo;
- complexidade inventada para fazer o projeto parecer mais avançado;
- mudança de identidade do projeto antes que o escopo real esteja totalmente
  confirmado.

## Orientação Estrutural Imediata

Até validação adicional, trate o repositório como três camadas:

### 1. Núcleo executável

- `web-data-viz/`
- páginas frontend e JS ativos usados em login e dashboards
- rotas, controllers, models e configuração de banco ativos no backend
- a superfície `public/bobIA.html` permanece na árvore executável, mas sua cópia
  standalone do projeto BobIA foi isolada de `public/`

Contexto importante da revisão:

- `web-data-viz` parece ter sido fornecido como base acadêmica de API/aplicação
  para uso dos alunos;
- isso ajuda a explicar módulos herdados de template, exemplos de apoio e
  remanescentes não específicos do domínio dentro do repositório;
- a revisão atual deve, portanto, separar o que o grupo Lumini realmente usou
  daquilo que veio pré-empacotado na base do projeto.

### 2. Apoio técnico e referência contextual

- `artefatos-banco/`
- `firmware-arduino/`
- diagramas e documentação que explicam o projeto

Dentro de `artefatos-banco/`, a interpretação atual é:

- candidato ativo: `sql-ativo/schema-ativo-lumini.sql`
- carga mockada de apoio: `sql-ativo/seed-ativo-lumini.sql`
- consultas de referência: `sql-ativo/consultas-referencia-lumini.sql`
- somente modelagem/apoio: `modelo-workbench-lumini.mwb`,
  `diagrama-er-lumini.drawio`

### 3. Material histórico, acadêmico, de template ou pendente de validação

- entregáveis de apresentação e sprint
- exemplos de apoio e remanescentes de template
- SQL legado e submódulos pouco claros
- `historico-academico/` como local explícito para materiais acadêmicos e
  históricos de raiz removidos do caminho operacional
- `web-data-viz/artefatos-template/` como local explícito para assets de apoio
  derivados de template que não pertencem ao caminho principal de runtime

## Próximas Ações Estruturais

Os próximos passos de baixo risco devem ser:

1. decidir se será feita uma passada somente de limpeza para artefatos
   não-runtime validados, como diretórios vazios na raiz e lockfiles órfãos;
2. decidir se rotas de template registradas, como `/avisos` e `/aquarios`, serão
   isoladas da superfície de registro executável;
3. manter os rótulos de banco explícitos e verificar se algum módulo backend
   restante ainda contradiz `schema-ativo-lumini.sql`;
4. isolar análise efêmera da documentação versionada do repositório;
5. manter o comportamento de runtime inalterado, salvo se uma etapa de limpeza
   for explicitamente aprovada.

Status atual da validação de runtime:

- o fluxo `/empresas` foi validado como fluxo do domínio Lumini parcialmente
  adaptado e estruturalmente frágil;
- os caminhos de criação de empresa/endereço se alinham a
  `schema-ativo-lumini.sql` em intenção, mas listagem, busca, validação e uma
  entrada de rota ainda contêm pressupostos quebrados ou da era do template;
- nenhum comportamento de runtime foi alterado durante estas passadas de
  classificação;
- o grupo de rotas `/avisos` foi validado como código legado derivado de
  template, registrado na aplicação, mas desalinhado de
  `schema-ativo-lumini.sql`.

Status atual de artefatos não-runtime:

- `dat-acqu-ino/` foi removido após validação como diretório vazio no nível
  raiz, sem papel de runtime identificado;
- o `package-lock.json` raiz foi validado como lockfile órfão sem `package.json`
  raiz correspondente nem entradas de pacote;
- o `package-lock.json` raiz permanece como candidato de limpeza, não entrada
  ativa de runtime.

Status atual da reorganização histórica:

- materiais acadêmicos e históricos no nível raiz foram agrupados em
  `historico-academico/` sem alterar caminhos de runtime da aplicação;
- diretórios internos históricos/de apoio foram renomeados para nomes mais
  claros e amigáveis ao shell, sem tocar no núcleo executável.

Status atual do isolamento de template:

- `web-data-viz/DOCUMENTOS_DE_APOIO/` foi isolado em
  `web-data-viz/artefatos-template/documentos-de-apoio/`
- `web-data-viz/public/BobIA/` foi isolado em
  `bobia-standalone/`
- a página ativa `public/bobIA.html` e seus assets frontend foram mantidos no
  lugar porque ainda pertencem à superfície visível de runtime
- esse isolamento é consistente com a interpretação de que `web-data-viz` veio
  de uma base acadêmica reutilizável, e não de um codebase exclusivo do Lumini

## Alinhamento com o Portfólio

Este repositório está sendo refinado dentro de uma estratégia mais ampla de
portfólio na qual Lumini serve como:

- piloto para leitura de repositório e recuperação estrutural;
- projeto para demonstrar refinamento, documentação e controle de escopo;
- candidato a uma versão derivada futura com origem clara em
  `ricardoOliveiraN/lumini.github.io`.

Portanto, a primeira condição de sucesso aqui não é expansão de funcionalidades.
É clareza:

- o que o projeto é;
- o que roda;
- o que é material de apoio;
- o que é legado;
- o que pode ser preservado, isolado, documentado ou reescrito com segurança
  mais tarde.
