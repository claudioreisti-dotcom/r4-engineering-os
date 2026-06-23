# ADR-0014: Claude as Architecture Specialist (Role over Tool)

## Status

Accepted

## Context

O Claude vinha sendo tratado como "o modelo que responde prompts". A filosofia do EOS é "papéis sobre ferramentas": a workforce é definida por papéis, executados por Providers substituíveis.

## Decision

Formalizar o **Architecture Specialist** como papel da Workforce, atualmente executado pelo Provider **Claude**. O papel recebe Missões, produz especificações/ADRs/PRs e tem mandato explícito para **questionar premissas, simplificar e recusar acoplamento** — inclusive contra o Governor e contra si mesmo. Não tem autoridade de merge.

## Rationale

Separar papel de ferramenta torna a contribuição independente do Provider e protege a arquitetura por design (revisão adversária, não complacência).

## Consequences

- "Claude faz X" vira "o Architecture Specialist faz X usando Claude".
- O Provider pode ser trocado sem perda de papel ou de conhecimento.
- A revisão é feita por um Provider distinto (hoje ChatGPT), preservando independência.
