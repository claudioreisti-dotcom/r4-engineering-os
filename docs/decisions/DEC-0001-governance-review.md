# DEC-0001 — Governance Review

## Status

Approved with Changes

## Scope

PR #2 — Governance Bootstrap

## Decision

A proposta de governança foi aprovada.

Antes do merge deverão ser realizados os seguintes ajustes.

### DEC-1

Substituir `roles.md` por uma estrutura contendo um documento por papel.

Exemplo:

```
governance/
    roles/
        human-governor.md
        architecture-specialist.md
        implementation-specialist.md
        reviewer-specialist.md
```

### DEC-2

Adicionar um documento descrevendo o processo de escalonamento de decisões quando houver divergência entre Specialists ou Providers.

### DEC-3

Após o merge desta PR, rebasear a PR anterior removendo qualquer duplicação relacionada à governança.

A Mission 0002.5 passa a ser a única fonte canônica para esse domínio.

## Constraints

* Não alterar a arquitetura.
* Não adicionar novas responsabilidades.
* Não antecipar decisões da Mission 0003.
