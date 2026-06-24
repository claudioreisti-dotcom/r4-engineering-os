# ADR-0019: Existing Project Adoption

## Status

Accepted

## Context

A Mission 0007 mostrou que o R4 EOS V1 só validava projetos já autorados no seu formato
(greenfield) e não tinha caminho para adotar um projeto existente (brownfield) como o DOK1.
A regra inegociável: nunca adaptar o projeto; adaptar o R4 EOS.

## Decision

Definir um processo de adoção reproduzível para qualquer repositório, em 5 fases:
**Discovery → Project Profile → Governance Proposal → Human Approval → Bootstrap (via PR)**.

Separação de responsabilidades (alinhada ao ADR-0009):
- **Discovery/Profile (fatos):** determinístico, sem estado, sem IA — `r4 discover`.
- **Governance Proposal (julgamento):** autorada pelo **Adoption Specialist** (IA).
- **Approval:** humana, obrigatória, antes do bootstrap.
- **Bootstrap:** mecânico, sempre via Pull Request, nunca direto na main.

## Rationale

Mantém o Engine determinístico e fora do Kernel; coloca a interpretação onde ela pertence
(IA executa, humano governa); e garante que a adoção nunca altere o projeto-alvo.

## Consequences

- Novo comando `r4 discover` (read-only) e novos assets `specialist/adoption` e
  `capability/existing-project-adoption`.
- A proposta pode revelar **lacunas de ontologia** (ex.: módulos, princípios, provedores de
  infraestrutura). Elas são registradas como riscos/conflitos na proposta e tratadas sob
  Grow on Demand — não antecipadas.
- Para o DOK1 (cópia local, não versionada): Discovery e Proposta são produzidas; o
  bootstrap não é aplicado (gate de aprovação + o DOK1 nunca é alterado/commitado).
