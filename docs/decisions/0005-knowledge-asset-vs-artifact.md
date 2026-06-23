# ADR-0005: KnowledgeAsset vs Artifact

## Status

Accepted

## Context

"Knowledge Asset" e "Artifact" eram quase sinônimos e seriam confundidos para sempre. A distinção precisa ser a espinha do sistema.

## Decision

- **KnowledgeAsset** = fonte canônica, autorada, versionada (YAML).
- **Artifact** = saída derivada, gerada, nunca editada à mão, reprodutível (Markdown, índices, JSON Schema, páginas de portal).

## Rationale

Essa dualidade materializa "YAML First / Generated Documentation": tudo canônico é Asset; tudo gerado é Artifact.

## Consequences

- Nenhum Artifact é fonte de outro Asset.
- Editar um Artifact à mão é proibido (será sobrescrito na geração).
- Todo Artifact tem ao menos um Asset de origem rastreável.
