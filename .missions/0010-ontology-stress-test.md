---
mission: "0010"
title: Ontology Stress Test
status: delivered
governor: Claudio
specialist: Architecture Specialist (Claude)
reviewer: waived (delegação explícita do Governor)
---

# Mission 0010 — Ontology Stress Test

## Status

Approved → Delivered

## Context

Antes de aprovar o bootstrap do DOK1, o Governor exigiu validar que a ontologia generaliza:
sobreviver a cinco projetos radicalmente diferentes, sem mudanças, ganha o direito de
governar o DOK1.

## Mission

Modelar 5 arquétipos distantes do DOK1 usando apenas os 7 tipos ativos e validá-los.
Critério honesto: se algum exigir mudança de ontologia, o teste falha e a lacuna é reportada.

## Projetos (em `examples/stress/`)

`rust-cli` (CLI Rust, sem infra) · `flutter-mobile` (app + push) · `ml-pipeline`
(jobs + data-warehouse + scheduler) · `embedded-firmware` (RTOS + periférico de hardware) ·
`solidity-dapp` (contratos + RPC de blockchain).

## Resultado

- **Ontologia: SOBREVIVEU — zero mudanças.** Os 5 validaram (4–5 assets cada, 0 erros),
  com kinds diversos de `component` (binary, app, batch-job, firmware-module, smart-contracts)
  e `resource` (push, data-warehouse, scheduler, hardware-peripheral, blockchain-rpc-node).
- **Finding (robustez do Engine, não ontologia):** o Engine estourava com exceção em YAML
  malformado; endurecido para reportar "YAML inválido" como erro de validação.
- Suite: 23/23 testes (inclui `stress.integration` e tratamento de YAML inválido).

## Conclusão

A ontologia v1.1 generaliza para arquétipos muito além do DOK1. Bootstrap do DOK1 desbloqueado.

## Outcome

Entregue como Pull Request da branch `mission/0010-ontology-stress-test`. DOK1 não tocado.
