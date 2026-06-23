# Core Model

## Purpose

O Core Model define os conceitos fundamentais do R4 Engineering OS.

Ele deve permanecer pequeno, estável e independente de ferramentas, metodologias e projetos específicos.

## Core Concepts

### Human Governor

Pessoa responsável por visão, prioridade, aprovação e responsabilidade final.

### Engineering Workforce

Conjunto de especialistas que executam o trabalho de engenharia.

Pode ser composta por humanos, IA ou ambos.

### Specialist

Papel especializado dentro da Workforce.

Exemplos:

- Architecture Specialist
- Backend Specialist
- Frontend Specialist
- QA Specialist
- Knowledge Specialist
- Documentation Specialist
- Security Specialist
- DevOps Specialist

### Contract

Definição formal de um Specialist.

Inclui missão, responsabilidades, entradas, saídas, skills, capabilities e quality gates.

### Capability

Capacidade operacional executável pela Workforce.

Exemplos:

- Feature Development
- Architecture Review
- Knowledge Capture
- Release Management
- Incident Response

### Knowledge Asset

Ativo versionado que preserva conhecimento.

Exemplos:

- PRD
- ADR
- RFC
- Manifest
- Architecture
- Playbook
- Specialist Contract

### Adapter

Implementação que conecta um Specialist ou Capability a uma ferramenta concreta.

Exemplos:

- Claude Adapter
- Codex Adapter
- Gemini Adapter
- Cursor Adapter

## Relationships

Human Governor governs the Engineering Workforce.

Engineering Workforce is composed of Specialists.

Specialists are defined by Contracts.

Specialists execute Capabilities.

Capabilities produce or update Knowledge Assets.

Adapters connect Specialists to tools.

## Kernel

O Kernel do R4 EOS é intencionalmente pequeno:

1. Engineering Manifest
2. Runtime
3. Plugin Manager
4. Workforce
5. Governance

Tudo o restante é extensão.

## Invariants

- Todo trabalho pertence a um Specialist.
- Todo Specialist possui um Contract.
- Todo Knowledge Asset possui uma fonte de verdade.
- Toda Capability gera ou consome conhecimento.
- Adapters nunca são fonte de verdade.
- Ferramentas são substituíveis.
