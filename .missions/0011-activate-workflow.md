---
mission: "0011"
title: Activate Workflow
status: delivered
governor: Claudio
specialist: Architecture Specialist (Claude)
reviewer: waived (delegação explícita do Governor)
---

# Mission 0011 — Activate Workflow

## Status

ADR-0021 aprovado pelo Governor (Alternativa B) → Delivered

## Context

O piloto suporte-r4 revelou um workflow explícito (`analyze → review → gate humano →
execute`). O ADR-0021 aprovou ativar `workflow` como conceito de primeira classe,
estritamente descritivo, sem semântica de execução.

## Mission

Ativar `workflow` na ontologia (aditivo), atualizar para Kernel 1.2.0, testar e dogfood.

## Deliverables

- ADR-0021 (Accepted).
- `kernel/ontology.yaml`: `workflow` dormant→active (`required_spec: [steps]`,
  `allowed_relations: [realizes, references]`); ontologia 1.2.0.
- `docs/kernel/01-ontology.md` atualizado; `CHANGELOG.md` (Kernel 1.2.0).
- Dogfood: `workflow/eos-governed-change` (architecture-review → gate humano); manifest pina 1.2.0.
- Testes do Engine para o novo tipo (sem mudança de código — design data-driven).

## Constraints honradas

Estritamente descritivo; sem execução, sem controle de fluxo; meta-modelo inalterado;
o Engine não executa workflows. Consistência `spec.steps`↔`references` = follow-up.

## Outcome

Entregue como Pull Request da branch `mission/0011-activate-workflow`. Desbloqueia o
bootstrap do suporte-r4 com o pipeline modelado como workflow + gate humano explícito.
