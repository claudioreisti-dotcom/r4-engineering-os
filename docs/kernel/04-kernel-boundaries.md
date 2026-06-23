# Kernel — Boundaries

> Define explicitamente o que pertence ao Kernel e o que nunca poderá pertencer.
> Congelado por ADR-0007.

## O que É o Kernel

O Kernel é o conjunto mínimo, estável e versionado de **definições** (não código):

1. **Meta-Model** — os 4 primitivos + 1 derivado (`docs/kernel/00-meta-model.md`).
2. **Ontology** — o catálogo fechado de tipos de KnowledgeAsset (`01-ontology.md`).
3. **Governance Rules / Constraints** — os invariantes obrigatórios e as regras de decisão (`.governance/`, invariantes do Meta-Model).
4. **Manifest Model** — o modelo conceitual de composição de um Project (`03-manifest-model.md`).
5. **Versioning Policy** — SemVer do Kernel e regra de compatibilidade (ADR-0012).

Tudo isso é texto plano, declarativo e durável. O Kernel não contém comportamento.

## O que NUNCA será o Kernel

- **Providers** — Claude, Codex, Gemini, ChatGPT, Cursor. São extensões de execução.
- **Plugins** — Superpowers, Elevate, compliance, domínio. São extensões de conhecimento.
- **Conteúdo de Specialists e Capabilities** — instâncias vivem em `knowledge/`, não no Kernel. O Kernel define o *tipo* Specialist; não conhece o Architecture Specialist concreto.
- **Runtime / orquestrador / engine de IA** — o R4 EOS é protocolo, não programa (ADR-0002). O "runtime" é o agente + Git + CI.
- **Knowledge Engine** — é ferramenta de suporte (determinística, sem estado), não Kernel. Pode ser reescrita ou substituída sem tocar no Kernel (ADR-0009).
- **CLI, VS Code Extension, Documentation Portal** — surfaces de código, substituíveis.
- **Documentação derivada (Artifacts)** — gerada, nunca canônica.
- **Regras de domínio** — o Kernel não conhece DOK1, healthcare, iVet.
- **Segredos e estado de runtime** — não são conhecimento.

## Teste de fronteira

Antes de adicionar algo ao Kernel, pergunte:

1. Pode ser um *tipo* de KnowledgeAsset em vez de um primitivo? → então não é Kernel-core, é Ontology.
2. Pode ser uma extensão (Plugin/Provider)? → então fica fora do Kernel.
3. É comportamento/execução? → então não é Kernel (protocolo, não programa).
4. É derivável de outra fonte? → então é Artifact, não Kernel.

Só passa para o Kernel o que falha em todos os quatro testes. Crescer o Kernel exige ADR e justificativa explícita.
