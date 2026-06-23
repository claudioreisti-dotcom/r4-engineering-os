# ADR-0013: Governance and Mission Process

## Status

Accepted

## Context

O desenvolvimento ocorria como "humano → prompt → resposta", sem trilha versionada nem revisão independente. Isso contradiz SSOT e a governança humana.

## Decision

Adotar um processo governado por Git:

```
Human Governor → Mission → Architecture Specialist → Pull Request → Architecture Review → Merge
```

- Missões vivem em `.missions/NNNN-*.md` (versionadas, com status).
- Governança permanente vive em `.governance/` (roles, decision-process, architecture-principles, definition-of-done).
- O Provider que revisa não pode ser o que produziu o PR.
- Decisões estruturais exigem ADR (critérios em `.governance/decision-process.md`).

## Rationale

Torna o próprio desenvolvimento do EOS governado pelo EOS (dogfooding real desde o dia um) e elimina conhecimento preso em chat.

## Consequences

- Nada estratégico permanece em conversa.
- Toda Sprint deixa trilha auditável (Mission + PR + Review + ADRs).
