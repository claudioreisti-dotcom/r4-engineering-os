# ADR-0008: Provider vs Plugin (Two Extension Axes)

## Status

Accepted (revisa a recomendação da Mission 0001 que colapsava Adapter em Plugin)

## Context

Adapter aparecia em três representações (conceito, subtipo de plugin, arquivos soltos). É preciso um modelo único e a distinção certa entre estender execução e estender conhecimento.

## Decision

Dois eixos ortogonais de extensão:

- **Provider** — backend de execução que realiza o trabalho de um Specialist (Claude, Codex, Gemini, ChatGPT, Cursor). `satisfies` Capabilities.
- **Plugin** — bundle que amplia o que o sistema sabe/faz (Superpowers, Elevate, compliance, domínio). `contributes` Capabilities/Specialists/Workflows/Constraints.

"Adapter" é eliminado: é um Provider.

## Rationale

Provider responde "com o quê se executa"; Plugin responde "o que o sistema passa a saber". Colapsá-los esconde a distinção que torna Tool Independence estrutural.

## Consequences

- Trocar de ferramenta = trocar de Provider, sem tocar em Specialist/Capability/Workflow.
- Claude/Codex/Gemini/ChatGPT/Cursor = Providers. Superpowers/Elevate = Plugins.
- Credenciais e binding de runtime ficam no ambiente, fora do conhecimento canônico.
