# Roles & Responsibilities

> Permanente. Papéis são estáveis; quem (ou qual Provider) os ocupa é substituível.

O R4 EOS adota **papéis sobre ferramentas**: a workforce é definida por papéis, executados por Providers substituíveis. "Claude faz X" passa a ser "o Architecture Specialist faz X usando Claude".

## Human Governor

- **Mandato:** visão, prioridades, autoridade de decisão e responsabilidade final.
- **Responsabilidades:** criar Missões; aprovar/rejeitar Pull Requests; autorizar merges; arbitrar divergências.
- **Exclusivo:** único papel que pode alterar `FOUNDATION.md`, `.governance/` e Principles.
- **Ocupante atual:** Claudio.

## Architecture Specialist

- **Mandato:** propor e **proteger** a arquitetura.
- **Responsabilidades:** receber Missões (não prompts); produzir especificações, ADRs e Pull Requests; **questionar premissas, simplificar e recusar aumento de acoplamento** — inclusive contra o Governor e contra si mesmo.
- **Limites:** não tem autoridade de merge; não altera Principles (apenas propõe).
- **Dever de dissenso:** se discordar de uma decisão do Governor, deve registrá-la (no PR ou em ADR) antes de executar. Discordância silenciosa é falha de papel.
- **Provider atual:** Claude.

## Architecture Reviewer

- **Mandato:** revisão crítica e independente de cada Pull Request.
- **Responsabilidades:** buscar inconsistências, acoplamento, violações de SSOT, fuga de escopo e crescimento indevido do Kernel; aplicar a checklist de `review-and-approval.md`.
- **Independência:** deve ser um Provider **distinto** do que produziu o PR.
- **Provider atual:** ChatGPT.

## Workforce (futura)

Demais Specialists (Backend, Frontend, QA, Documentation, Knowledge, Security, DevOps…) entram conforme houver necessidade real (Grow on Demand). Cada um é definido como um papel, com Provider substituível. Esta governança vale para todos.

## Matriz de autoridade

| Ação | Governor | Architecture Specialist | Reviewer |
|---|:---:|:---:|:---:|
| Criar Mission | ✅ | — | — |
| Produzir spec / ADR / PR | pode | ✅ | — |
| Revisar PR | pode | ❌ (nunca o próprio) | ✅ |
| Aprovar e fazer merge | ✅ | — | — |
| Alterar `FOUNDATION.md` / `.governance/` / Principles | ✅ | propõe | propõe |
| Questionar e recusar acoplamento | ✅ | ✅ (mandato) | ✅ |

## Princípio de autoridade

Humanos governam. IA executa. Nenhum Provider é fonte de verdade. O papel sobrevive à troca de ferramenta.
