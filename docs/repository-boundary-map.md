# Lumini Repository Boundary Map

## Purpose

This document records the current executable scope and the main repository
boundaries identified during the initial structural recovery cycle of
`lumini.github.io`.

It exists to support low-risk refinement of the original repository before any
deeper correction or derivation work.

This project is being reviewed as a **portfolio refinement pilot**, not as a
primary Data Engineering showcase. The immediate goal is to make the repository
understandable, structurally safer to inspect, and ready for a later derived
version with explicit scope, provenance, and limitations.

## Review Intent

The current review follows these constraints:

- preserve the historical repository as reference;
- avoid deep refactoring in the first cycle;
- avoid deleting legacy material before classification;
- separate executable scope, support material, and historical artifacts;
- clarify what the system really runs before deciding what to archive, isolate,
  rewrite, or remove.

## Current Operational Center

The current operational center of the repository is:

- `web-data-viz/`

Evidence:

- contains `package.json` and `app.js`;
- contains `public/` and `src/`;
- exposes backend routes and serves frontend assets;
- contains the only clear application entrypoint currently identified.

## Confirmed Runtime Surface

### Backend entrypoint

- `web-data-viz/app.js`

### Active route groups confirmed in the current flow

- `/usuarios`
- `/medidas`
- `/dashFunc`
- `/funcionarios`
- `/empresas` (partially aligned, still needs structural review)

### Frontend flow confirmed in the current flow

- `web-data-viz/public/index.html`
- `web-data-viz/public/TelaLogin.html`
- `web-data-viz/public/TelaDash-Geral.html`
- `web-data-viz/public/TelaDash-Talhao.html`
- `web-data-viz/public/TelaDash-Sensor.html`

### Session and navigation behavior

The frontend currently uses `sessionStorage` to propagate runtime state such as:

- logged user;
- company id;
- user type;
- selected `talhao`;
- selected `sensor`.

This confirms that the runtime is not just a static prototype. There is an
actual web application flow coupling frontend pages to backend endpoints.

## Active Domain Surface Identified So Far

The currently active domain surface appears to be centered on:

- `empresa`
- `usuario`
- `talhao`
- `sensor`
- `dadosSensor`
- `filtragemDados`

Evidence:

- current dashboards use `/medidas/*` endpoints tied to `talhao`, `sensor`,
  `dadosSensor`, and `filtragemDados`;
- authentication and session behavior use `usuario` and `empresa`;
- aggregate dashboards use `/dashFunc/*` against `empresa`, `usuario`,
  `sensor`, and related data.

## Active Database Candidate

The current database source most aligned with the runtime is:

- `Script Banco de dados/BancoLumini.sql`

Why this is the leading candidate:

- its entities match the runtime domain already confirmed in the backend and
  frontend flow;
- it aligns with `empresa`, `usuario`, `talhao`, `sensor`, `dadosSensor`, and
  `filtragemDados`.

Operational labeling in this branch:

- `BancoLumini.sql` should currently be treated as the active database
  candidate for the application runtime;
- this is a structural label for review purposes, not yet a claim that every
  backend module is fully aligned with it.

## Known Database Ambiguity

The repository still contains competing or legacy SQL sources:

- `web-data-viz/src/database/script-tabelas.sql`
- `Script Banco de dados/BancoLegado.sql`
- `Script Banco de dados/ModelagemLuminiV2.mwb`
- `Script Banco de dados/ModelagemLuminiV2.mwb.bak`

Current interpretation:

- `BancoLumini.sql` is the leading operational candidate;
- `script-tabelas.sql` appears to be inherited from the original academic
  template and references another domain;
- `BancoLegado.sql` is historical/legacy until proven otherwise;
- the `.mwb` files are modeling/support artifacts, not runtime inputs.

Current low-risk repository action:

- keep all SQL and modeling files in place;
- label `BancoLumini.sql` as active candidate;
- label `BancoLegado.sql` as legacy/historical reference;
- postpone any file move or rename until runtime safety is clearer.

## Firmware and Hardware Boundary

Relevant hardware-related material currently identified:

