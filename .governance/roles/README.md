# Roles

> Permanente. Um documento por papel. Papéis são estáveis; quem (ou qual Provider) os ocupa é substituível.

O R4 EOS adota **papéis sobre ferramentas**: a workforce é definida por papéis, executados por Providers substituíveis. "Claude faz X" passa a ser "o Architecture Specialist faz X usando Claude".

## Papéis

| Papel | Documento |
|---|---|
| Human Governor | [`human-governor.md`](human-governor.md) |
| Architecture Specialist | [`architecture-specialist.md`](architecture-specialist.md) |
| Implementation Specialist | [`implementation-specialist.md`](implementation-specialist.md) |
| Reviewer Specialist | [`reviewer-specialist.md`](reviewer-specialist.md) |

## Matriz de autoridade

| Ação | Governor | Architecture Specialist | Implementation Specialist | Reviewer Specialist |
|---|:---:|:---:|:---:|:---:|
| Criar Mission | ✅ | — | — | — |
| Produzir entrega (spec / ADR / código / PR) | pode | ✅ | ✅ | — |
| Revisar PR | pode | — | — | ✅ |
| Aprovar e fazer merge | ✅ | — | — | — |
| Alterar `FOUNDATION.md` / `.governance/` / Principles | ✅ | propõe | propõe | propõe |
| Questionar e recusar acoplamento | ✅ | ✅ | ✅ | ✅ |

Regra de independência: quem revisa um PR nunca é quem o produziu (ver [`../review-and-approval.md`](../review-and-approval.md)).

## Workforce (futura)

Demais Specialists (Backend, Frontend, QA, Documentation, Knowledge, Security, DevOps…) entram conforme houver necessidade real (Grow on Demand), cada um com seu documento nesta pasta. Esta governança vale para todos.

## Princípio de autoridade

Humanos governam. IA executa. Nenhum Provider é fonte de verdade. O papel sobrevive à troca de ferramenta.
