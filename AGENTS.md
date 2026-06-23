# Agent Entry Point

Este arquivo é o ponto de entrada para qualquer especialista de IA trabalhando no R4 Engineering OS.

## Primeira regra

Não assuma conhecimento vindo de chats anteriores.

Leia primeiro:

1. `FOUNDATION.md`
2. `.governance/` (papéis, processo, princípios)
3. `docs/kernel/` (meta-model, ontology, manifest model, boundaries)
4. `kernel/` e `knowledge/` (Kernel e conhecimento canônico em YAML)
5. `manifest.yaml` (declaração deste projeto)
6. `docs/genesis/0001-project-genesis.md` (origem, histórico)

## Modelo operacional

- Humanos governam.
- Especialistas de IA executam.
- Conhecimento é versionado.
- Ferramentas são substituíveis.
- O repositório é a fonte de verdade.

## Antes de alterar qualquer arquivo

Identifique:

1. Qual capability está sendo executada.
2. Qual specialist está atuando.
3. Qual knowledge asset será criado ou alterado.
4. Se existe decisão arquitetural envolvida.
5. Se a alteração precisa gerar ADR.

## Nunca faça

- Criar conhecimento apenas no chat.
- Duplicar fonte de verdade.
- Tratar Claude, Codex ou qualquer modelo como parte da arquitetura.
- Alterar princípios fundadores sem decisão formal.
