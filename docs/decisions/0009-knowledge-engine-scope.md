# ADR-0009: Knowledge Engine Scope and Non-Goals

## Status

Accepted

## Context

Há risco de o "Knowledge Engine" virar um orquestrador complexo, executar IA ou competir com CI. Sua fronteira precisa ser congelada antes de qualquer código.

## Decision

O Knowledge Engine é uma **função pura, determinística e sem estado** sobre o grafo de Assets, com exatamente cinco responsabilidades: **Load/Parse, Validate, Resolve, Apply Constraints, Derive (Artifacts)**.

Ele é ferramenta de suporte — **fora do Kernel** — e substituível.

## Non-Goals

- Não chama IA nem executa Providers.
- Não orquestra tarefas, não agenda, não tem estado entre execuções.
- Não substitui GitHub Actions (o CI *invoca* o Engine).
- Não acessa rede nem segredos. Não tem regra de domínio.

## Consequences

- O Engine pode ser reescrito ou trocado sem tocar no Kernel.
- Determinismo é requisito: mesma entrada → mesma saída.
