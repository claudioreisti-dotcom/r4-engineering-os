# Definition of Done

> Permanente. Critérios que qualquer entrega deve satisfazer antes do merge.

Uma entrega está *done* quando:

## Conhecimento
- [ ] Existe exatamente uma fonte canônica para cada informação (SSOT).
- [ ] Nenhuma lista, índice ou catálogo foi mantido à mão como fonte paralela.
- [ ] Nada estratégico ficou apenas em chat — virou Mission, ADR ou asset versionado.

## Arquitetura
- [ ] Toda decisão estrutural tem um ADR (ver `decision-process.md`).
- [ ] O Kernel não cresceu sem ADR e justificativa.
- [ ] Nenhum acoplamento novo entre extensões foi introduzido.
- [ ] Conceitos redundantes foram eliminados, não acomodados.

## Processo
- [ ] A entrega responde a uma Mission `approved`.
- [ ] Veio como Pull Request, não como alteração direta em `main`.
- [ ] Passou por Architecture Review de um Provider distinto do autor.
- [ ] O Human Governor autorizou o merge.

## Documentação
- [ ] A entrega respeita os `documentation-principles.md`.
- [ ] Conteúdo derivável é (ou será) Artifact gerado, não fonte autorada.

## Qualidade
- [ ] A implementação/decisão futura é consequência natural da entrega — não restam decisões estruturais em aberto no escopo da Missão.

> Esta lista é o piso, não o teto. A revisão pode exigir mais conforme a Missão.
