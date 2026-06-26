# Journal 0005 — Avaliação do noxsync (read-only, não adotado)

> Avaliação somente-leitura de um segundo projeto real, durante a fase de observação.
> **Nenhum bootstrap. Nenhuma evolução de modelo/ontologia.** As lacunas viram candidatas.

## O que é o noxsync

Plataforma de **sincronização de disponibilidade** de profissionais entre sistemas de agenda
em saúde (TI Saúde, NoxCare; extensível). Sincroniza apenas horário ocupado/livre — não
pacientes, consultas nem dados clínicos. CPF é identidade canônica. **Fase: especificação**
(PRD v1.0 + SAD v1.0); o repositório é só `docs/` (38 arquivos, 9 ADRs), **sem código ainda**.

Stack declarada (não implementada): NestJS, React, PostgreSQL (sem Redis no MVP). Arquitetura:
Event Log imutável + Outbox Pattern + modelo canônico de evento + conectores plugáveis +
consolidação (estado final prevalece) + delivery workers + prevenção total de loop.

## Aderência à ontologia atual (v1.2.0)

O noxsync **cabe nos tipos ativos** sem exigir mudança:
- **components:** ingestion, event-log, consolidation, delivery-worker, connectors, web-admin.
- **resources:** postgres (única infra do MVP).
- **principles:** availability-only, event-log-source-of-truth, final-state-prevails,
  total-loop-prevention, dedicated-instance.
- **capabilities:** event-ingestion, consolidation, availability-delivery.
- **specialists:** backend, integration-engineer, frontend. **providers:** nenhum (não usa LLM).
- **workflow:** o pipeline `ingest → consolidate → deliver` é ordenado mas **totalmente
  automatizado (sem gate humano)** — modelá-lo é opcional; o valor de auditabilidade do gate
  não se aplica aqui (contraste com o suporte-r4).

## Candidatas de evolução (REGISTRADAS, não aplicadas — congelamento ativo)

1. **`r4 discover` tem baixo rendimento em projetos pré-código.** Sem `package.json`/stack/
   código, a extração determinística (Phase 1) retornou ~vazio; a Discovery foi carregada
   pela leitura interpretativa dos docs (Adoption Specialist). Sinal: o valor do discover
   determinístico cai em projetos na fase de spec.

2. **Tipo `decision` dormente vs ADRs reais.** O noxsync tem 9 ADRs próprios (`docs/adr/*`).
   Mapeá-los como assets exigiria ativar `decision`. Segundo projeto real (após DOK1) a
   sinalizar isso.

> Ambas permanecem **candidatas**. Nenhuma evolução será feita até o conjunto de dados de uso
> justificar — por decisão do Governor (ver Mission 0012).

## Conclusão

noxsync confirma que a ontologia v1.2.0 generaliza para um arquétipo novo (integração/event-
sync, pré-código) sem mudança. Os dois sinais acima alimentam a decisão futura de evolução.

## Decisão / Próximo passo (2026-06-26)

**Manter o noxsync em "avaliado" — sem bootstrap por enquanto.** Motivo: é pré-código;
adotar agora modelaria intenção (components/resources inexistentes) → churn alto e valor
marginal baixo (o conhecimento dele já está estruturado nos próprios docs).

**Gatilho de adoção:** revisitar e fazer o bootstrap **quando o noxsync tiver código** (ou
quando a estrutura de components estabilizar), para o R4 EOS governar a construção real, não
a especulação. Até lá, a fase de observação é carregada pelo suporte-r4 (uso real).
