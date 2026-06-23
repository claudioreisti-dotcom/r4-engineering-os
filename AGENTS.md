# Agent Entry Point

Este arquivo é o ponto de entrada para qualquer especialista de IA trabalhando no R4 Engineering OS.

## Primeira regra

Não assuma conhecimento vindo de chats anteriores.

Leia primeiro:

1. `FOUNDATION.md`
2. `engineering.manifest.yaml`
3. `docs/genesis/0001-project-genesis.md`
4. `docs/architecture/core-model.md`

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
