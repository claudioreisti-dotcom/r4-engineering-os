# ADR-0000: Why R4 Engineering OS Exists

## Status

Accepted — Foundational (permanente; só pode ser superado por outro ADR aprovado pelo Governor)

## Context

A R4 desenvolve software com uma workforce de IA governada por um único Human Governor. O gatilho foi a dependência do Claude Code; a análise revelou o problema real e durável: conhecimento estratégico preso em chats, prompts, memórias e arquivos acoplados a uma ferramenta. Trocar de modelo não resolve isso.

## Decision

Criar o R4 EOS como produto independente: um padrão de engenharia que permite a um humano governar uma workforce de IA preservando conhecimento, decisões e consistência entre projetos, independente da ferramenta que executa.

## Rationale

O ativo durável é o conhecimento versionado em texto plano, não a ferramenta. O EOS protege esse ativo e torna ferramentas substituíveis.

## Consequences

- DOK1, iVet e IAReis tornam-se projetos downstream que reutilizam o EOS.
- Ferramentas são Providers; nunca fonte de verdade.
- Os princípios deste ADR só mudam por novo ADR aprovado pelo Governor.
