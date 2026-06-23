# Decision Process

> Permanente. Define como decisões são tomadas e quando viram ADR.

## Fluxo geral

```
Human Governor
      │  cria
      ▼
  Mission  (.missions/NNNN-*.md)
      │  atribuída a
      ▼
Architecture Specialist
      │  produz
      ▼
  Pull Request
      │  avaliado por
      ▼
Architecture Review  (Provider distinto do autor)
      │  aprovado por
      ▼
Human Governor → Merge
```

O detalhamento da revisão e dos gates está em [`review-and-approval.md`](review-and-approval.md). O ciclo da Missão está em [`mission-lifecycle.md`](mission-lifecycle.md).

Regra raiz: **nenhuma decisão estratégica permanece apenas em chat.** Toda decisão relevante vira commit (Mission, ADR ou asset).

## Quando uma Decision (ADR) é obrigatória

Exige ADR qualquer decisão que:

1. Altere princípios permanentes (arquitetura, documentação, implementação).
2. Altere papéis, fluxo de governança ou critérios de aprovação.
3. Crie, remova ou redefina um conceito estrutural do produto.
4. Mude política de versionamento ou compatibilidade.
5. Introduza uma dependência externa relevante.

Decisões puramente operacionais (conteúdo de uma entrega, redação) **não** exigem ADR.

## Ciclo de vida de um ADR

```
proposed → accepted → (deprecated | superseded)
```

- Um ADR `accepted` é vinculante até ser `superseded` por outro ADR aprovado.
- Superar um ADR exige referência explícita ao anterior.

## Mudança de Principles

Princípios (`FOUNDATION.md` e os `*-principles.md` desta pasta) só mudam por ADR que **supersede** explicitamente o anterior, com aprovação do Governor. Nunca por edição silenciosa.

## Divergência

O Architecture Specialist tem o **dever de dissentir** quando discorda. A divergência é registrada (no PR ou em ADR). A decisão final é do Governor — mas a objeção fica documentada para a memória do projeto.
