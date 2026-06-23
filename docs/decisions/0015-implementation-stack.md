# ADR-0015: Implementation Stack (V1)

## Status

Accepted

## Context

A implementação do Knowledge Engine e do tooling precisa de uma stack. Os
`implementation-principles` exigem: menor dependência possível, determinismo,
reprodutibilidade e durabilidade de longo prazo. As superfícies futuras previstas
(CLI, VS Code Extension, Documentation Portal) vivem no ecossistema JS/TS.

## Decision

- **Linguagem:** TypeScript, executado em **Node.js** (≥ 22; type-stripping nativo,
  sem passo de build para rodar).
- **Dependência de runtime:** apenas `yaml` (parser determinístico, pure-JS).
- **Testes:** runner nativo `node:test` (zero dependência).
- **Type-check:** `typescript` como devDependency.
- **Monorepo:** código em `packages/`; o Knowledge Engine é `packages/engine`.

## Rationale

Uma única linguagem cobre engine + CLI + extensão + portal, evitando fragmentação.
Dependências mínimas reduzem o passivo de 10 anos. O Engine permanece **fora do Kernel**
e substituível (ADR-0009): trocar a stack não toca no conhecimento em YAML.

## Consequences

- O conhecimento (YAML) não depende da stack; só o tooling depende.
- Sem framework pesado, sem dependência de schema externa em V1 (validação escrita à mão
  sobre a Ontology declarada em `kernel/`).
- CI executa o Engine via Node.
