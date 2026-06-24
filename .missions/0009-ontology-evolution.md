---
mission: "0009"
title: Ontology Evolution
status: delivered
governor: Claudio
specialist: Architecture Specialist (Claude)
reviewer: waived (delegação explícita do Governor)
---

# Mission 0009 — Ontology Evolution

## Status

Approved (Governor escolheu tratar as lacunas de ontologia antes do bootstrap) → Delivered

## Context

A validação do DOK1 (Missions 0007/0008) expôs lacunas: a ontologia não representava
módulos, infraestrutura nem princípios. Tratá-las antes do bootstrap evita que o DOK1
vire exceção arquitetural.

## Mission

Evoluir a ontologia, de forma mínima e aditiva, para representar projetos reais.

## Deliverables

- `kernel/ontology.yaml` — ativa `component`, `resource`, `principle` (v1.1.0).
- ADR-0020 + `CHANGELOG.md` (Kernel 1.1.0). Meta-modelo inalterado.
- `docs/kernel/01-ontology.md` atualizado.
- Dogfood: `component/engine`; manifest pina kernel 1.1.0.
- Testes do Engine para os novos tipos (sem mudança de código — design data-driven).

## Constraints

Sem novos primitivos nem verbos (meta-modelo estável). Tipos sob demanda (plugin/workflow/
decision seguem dormentes). DOK1 não tocado.

## Outcome

Entregue como Pull Request da branch `mission/0009-ontology-evolution`. Desbloqueia uma
futura adoção do DOK1 sem exceções de ontologia.
