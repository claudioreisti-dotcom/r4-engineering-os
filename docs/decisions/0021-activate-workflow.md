# ADR-0021: Activate Workflow as a First-Class Descriptive Concept

## Status

Accepted

## Context

O ADR-0010 manteve `workflow` deliberadamente dormente até haver uso real (Grow on Demand).
A Discovery do piloto suporte-r4 (Mission 0008) revelou um processo explícito e ordenado —
`analyze → review → gate humano → execute` — que é a verdade central do projeto. A análise
arquitetural comparou três alternativas (indireto via capabilities; first-class descritivo;
first-class executável) e o Governor aprovou a **Alternativa B**: workflow como conceito de
primeira classe, estritamente descritivo.

## Decision

Ativar `workflow` como um tipo de KnowledgeAsset de primeira classe, **estritamente
descritivo**, que representa **processos e seus pontos de decisão (gates)**, reutilizando
capabilities existentes em seus passos.

Forma conceitual (mínima):
- Relação `realizes` → a(s) capability(ies)/resultado que o workflow documenta.
- Relação `references` → cada capability usada em um passo.
- `spec.steps` → lista **ordenada** de passos; cada passo é **(a)** uma referência a uma
  capability ou **(b)** um **gate** com ator explícito (`human` | `automated`). A ordem é
  intrínseca à lista (sem verbo de sequência).

Gates humanos são representados **explicitamente** como passos `kind: gate`, `actor: human`
— tornando o ponto de controle humano um nó nomeável e auditável.

## Non-Goals (congelados — vinculantes)

- **Sem semântica de execução.** O Engine nunca executa workflows.
- **Sem controle de fluxo:** proibidos condicionais, loops, paralelismo, retries, timeouts
  ou qualquer ramificação.
- **Não é orquestração.** O objetivo é governança e representação de conhecimento.
- **Não define capabilities novas** — apenas sequencia capabilities existentes.
- **Passos não são assets separados** — vivem no `spec`; nenhum verbo de relação novo.
- **Sem estado de runtime, sem agendamento, sem gatilhos.**

Qualquer evolução além disto exige um novo ADR que supere explicitamente estes não-objetivos.

## Ontology Impact

- `workflow`: `status: dormant → active`.
- `required_spec: [steps]`.
- `allowed_relations: [realizes, references]` (ambos os verbos já são canônicos).
- **Meta-modelo: inalterado** — nenhum primitivo novo, nenhum verbo novo, lifecycle
  inalterado. A ordenação é dado dentro do `spec`.
- A forma de `spec.steps` é mínima e só pode crescer via novo ADR (Grow on Demand).

## Compatibility

- **Puramente aditivo:** ativa um tipo já declarado e lhe atribui um `spec`. Nenhum asset
  existente muda de tipo, spec ou relações; nenhum tipo existente é alterado.
- Projetos pinados em Kernel 1.0.0/1.1.0 continuam válidos (apenas não usam workflow).
- **A ativação de workflow não introduz semântica de execução no Engine. O Engine permanece
  responsável apenas pela validação e integridade dos assets declarados.**
- **Versionamento:** aditivo e não-quebrável → Kernel **1.2.0** (SemVer minor, ADR-0012).

A consistência entre `spec.steps` e as relações `references` é tratada como **follow-up** e
não bloqueia a ativação: o objetivo desta mudança é validar workflow como conceito ontológico
de primeira classe, não maximizar a validação do modelo nesta etapa.

## Rationale

O processo é a essência do suporte-r4; Knowledge First e a identidade "humanos governam"
exigem que o gate humano seja um nó explícito e auditável; o conceito generaliza para
qualquer projeto com processo; e o custo de Kernel é aditivo, com a fronteira
anti-orquestração congelada.

## Consequences

- Workflow fica disponível para modelar processos em qualquer projeto.
- O pipeline do suporte-r4 poderá ser modelado como `workflow/suporte-r4-pipeline` com o
  gate humano explícito.
- Os não-objetivos são vinculantes; controle de fluxo/execução exige novo ADR.
- A mission de ativação faz o bump 1.2.0, adiciona a entrada na ontologia, um teste do novo
  tipo e um dogfood (`workflow/eos-governed-change`).
