# ADR-0007: Kernel Composition and Boundaries

## Status

Accepted

## Context

O Kernel original listava 5 componentes, dois dos quais (Runtime, Plugin Manager) eram engines especulativos. "Small Kernel" precisa de uma fronteira explícita e testável.

## Decision

O Kernel é composto por: **Meta-Model, Ontology, Governance Rules/Constraints, Manifest Model, Versioning Policy** — tudo declarativo, sem comportamento.

Nunca pertencem ao Kernel: Providers, Plugins, conteúdo de Specialists/Capabilities, runtime/orquestrador, Knowledge Engine, CLI/VS Code/Portal, documentação derivada, regras de domínio, segredos.

## Rationale

Manter no Kernel apenas definições estáveis e duráveis. Tudo que executa, varia ou deriva fica fora.

## Consequences

- Crescer o Kernel exige ADR e passar no "teste de fronteira" (`docs/kernel/04-kernel-boundaries.md`).
- Runtime e Plugin Manager saem do escopo de Kernel definitivamente.
