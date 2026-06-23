# R4 Engineering OS

R4 Engineering OS (R4 EOS) é uma plataforma de governança de engenharia para times AI-Driven e Human-Governed.

Ele define como projetos de software da R4 devem organizar conhecimento, papéis, especialistas, capacidades, decisões e execução.

## Why it exists

O R4 EOS nasceu de uma necessidade prática: reduzir a dependência de uma ferramenta específica de IA durante o desenvolvimento.

A descoberta principal foi maior que o problema inicial: o verdadeiro risco não era a indisponibilidade de um modelo, mas sim manter conhecimento estratégico preso em pessoas, chats, prompts e ferramentas.

## Core idea

> A engenharia moderna será executada por especialistas de IA, mas governada por humanos.

## Repository map

- `FOUNDATION.md` — princípios fundadores.
- `manifest.yaml` — declaração canônica deste projeto (referencia, não redefine).
- `AGENTS.md` — ponto de entrada para especialistas de IA.
- `.governance/` — papéis, processo decisório, princípios permanentes.
- `.missions/` — missões versionadas (memória do projeto).
- `kernel/` — Kernel legível por máquina (`meta-model.yaml`, `ontology.yaml`).
- `knowledge/` — conhecimento canônico em YAML (specialists, capabilities, providers).
- `generated/` — artefatos derivados (gerados pelo Engine; não editar à mão).
- `packages/engine/` — Knowledge Engine (valida o conhecimento e gera os derivados).
- `docs/kernel/` — especificação do Kernel; `docs/decisions/` — ADRs; `docs/genesis/` — origem.
- `templates/`, `plugins/`, `examples/` — templates, extensões futuras e exemplos.

## Knowledge Engine

```bash
cd packages/engine && npm install
npm run validate   # valida o conhecimento
npm run generate   # regenera os artefatos derivados
```

## Status

V1 — Kernel especificado e Knowledge Engine funcional, dogfooded no próprio repositório.
