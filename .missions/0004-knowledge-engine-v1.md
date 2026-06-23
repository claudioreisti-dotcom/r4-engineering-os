---
mission: "0004"
title: Knowledge Engine V1
status: delivered
governor: Claudio
specialist: Architecture Specialist (Claude)
reviewer: Architecture Review (ChatGPT)
---

# Mission 0004 — Knowledge Engine V1

## Status

Approved (autonomia concedida) → Delivered

## Context

Fundação conceitual e governança estão em `main`. É hora da primeira fatia vertical real
que prova o protocolo ponta a ponta.

## Mission

Construir a V1 do R4 EOS: o Knowledge Engine mínimo que interpreta o conhecimento
declarativo em YAML, valida contra o Kernel, resolve referências e gera os artefatos
derivados — dogfooded no próprio repositório.

## Deliverables

- ADR-0015 (stack) e ADR-0016 (asset spec V1).
- `kernel/meta-model.yaml`, `kernel/ontology.yaml` — Kernel legível por máquina.
- `packages/engine` — Knowledge Engine (load → validate → resolve → generate) + CLI + testes.
- `knowledge/` — assets reais (specialists, capabilities, providers) + `manifest.yaml` do repo.
- `generated/` — artefatos derivados (catálogos), verificados em CI.
- `.github/workflows/ci.yml` — valida + checa derivados + roda testes.

## Constraints

Engine determinístico, sem estado, sem IA, sem rede (ADR-0009). Dependência mínima (ADR-0015).
Tipos dormentes permanecem dormentes (ADR-0016).

## Quality Criteria

`r4 validate` passa sobre o conhecimento do repo; `r4 generate --check` confirma derivados
em sincronia; testes verdes. A V1 é avaliada pelo Governor para ajustes.

## Outcome

Entregue como Pull Request da branch `mission/0004-knowledge-engine-v1`.
