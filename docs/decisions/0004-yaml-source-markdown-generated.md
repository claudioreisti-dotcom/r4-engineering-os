# ADR-0004: YAML is the Source of Truth; Markdown is Generated

## Status

Accepted

## Context

Documentação e dados conviviam em Markdown, gerando divergência (ex.: três listas de Specialists discordantes). Conhecimento estruturado precisa de uma forma canônica.

## Decision

A fonte de verdade do sistema é declarativa em **YAML**. Markdown é **derivado** de YAML, nunca o contrário. Conteúdo canônico jamais nasce em Markdown.

## Rationale

Uma única forma estruturada permite validação, derivação determinística e SSOT. Markdown autoral fica restrito ao que não é derivável (narrativa histórica, racional de ADR).

## Consequences

- Listas, índices e catálogos passam a ser Artifacts gerados.
- Um check de CI deve falhar se um Artifact estiver dessincronizado de sua fonte.
- Markdown autoral sobrevive apenas em `docs/genesis/` e na prosa de Decisions.
