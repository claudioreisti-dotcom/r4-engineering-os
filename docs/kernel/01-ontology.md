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

### Workflow *(ativo desde v1.2.0 — ADR-0021)*

- **Propósito:** representar um processo ordenado e seus pontos de decisão (o *como*),
  **estritamente descritivo** — reutiliza capabilities existentes nos passos.
- **Responsabilidade:** descrever a sequência e os gates; não duplicar a definição da Capability.
- **Relações:** `realizes` → Capability; `references` → Capability (usada em um passo).
- **`spec.steps`:** lista ordenada; cada passo é uma referência a capability **ou** um `gate`
  com ator explícito (`human` | `automated`). Ordem intrínseca à lista.
- **Não-objetivos (ADR-0021):** sem execução, sem controle de fluxo (condicionais/loops/
  paralelismo/retries/timeouts), não-orquestração. O Engine **nunca** executa workflows.
- **Ciclo de vida:** `draft → active → deprecated`.

### Provider

- **Propósito:** declarar um backend de execução externo (Claude, Codex, Gemini, ChatGPT, Cursor).
- **Responsabilidade:** declarar quais Capabilities pode satisfazer e seu contrato de configuração. **Não** guarda credenciais nem estado de runtime.
- **Relações:** `satisfies` → Capability.
- **Ciclo de vida:** `draft → active → deprecated`.

### Component *(ativo desde v1.1.0)*

- **Propósito:** módulo, app, serviço ou package do projeto (o *de quê é feito*).
- **Responsabilidade:** representar uma unidade estrutural do projeto.
- **Relações:** `requires` → Component | Resource; `references`.
- **Ciclo de vida:** `draft → active → deprecated`.

### Resource *(ativo desde v1.1.0)*

- **Propósito:** recurso de infraestrutura do qual o projeto depende (db, cache, fila, storage).
- **Responsabilidade:** declarar a dependência de infraestrutura; **nunca** guarda segredos.
- **Relações:** `requires`.
- **Ciclo de vida:** `draft → active → deprecated`.

### Principle *(ativo desde v1.1.0)*

- **Propósito:** invariante de produto ou arquitetura (regra inviolável).
- **Responsabilidade:** servir de fundamento estável para decisões.
- **Relações:** `supersedes`.
- **Ciclo de vida:** `active → superseded` (raramente; via Decision).

### Plugin *(dormente)*

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
