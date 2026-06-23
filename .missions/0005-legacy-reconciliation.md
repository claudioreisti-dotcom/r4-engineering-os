---
mission: "0005"
title: Legacy Reconciliation
status: delivered
governor: Claudio
specialist: Architecture Specialist (Claude)
reviewer: waived (delegação explícita do Governor)
---

# Mission 0005 — Legacy Reconciliation

## Status

Approved (autonomia) → Delivered

## Context

Após a V1 do Engine, restavam documentos conceituais legados em `docs/architecture/`
superados por `docs/kernel/`, `.governance/` e ADRs — violando SSOT.

## Mission

Reconciliar o repositório a uma única fonte por assunto.

## Deliverables

- Remoção de `docs/architecture/*` (ADR-0017 com mapeamento de superação).
- `docs/README.md` e `docs/backlog/roadmap.md` atualizados à realidade arquitetural.

## Constraints

Não tocar em `docs/genesis/` (narrativa histórica). Não alterar o Kernel nem o Engine.

## Outcome

Entregue como Pull Request da branch `mission/0005-legacy-reconciliation`.
