# Kernel — Ontology

> Nível 2 da fundação. Catálogo fechado dos tipos de KnowledgeAsset. Adicionar/remover tipo exige ADR.
> Congelado por ADR-0003 e ADR-0006.

## Princípio

Todo conceito do R4 EOS é um **tipo de KnowledgeAsset** (ADR-0006), exceto `Artifact` (derivado) e os papéis de contexto (Human Governor, Workforce), que são organizacionais, não assets.

Cada entidade abaixo declara: **propósito**, **responsabilidade**, **relações**, **ciclo de vida**.

---

## Contexto organizacional (não são Assets)

- **Human Governor** — autoridade humana sobre visão e decisão. Governa a Workforce.
- **Workforce** — conjunto de Specialists que executam o trabalho. Composta de Specialists.
- **Project** — o **agregado** real: um Manifest mais todo o grafo que ele referencia. Não é um arquivo isolado; é o fecho do Manifest.

---

## Entidades (tipos de KnowledgeAsset)

### KnowledgeAsset (tipo-base)

- **Propósito:** unidade canônica de conhecimento.
- **Responsabilidade:** ser a única fonte de verdade de sua informação.
- **Relações:** qualquer Relation do Meta-Model.
- **Ciclo de vida:** `draft → active → deprecated → superseded`.

### Artifact (derivado, não-canônico)

- **Propósito:** representação gerada e legível de conhecimento.
- **Responsabilidade:** refletir fielmente seus Assets de origem; nunca conter informação que não exista na fonte.
- **Relações:** `produces` (recebida de um Asset).
- **Ciclo de vida:** não tem estado próprio; existe enquanto sua fonte existir. É descartável e reconstruível.

### Principle

- **Propósito:** invariante de produto ou de arquitetura.
- **Responsabilidade:** servir de fundamento estável para decisões.
- **Relações:** `superseded-by` → Decision.
- **Ciclo de vida:** `active → superseded` (raramente; só por Decision).

### Decision (ADR)

- **Propósito:** registrar uma decisão arquitetural e seu racional.
- **Responsabilidade:** congelar uma escolha estrutural e suas consequências.
- **Relações:** `supersedes` → Decision | Principle.
- **Ciclo de vida:** `proposed → accepted → (deprecated | superseded)`.

### Manifest

- **Propósito:** declarar a identidade e a composição de um Project.
- **Responsabilidade:** referenciar (por `id`) os Assets que compõem o projeto. **Nunca redefini-los** (ADR-0011).
- **Relações:** `references` → Capability | Specialist | Provider | Plugin; `requires` → versão do Kernel.
- **Ciclo de vida:** `draft → active`; evolui com o Project.

### Specialist

- **Propósito:** definir um papel de engenharia (o *quem*).
- **Responsabilidade:** missão, responsabilidades, quality gates do papel.
- **Relações:** `owns` → Capability; `bound-to` → Provider (em runtime).
- **Ciclo de vida:** `draft → active → deprecated`.

### Capability

- **Propósito:** definir uma competência executável (o *quê*).
- **Responsabilidade:** inputs, outputs, quality gates, completion criteria.
- **Relações:** `executed-by` → Specialist; `realized-by` → Workflow (0..1); `produces`/`consumes` → KnowledgeAsset.
- **Ciclo de vida:** `draft → active → deprecated`.

### Workflow *(dormente)*

- **Propósito:** definir o procedimento ordenado que realiza uma Capability (o *como*).
- **Responsabilidade:** descrever passos; não duplicar a definição da Capability.
- **Relações:** `realizes` → Capability.
- **Ciclo de vida:** `draft → active → deprecated`.
- **Estado:** existe na Ontology mas **não terá instâncias nem campos congelados** até haver uso real (Grow on Demand). Sua estrutura interna é deliberadamente não especificada nesta Sprint.

### Provider

- **Propósito:** declarar um backend de execução externo (Claude, Codex, Gemini, ChatGPT, Cursor).
- **Responsabilidade:** declarar quais Capabilities pode satisfazer e seu contrato de configuração. **Não** guarda credenciais nem estado de runtime.
- **Relações:** `satisfies` → Capability.
- **Ciclo de vida:** `draft → active → deprecated`.

### Plugin

- **Propósito:** empacotar uma extensão que amplia o que o sistema sabe/faz.
- **Responsabilidade:** declarar o que contribui e sua compatibilidade (`requires` Kernel).
- **Relações:** `contributes` → Capability | Specialist | Workflow | Constraint; `requires` → versão do Kernel.
- **Ciclo de vida:** `draft → active → deprecated`.

---

## Mapa de relações canônicas

```
Governor   governs     Workforce
Workforce  composed-of Specialist
Specialist owns         Capability
Specialist bound-to     Provider
Capability realized-by  Workflow        (0..1)
Capability executed-by  Specialist
Provider   satisfies    Capability
Plugin     contributes  Capability | Specialist | Workflow | Constraint
Manifest   references   Capability | Specialist | Provider | Plugin
Decision   supersedes   Decision | Principle
Asset      produces     Artifact
```

## Conceitos eliminados (anti-duplicação)

- **Adapter** deixa de existir como conceito separado: é um **Provider** (ADR-0008).
- **Knowledge Asset** e **Artifact** deixam de ser sinônimos: fonte vs derivado (ADR-0005).
- **Project** não é um arquivo: é o agregado do Manifest.
