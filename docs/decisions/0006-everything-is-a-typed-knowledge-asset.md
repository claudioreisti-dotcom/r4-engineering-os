# ADR-0006: Everything Canonical is a Typed KnowledgeAsset

## Status

Accepted

## Context

Tratar Specialist, Capability, Provider, Plugin, Workflow, Decision e Manifest como entidades soltas exigiria mecanismo próprio por entidade (parsing, validação, CLI, portal).

## Decision

Todo conceito canônico é um **tipo** de KnowledgeAsset, compartilhando o mesmo envelope (`id`, `type`, `version`, `lifecycle`, `relations`, `spec`). Só `spec` varia por tipo.

## Rationale

Um mecanismo, N tipos. CLI, Portal, validação e derivação operam genericamente sobre "Knowledge Assets tipados" — é o que faz as surfaces emergirem naturalmente.

## Consequences

- Adicionar uma entidade = adicionar um `type` à Ontology (com ADR), não um subsistema novo.
- Ferramentas nunca precisam de código especial por entidade.
- `Artifact` é a única exceção: é derivado, não canônico.
