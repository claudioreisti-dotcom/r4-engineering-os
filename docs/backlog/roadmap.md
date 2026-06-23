# Roadmap

> Reescrito para refletir a arquitetura congelada (protocol over program; sem runtime/plugin-manager
> como código — ADR-0002). Substitui o roadmap inicial de Foundation.

## Concluído

- **Foundation** — Genesis, princípios, ADR-0000.
- **Governance** — papéis, processo, princípios permanentes (Mission 0002.5).
- **Kernel** — meta-model, ontology, YAML language, manifest model, boundaries (Mission 0003).
- **Knowledge Engine V1** — load → validate → resolve → generate; CLI; CI (Mission 0004).
- **Reconciliação** — SSOT em todo o repositório (Mission 0005).

## V1 do projeto (em andamento)

- **Multi-projeto + DOK1** — provar reuso do Kernel por um projeto downstream (Mission 0006).

## Pós-V1 (Grow on Demand)

- Ativar tipos dormentes quando houver uso real (`workflow`, `plugin`).
- Superfícies: CLI distribuível, VS Code Extension, Documentation Portal.
- Versionamento e migração entre versões do Kernel (ADR-0012) na prática.
- Mecanismo concreto de Architecture Review por Provider distinto.
