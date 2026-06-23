# ADR-0002: Protocol over Program

## Status

Accepted

## Context

O vocabulário "OS / Kernel / Runtime" sugere um programa executável. Construir um runtime/orquestrador bespoke seria, ironicamente, o maior lock-in e o maior passivo de manutenção em 10 anos — contradizendo a tese de independência de ferramenta.

## Decision

O R4 EOS é um **protocolo**: um conjunto de definições declarativas versionadas em Git. Não se constrói runtime distribuído, orquestrador de agentes nem engine de IA bespoke. O "runtime" efetivo é o agente de IA + Git + CI.

## Rationale

Texto plano + Git sobrevivem 10 anos; um orquestrador de 2026 não. O durável é a definição, não a execução.

## Consequences

- Runtime e Plugin Manager são removidos do escopo como componentes de código.
- Ferramentas de suporte (ex.: Knowledge Engine) são permitidas, mas substituíveis e fora do Kernel (ADR-0009).
- O roadmap prioriza especificação declarativa antes de qualquer código.
