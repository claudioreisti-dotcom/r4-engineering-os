# ADR-0016: Asset Spec — V1 Types

## Status

Accepted

## Context

A Ontology (ADR-0003) deixou o `spec` de cada tipo dormente (Grow on Demand). A V1 precisa
de pelo menos um conjunto mínimo de tipos totalmente especificados para provar a fundação
ponta a ponta.

## Decision

V1 ativa quatro tipos de KnowledgeAsset, com `spec` mínimo. Os demais (`workflow`, `plugin`,
`principle`, `decision`) permanecem dormentes.

Envelope universal (todos os tipos): `id`, `type`, `version`, `lifecycle`, `relations[]`, `spec`.

- **manifest** — `spec`: `identity{name,type,owner,governor}`, `kernel_version`, `governance{model,decision_authority}`. Relações: `references`.
- **specialist** — `spec`: `mission`, `responsibilities[]`, `quality_gates[]`. Relações: `owns`, `bound-to`.
- **capability** — `spec`: `purpose`, `inputs[]`, `outputs[]`, `completion_criteria[]`. Relações: `executed-by`, `realized-by`.
- **provider** — `spec`: `vendor`, `description`. Relações: `satisfies`.

As regras (campos obrigatórios e relações permitidas por tipo) são declaradas em
`kernel/ontology.yaml` — o Engine as lê; não as embute.

## Rationale

Quatro tipos cobrem o núcleo do modelo (identidade, quem, o quê, com o quê) e permitem
dogfooding real do próprio repositório.

## Consequences

- Adicionar campo a um `spec` é mudança aditiva, sob Grow on Demand.
- A forma é deliberadamente mínima; nada é congelado além do necessário para a V1.
