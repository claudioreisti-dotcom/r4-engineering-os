# ADR-0003: Meta-Model and Ontology as the Technical Foundation

## Status

Accepted

## Context

Definir formatos de arquivo (specialist.yaml etc.) antes de definir o significado das entidades é o erro recorrente de frameworks. O significado precede a forma.

## Decision

Adotar um modelo de dois níveis como fundação técnica:

- **Nível 1 — Meta-Model:** 4 primitivos (KnowledgeAsset, Relation, Constraint, Lifecycle) + 1 derivado (Artifact).
- **Nível 2 — Ontology:** catálogo fechado de tipos de KnowledgeAsset.

Manifest, YAML, CLI, Portal e Providers são consequências desta fundação.

## Rationale

Acertar a ontologia faz os formatos e as surfaces emergirem naturalmente como projeções de um único modelo tipado.

## Consequences

- Especificar o Meta-Model e a Ontology é a primeira entrega real do produto.
- Adicionar um primitivo (nível 1) exige reabrir o Meta-Model e um ADR — barreira que mantém o Kernel pequeno.