- `Arduino/codigo-ldr/codigoArduino.ino`
- `Arduino/Relatório Técnico - Sensor de Luminosidade LDR - Grupo 08.pdf`
- `Arduino/Arquitetura de montagem do Sensor Arduino.png`

Current interpretation:

- the Arduino code is relevant as technical context for sensor capture;
- the hardware materials are not yet confirmed as part of a live ingest path in
  the current runtime;
- they should be preserved during the first structural cycle.

## Historical, Academic, and Support Material

The repository root currently mixes executable and non-executable material.

Material currently isolated as historical, academic, or support context:

- `historico-academico/Apresentação/`
- `historico-academico/Documentação/`
- `historico-academico/Diagrama de solução/`
- `historico-academico/Diagrama de visão de negócio/`
- `historico-academico/Fluxograma/`
- `historico-academico/GMUD.docx`

These items may contain useful context, but they are not currently the primary
source of truth for runtime behavior.

## Template-Derived or Legacy-Suspect Areas

The following areas show strong signs of inherited template code, support-only
material, or parallel examples:

- `web-data-viz/src/routes/aquarios.js`
- `web-data-viz/src/models/aquarioModel.js`
- `web-data-viz/src/database/script-tabelas.sql`
- `web-data-viz/README.md`
- `web-data-viz/DOCUMENTOS_DE_APOIO/`
- `web-data-viz/public/BobIA/`

These areas should not be removed in the initial cycle. They should first be
classified, validated, and, when appropriate, isolated from the operational
surface.

## Ambiguous Items Pending Validation

The following items still need explicit classification before structural moves:

- `dat-acqu-ino/`
- `web-data-viz/public/BobIA/`
- `web-data-viz/DOCUMENTOS_DE_APOIO/`
- `src/routes/avisos.js` and related modules
- partial `empresas` flow
- root `package-lock.json`

## What Is In Scope For The Initial Structural Recovery

- confirm how the system runs today;
- confirm which runtime surface is actually used;
- identify the database source most compatible with the runtime;
- separate executable scope from support and historical material;
- label legacy or template-derived modules without changing behavior;
- prepare the repository for a later derived version with explicit portfolio
  framing.

## What Is Out Of Scope For This First Cycle

- large-scale business logic rewrites;
- deep architectural refactoring;
- aggressive deletion of old material;
- invented complexity to make the project look more advanced;
- changing the project identity before the real scope is fully confirmed.

## Immediate Structural Guidance

Until further validation, treat the repository as three layers:

### 1. Executable core

- `web-data-viz/`
- active frontend pages and JS used in login and dashboards
- active backend routes, controllers, models, and DB config

### 2. Technical support and contextual reference

- `Script Banco de dados/`
- `Arduino/`
- diagrams and documentation that explain the project

Within `Script Banco de dados/`, the current interpretation is:

- active candidate: `BancoLumini.sql`
- historical/legacy SQL: `BancoLegado.sql`
- modeling/support only: `ModelagemLuminiV2.mwb`,
  `ModelagemLuminiV2.mwb.bak`

### 3. Historical, academic, template, or pending-validation material

- presentation and sprint deliverables
- support examples and template remnants
- legacy SQL and unclear submodules
- `historico-academico/` as the explicit home for root-level academic and
  historical materials removed from the operational path

## Next Structural Actions

The next low-risk steps should be:

1. keep confirming the operational surface without changing runtime behavior;
2. keep database labels explicit and check whether any backend module still
   contradicts `BancoLumini.sql`;
3. isolate ephemeral analysis from versioned repository documentation;
4. reorganize historical academic material outside the operational path;
5. isolate template-derived modules pending final validation.

Current status of step 4:

- root-level academic and historical materials were grouped under
  `historico-academico/` without changing application runtime paths.

## Portfolio Alignment

This repository is being refined under a broader portfolio strategy in which
Lumini serves as:

- a pilot for repository reading and structural recovery;
- a project to demonstrate refinement, documentation, and scope control;
- a candidate for a later derived repository with clear provenance to
  `ricardoOliveiraN/lumini.github.io`.

Therefore, the first success condition here is not feature expansion. It is
clarity:

- what the project is;
- what runs;
- what is support material;
- what is legacy;
- what can be safely preserved, isolated, documented, or later rewritten.
