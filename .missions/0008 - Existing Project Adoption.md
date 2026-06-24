---

mission: "0008"
title: Existing Project Adoption
status: in-review
governor: Claudio
specialist: Architecture Specialist
reviewer: Architecture Review
-----------------------------

# Mission 0008 — Existing Project Adoption

## Context

A Mission 0007 validou o comportamento do R4 EOS diante de um projeto existente.

As limitações identificadas deverão agora ser tratadas de forma genérica.

O objetivo não é resolver o DOK1.

O objetivo é permitir que qualquer projeto existente seja adotado pelo R4 EOS.

---

# Objective

Projetar e implementar o processo de adoção de projetos existentes.

O processo deverá funcionar para qualquer repositório.

---

# Workflow

O processo deverá seguir obrigatoriamente as etapas abaixo.

## Phase 1 — Project Discovery

Ler o projeto.

Sem alterar nenhum arquivo.

Construir um perfil do projeto.

---

## Phase 2 — Project Profile

Gerar automaticamente um perfil contendo:

* stack;
* arquitetura;
* módulos;
* convenções;
* ferramentas;
* riscos;
* maturidade;
* documentação existente.

---

## Phase 3 — Governance Proposal

Gerar uma proposta contendo:

* Engineering Manifest;
* Knowledge inicial;
* Specialists sugeridos;
* Capabilities sugeridas;
* Providers sugeridos;
* riscos;
* conflitos.

Nenhuma alteração deverá ser aplicada automaticamente.

---

## Phase 4 — Human Approval

O Human Governor revisará a proposta.

Somente após aprovação será permitido continuar.

---

## Phase 5 — Bootstrap

Após aprovação:

* gerar os arquivos do R4 EOS;
* abrir uma Pull Request;
* nunca modificar diretamente a branch principal.

---

# Constraints

Nunca adaptar um projeto para fazer o R4 EOS funcionar.

Sempre adaptar o R4 EOS para compreender projetos existentes.

Todo bootstrap deverá ocorrer através de Pull Request.

---

# Success Criteria

Ao término desta missão, qualquer projeto deverá poder ser incorporado ao R4 EOS através de um processo reproduzível de:

Project Discovery → Project Profile → Governance Proposal → Human Approval → Bootstrap.

O DOK1 deverá ser apenas o primeiro caso de validação desse processo, e não uma exceção arquitetural.

---

# Outcome

Processo genérico implementado e dogfooded: comando `r4 discover` (Discovery/Profile,
determinístico, somente leitura), assets `specialist/adoption` e
`capability/existing-project-adoption`, playbook `docs/adoption/process.md` e ADR-0019.

Fases 1–3 executadas sobre o DOK1 real (somente leitura): Project Profile gerado e
Governance Proposal autorada, **apresentados para aprovação humana (Phase 4)**. O Bootstrap
(Phase 5) não foi aplicado — aguarda aprovação e, por regra, o DOK1 nunca é alterado nem
commitado. Entregue como Pull Request.
