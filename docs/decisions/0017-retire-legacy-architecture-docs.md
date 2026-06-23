# ADR-0017: Retire Legacy Conceptual Docs

## Status

Accepted

## Context

`docs/architecture/` continha os documentos conceituais iniciais. A partir da Mission 0003,
o Kernel passou a ser especificado em `docs/kernel/` (mais rigoroso) e a governança em
`.governance/`. Manter os dois conjuntos viola SSOT e cria documentação órfã/contraditória.

## Decision

Aposentar `docs/architecture/`. Mapeamento de superação:

| Legado | Substituído por |
|---|---|
| `core-model.md` | `docs/kernel/01-ontology.md` + `kernel/ontology.yaml` |
| `runtime.md` | `docs/kernel/04-kernel-boundaries.md` + ADR-0002, ADR-0009 |
| `plugin-system.md` | `docs/kernel/04-kernel-boundaries.md` + ADR-0008 |
| `workforce.md` | `.governance/roles/` + `knowledge/specialists/` |
| `knowledge-architecture.md` | `docs/kernel/00-meta-model.md` (KnowledgeAsset + lifecycle) |

## Consequences

- O modelo conceitual passa a ter uma única fonte por assunto.
- A taxonomia de "knowledge classes" do doc antigo é retirada por desuso; pode ser
  reintroduzida como doc de Kernel se houver necessidade real (Grow on Demand).
