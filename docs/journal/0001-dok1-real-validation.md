# Journal 0001 — Validação contra o DOK1 real

> Descoberta de discovery. Não é fonte de verdade; ver ADRs para decisões.

## O que foi feito

Validamos o R4 EOS V1 contra o **DOK1 real** (cópia local, não versionada), sem adaptar o
DOK1 — apenas o Engine, quando necessário.

## O que encontramos

1. **O DOK1 real não tem conhecimento no formato R4 EOS.** Sua fonte de verdade é
   Markdown/convenções: `CLAUDE.md` (guia de engenharia), `docs/PRD.md`, `docs/WORKFLOW.md`,
   `.specs/project/{PROJECT,ROADMAP,STATE}.md` (decisões AD-xxx, bloqueios B-xxx, lições
   L-xxx), `docs/superpowers/`. Não há `manifest.yaml` nem `knowledge/*.yaml`.

   > Isto é, literalmente, o problema que o R4 EOS existe para resolver: conhecimento
   > estratégico preso em arquivos e convenções específicas.

2. **O Engine falso-positivava projetos vazios** — reportava `válido` para um diretório
   sem manifest. Corrigido (ADR-0018): um projeto deve declarar um manifest.

3. **Lacuna arquitetural da V1 (a principal):** o R4 EOS V1 assume *greenfield* — que o
   projeto já foi autorado no formato R4 EOS. Ele **não tem caminho de ingestão/bootstrap**
   para um projeto *brownfield* existente como o DOK1.

## Implicação

Validar "o R4 EOS contra o DOK1" não é fazer o DOK1 passar (isso exigiria adaptar o DOK1,
proibido). É reconhecer que **governar o DOK1 exige uma capacidade de Bootstrap/Ingest**:
mapear o conhecimento existente (PRD, decisões, specs, roles) para assets R4 EOS, sem
reescrever o projeto à mão.

## Próximo passo proposto

Missão futura: **Bootstrap Capability** — dado um projeto existente, derivar (com revisão
humana) o `manifest.yaml` e os assets iniciais a partir de seus artefatos atuais. Esta é a
ponte entre o R4 EOS e os projetos reais da R4.
