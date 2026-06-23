# Review & Approval

> Permanente. Define o fluxo de revisão e os critérios de aprovação de cada Pull Request.

## Fluxo de revisão

1. O Architecture Specialist entrega a Missão como **Pull Request** (Missão passa a `delivered`).
2. O Architecture Review (Provider **distinto** do autor) avalia o PR (`in-review`).
3. Se houver ajustes, a revisão marca `changes-requested`; o Specialist corrige **na mesma branch** e devolve para revisão.
4. Com a revisão satisfeita, o **Human Governor** decide o merge.

Independência é inegociável: quem revisa nunca é quem produziu.

## Checklist de revisão

A revisão deve verificar, no mínimo:

**Conhecimento & SSOT**
- [ ] Existe uma única fonte canônica para cada informação?
- [ ] Nenhuma lista/índice foi mantido à mão como fonte paralela?
- [ ] Nada estratégico ficou apenas em chat?

**Arquitetura**
- [ ] O Kernel cresceu? Se sim, há ADR e justificativa?
- [ ] Algum conceito redundante foi acomodado em vez de eliminado?
- [ ] Algum acoplamento novo entre extensões foi introduzido?
- [ ] As fronteiras de papéis/conceitos permanecem claras?

**Escopo & processo**
- [ ] A entrega responde exatamente à Missão, sem extrapolar escopo?
- [ ] Toda decisão estrutural tem ADR?
- [ ] A `definition-of-done.md` foi satisfeita?

## Critérios de aprovação

Um PR só pode ser aprovado quando **todos** os seguintes forem verdadeiros:

1. A Missão correspondente está `approved`.
2. A Architecture Review foi concluída por um Provider distinto do autor.
3. Todos os itens da Definition of Done aplicáveis estão satisfeitos.
4. Toda decisão estrutural tem ADR registrado.
5. Não há violação de SSOT nem crescimento injustificado do Kernel.
6. O Human Governor autoriza o merge.

Reprovar é legítimo e esperado: aprovar por complacência é violação de papel.

## Após o merge

- A Missão passa a `merged` e depois `archived`.
- O PR e os ADRs ficam referenciados na Missão (rastreabilidade).
