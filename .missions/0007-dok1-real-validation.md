---
mission: "0007"
title: Validate R4 EOS against the real DOK1
status: delivered
governor: Claudio
specialist: Architecture Specialist (Claude)
reviewer: waived (delegação explícita do Governor)
---

# Mission 0007 — Validate against the real DOK1

## Status

Approved (autonomia) → Delivered

## Context

O Governor colocou uma cópia local do DOK1 real em `examples/dok1` (não versionada) para
validar o R4 EOS contra um projeto de verdade. Regra: adaptar o Engine se preciso; nunca
adaptar o DOK1.

## Mission

Validar o R4 EOS contra o DOK1 real e registrar honestamente o resultado.

## Resultado

- **Achado:** o DOK1 real não possui conhecimento no formato R4 EOS (sua verdade está em
  Markdown/`.specs`). O Engine não pode governá-lo sem um bootstrap. Ver journal 0001.
- **Correção de Engine (genérica, não específica do DOK1):** projeto deve declarar um
  manifest (ADR-0018). Eliminado o falso positivo em diretórios vazios.
- **Higiene de repositório:** removida a fabricação sintética antiga de `examples/dok1`;
  `examples/dok1/` reservado e gitignored como slot do DOK1 real; teste de integração
  reescrito para usar um projeto temporário (sem depender de pasta commitada).

## Constraints honradas

DOK1 não foi alterado nem versionado. Nenhuma adaptação específica do DOK1 no Engine.

## Outcome

Entregue como Pull Request da branch `mission/0007-dok1-real-validation`.
