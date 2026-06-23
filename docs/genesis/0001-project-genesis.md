# Project Genesis

## Executive Summary

O R4 Engineering OS nasceu a partir de uma necessidade prática: criar um fallback para o uso do Claude Code no desenvolvimento de software.

A conversa evoluiu rapidamente. O problema inicial parecia ser dependência de uma ferramenta específica, mas a análise revelou algo maior: o conhecimento de engenharia estava disperso entre chats, arquivos, ferramentas, prompts, memórias individuais e contexto implícito.

A conclusão foi que a R4 precisava de algo maior que um conjunto de prompts ou templates. Precisava de um sistema operacional de engenharia.

## Origin

O ponto de partida foi o uso do Claude Code como ferramenta principal de desenvolvimento no VS Code. A preocupação inicial era simples: como continuar desenvolvendo se o Claude ficasse indisponível?

O Codex foi instalado como fallback, mas a discussão expôs uma questão mais profunda: trocar de modelo não resolve dependência de conhecimento se o projeto depende de arquivos, hábitos e contexto específicos de uma única ferramenta.

## Key Discoveries

### Tool Dependence Is a Symptom

O problema real não era a ferramenta. O problema era o acoplamento do conhecimento do projeto à ferramenta.

### Knowledge Needs Architecture

A análise do DOK1 mostrou que havia documentação rica, mas o conhecimento estava espalhado e parcialmente duplicado.

### Documentation Is Not Enough

O projeto precisava de governança de conhecimento, não apenas de documentos.

### Engineering OS

A visão evoluiu para um sistema que organiza governança, papéis, capacidades, especialistas, adapters, plugins e execução.

### Human-Governed AI Engineering

A identidade consolidada foi: IA executa; humano governa.

### Roles Over Tools

Em vez de “Claude faz isso”, o modelo passa a ser “Architecture Specialist executa usando Claude”.

### Engineering Manifest

Todo projeto governado pelo R4 EOS deve declarar sua configuração de engenharia em `engineering.manifest.yaml`.

### Small Kernel

O Kernel deve permanecer pequeno:

1. Engineering Manifest
2. Runtime
3. Plugin Manager
4. Workforce
5. Governance

Tudo o restante é plugin, specialist, adapter ou capability.

## Product Thesis

O R4 Engineering OS é uma plataforma de governança de engenharia para organizações AI-Driven e Human-Governed.

Ele permite que um humano governe uma workforce de especialistas de IA, preservando conhecimento, qualidade, decisões e consistência entre projetos.

## Reference Scenario

O cenário inicial de referência é:

> Solo CTO + Multi-Agent Engineering Workforce.

Hoje, Claudio acumula papéis de CTO, Product Owner, Architect, Tech Lead, Developer e Reviewer. O R4 EOS deve permitir que esses papéis sejam progressivamente executados por especialistas de IA, com governança humana.

## Explicit Non-Goals

O R4 EOS não é:

- Jira
- GitHub
- Scrum
- Confluence
- Claude wrapper
- prompt library
- documentation framework

Ele pode integrar com tudo isso, mas não substitui diretamente essas ferramentas.

## Key Decisions

- O produto se chama R4 Engineering OS.
- O repositório é independente de projetos específicos.
- DOK1 será o primeiro projeto de referência.
- Ferramentas são adapters.
- Superpowers e Elevate são plugins, skills ou capability providers.
- O Kernel deve permanecer pequeno.
- O sistema deve ser AI-Driven e Human-Governed.
- Todo conhecimento estratégico deve ser versionado.

## Next Step

Transformar este Genesis em artefatos formais:

1. Core Model
2. Engineering Manifest Specification
3. Runtime Model
4. Workforce Model
5. Plugin System
6. Capability Catalog
7. Specialist Contracts
