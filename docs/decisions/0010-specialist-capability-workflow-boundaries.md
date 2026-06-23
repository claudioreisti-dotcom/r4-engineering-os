# ADR-0010: Specialist / Capability / Workflow Boundaries

## Status

Accepted

## Context

Os três conceitos se sobrepõem facilmente, gerando definições duplicadas (quem faz, o que é feito, como é feito).

## Decision

Fronteiras fixas:

- **Specialist** = o *quem* (papel: missão, responsabilidades, quality gates).
- **Capability** = o *quê* (competência: inputs, outputs, completion criteria).
- **Workflow** = o *como* (procedimento ordenado que realiza uma Capability).

Relações: Specialist `owns`/`executed-by` Capability; Capability `realized-by` Workflow (0..1).

**Workflow nasce dormente:** existe na Ontology, mas sem instâncias e sem estrutura interna congelada até haver uso real (Grow on Demand).

## Rationale

Separar quem/o quê/como elimina duplicação e permite reuso (uma Capability com Workflows alternativos; um Specialist com várias Capabilities).

## Consequences

- A definição de uma Capability não repete passos de Workflow.
- Congelar a forma de Workflow agora seria acoplamento prematuro — fica adiado.
