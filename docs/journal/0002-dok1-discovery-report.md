# Journal 0002 — DOK1 Real Validation (Mission 0007)

> Relatório de discovery/assessment/gap. Nenhuma alteração foi feita no DOK1; nenhuma
> correção foi implementada (constraint da Mission 0007). O DOK1 é cópia local não versionada.

## Phase 1 — Discovery (fatos observados)

**Natureza da cópia:** esqueleto. Os diretórios de código e conhecimento (`apps/`,
`packages/`, `.specs/`, `docs/`, `.superpowers/`, `.github/`, `.claude/`, `deploy/`,
`scripts/`) estão **vazios**. Têm conteúdo: os arquivos de raiz (configs) e de convenção.

**Stack / tooling (de `package.json`, `turbo.json`, `pnpm-workspace.yaml`, Dockerfiles, compose):**
- Monorepo Turborepo + pnpm (`apps/*`, `packages/*`); Node ≥22; TypeScript 5.7; ESLint flat + Prettier.
- Tasks turbo: `build, dev, test, lint, type-check, db:generate`.
- Deployables: `Dockerfile.api`, `Dockerfile.web-clinica`, `Dockerfile.web-paciente`; compose com `postgres`, `redis`.

**Arquitetura / domínio (de `CLAUDE.md`):**
- SaaS médico **multi-tenant** (clínicas + portal do paciente), EHR, teleconsulta, prescrição digital, GED.
- Backend NestJS (Fastify) + Prisma 7 + PostgreSQL + Zod, **Clean Architecture por módulo**, fronteiras de camada invioláveis, multi-tenant (`TenantAwareRepository`, RLS).
- Frontend Next.js (App Router) + Tailwind + Shadcn/Radix + Zustand + TanStack Query; **dois apps** (clínica interno, paciente externo).
- Infra: Redis + BullMQ, S3 residente no Brasil, PgBouncer, Neon Postgres (SP); IA add-on self-hosted.
- Estrutura intencional: `apps/{api,web-clinica,web-paciente}`, `packages/{shared-types,fhir}`.

**Convenções / governança:**
- `AGENTS.md` (mapa de conhecimento + boot), `CLAUDE.md` (guia de engenharia: Princípios de Trabalho, Regras Invioláveis), `CODEX.md`/`GEMINI.md` (adapters finos).
- Política anti-enum, PT-BR, brainstorming-first, TDD, self-review obrigatório, cobertura ≥80% (~100% em caminhos de conformidade), metodologia **superpowers**.

**Conhecimento (referenciado, ausente nesta cópia):** `docs/PRD.md` (fonte de verdade), `docs/WORKFLOW.md`, `docs/STATUS.md`, `.specs/project/{PROJECT,ROADMAP,STATE}.md` (decisões AD-xxx, bloqueios B-xxx, lições L-xxx).

**Compliance:** SBIS/CFM NGS2, LGPD, ICP-Brasil (assinatura digital), HL7 FHIR R4.

## Phase 2 — Assessment

**O que o R4 EOS consegue compreender hoje:**
- **Nada automaticamente.** A V1 só valida `manifest.yaml` + `knowledge/*.yaml` pré-autorados. Apontado ao DOK1, o Engine responde corretamente que não é um projeto R4 EOS (ADR-0018) — honesto, mas não é compreensão.
- Conceitualmente, os fatos de stack/tooling são **extraíveis de forma determinística** (package.json, turbo, lockfile, Dockerfiles, compose). As convenções são **legíveis** (arquivos existem). O domínio/compliance está em **prosa** (`CLAUDE.md`), exigindo interpretação.

**Hipóteses do produto confirmadas:**
- O conhecimento estratégico do DOK1 está **preso em markdown/convenções** — exatamente o problema que o R4 EOS existe para resolver. ✅
- Papéis/ferramentas já são tratados como adapters (`CLAUDE/CODEX/GEMINI.md`) — alinhado a "papéis sobre ferramentas". ✅

**Limitações evidentes:**
- A V1 não tem **discovery nem ingestão**. Não lê markdown, não deriva nada de um projeto existente.
- O modelo só "entende" um projeto que **já foi autorado** no formato R4 EOS (greenfield).

## Phase 3 — Gap Analysis (sem implementar correções)

**Engine**
- Ausente: descoberta de projeto (extração determinística de fatos) e uma Capability de adoção (interpretação por IA). Hoje só valida YAML pré-existente.

**Manifest**
- Modela identidade/kernel/governança + blocos opcionais domain/compliance, mas **não referencia** os módulos/serviços/deployables do projeto (api, web-clinica, web-paciente) nem a metodologia (superpowers) como elementos de primeira classe.

**Ontologia**
- Tipos ausentes/dormentes necessários para representar um projeto real:
  - `component`/`module` — os apps e packages (api, web-clinica, web-paciente, shared-types, fhir).
  - `plugin`/`methodology` — superpowers/elevate (hoje dormente).
  - `principle` — as "Regras Invioláveis" e Princípios de Trabalho (hoje dormente).
  - `compliance` e `domain` — hoje são sub-campos do manifest; podem precisar virar assets de primeira classe se forem referenciados/reusados.
- `provider` hoje = backend de execução (LLM). O DOK1 tem também **provedores de infraestrutura** (Postgres/Neon, Redis, S3, PgBouncer) — noção distinta que a ontologia não cobre.

**Melhorias necessárias (para Mission 0008)**
- Um processo de **adoção reproduzível**: Discovery (fatos determinísticos) → Profile → Governance Proposal (autorada por Specialist/IA) → Human Approval → Bootstrap via PR.

## Success Criteria — respostas

1. **O que o R4 EOS conseguiu compreender?** Hoje, automaticamente, nada além de "isto não é um projeto R4 EOS". Os fatos de stack/tooling são extraíveis e as convenções legíveis, mas a V1 não tem a capacidade de fazê-lo.
2. **O que ainda não consegue?** Descobrir/ingestar um projeto existente; ler conhecimento em markdown; representar módulos, metodologias, princípios e infraestrutura na ontologia.
3. **O que precisa evoluir?** Uma capacidade de **adoção de projetos existentes** (Mission 0008) e a evolução da ontologia/manifest para representar a realidade de um projeto como o DOK1.
