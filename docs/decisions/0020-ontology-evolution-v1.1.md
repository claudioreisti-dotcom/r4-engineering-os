# ADR-0020: Ontology Evolution v1.1 (component, resource, principle)

## Status

Accepted

## Context

A Mission 0007/0008 (DOK1) mostrou que a ontologia não representava elementos reais de um
projeto: **módulos** (apps/packages), **infraestrutura** (Postgres/Redis/S3) e **princípios**
(regras invioláveis). Sem isso, adotar o DOK1 seria uma exceção arquitetural.

## Decision

Adicionar/ativar três tipos de KnowledgeAsset (ADR-0006), de forma **aditiva**:

- **component** — módulo, app, serviço ou package. `required_spec: [purpose, kind]`;
  `allowed_relations: [requires, references]`.
- **resource** — recurso de infraestrutura (db, cache, fila, storage). `required_spec: [kind]`;
  `allowed_relations: [requires]`.
- **principle** — invariante de produto/arquitetura (ativado de dormente). `required_spec: [statement]`.

O **meta-modelo permanece inalterado**: nenhum primitivo novo, nenhum verbo de relação novo
(reusa `requires`, `references`, `supersedes`). O Engine não muda — lê as regras de
`kernel/ontology.yaml` (design data-driven).

## Versionamento

Mudança **aditiva e não-quebrável** → Kernel **1.1.0** (SemVer minor, ADR-0012). Projetos
em 1.0.0 continuam válidos.

## Rationale

Pequeno e sob demanda: ativados apenas os três tipos exigidos pela realidade do DOK1.
`plugin`, `workflow` e `decision` seguem dormentes até haver uso real.

## Consequences

- O DOK1 (e qualquer projeto) pode ser representado com módulos, infraestrutura e princípios.
- O EOS passa a modelar `component/engine` (dogfooding).
- A futura adoção do DOK1 deixa de exigir exceções na ontologia.
