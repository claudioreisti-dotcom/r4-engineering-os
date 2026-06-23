---
mission: "0006"
title: Multi-project Support + DOK1 Reference
status: delivered
governor: Claudio
specialist: Architecture Specialist (Claude)
reviewer: waived (delegação explícita do Governor)
---

# Mission 0006 — Multi-project Support + DOK1 Reference

## Status

Approved (autonomia) → Delivered

## Context

A V1 precisa provar o valor central do produto: um projeto downstream governado pelo
mesmo Kernel, validando o critério de sucesso do FOUNDATION (DOK1/iVet/IAReis reusam a base).

## Mission

Provar reuso do Kernel por um projeto externo.

## Deliverables

- Engine: `runForProject(eosRoot, projectRoot)` + CLI `validate --project <dir>`.
- `examples/dok1/` — projeto downstream real (formato novo): manifest próprio (pina kernel 1.0.0),
  knowledge próprio (2 specialists, 2 capabilities, 2 providers), contexto de saúde e compliance.
- Teste de integração (EOS + DOK1) e passo de CI validando o DOK1.

## Resultado

- EOS valida (12 assets), DOK1 valida reusando o Kernel (7 assets), 0 erros.
- Critério de sucesso do produto demonstrado na prática.

## Nota

Em produção, DOK1 é um repositório próprio (ADR-0014). Aqui vive em `examples/` só para a
demonstração da V1. Compartilhar providers entre projetos (via plugin/biblioteca) é refino pós-V1.

## Outcome

Entregue como Pull Request da branch `mission/0006-multiproject-dok1`.
