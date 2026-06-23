# ADR-0011: Manifest References, Never Redefines

## Status

Accepted

## Context

Os dois manifests existentes (raiz e DOK1) divergiam em estrutura e mesclavam definição-do-OS com declaração-de-projeto, violando SSOT.

## Decision

O Manifest declara identidade e **compõe por referência** (`id`) os Assets do Project: Capabilities, Specialists, Providers, Plugins. **Nunca redefine** o conteúdo desses Assets.

## Rationale

Composição por referência garante uma única fonte por entidade e elimina divergência entre manifests.

## Consequences

- Metadados de OS (princípios, kernel) saem do manifest de projeto.
- A forma concreta (schema YAML) é implementação futura, gerada do Manifest Model.
- O próprio repo terá um `manifest.yaml` que o declara como Project (dogfooding).
