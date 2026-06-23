# Kernel — Meta-Model

> Nível 1 da fundação. Imutável sem ADR. Define a linguagem na qual toda a Ontology é expressa.
> Congelado por ADR-0003.

## Propósito

O Meta-Model define **com o que** o R4 EOS descreve qualquer coisa. É deliberadamente minúsculo: mantê-lo pequeno é o que mantém o Kernel pequeno. Tudo o que o sistema conhece é expresso por **4 primitivos** e **1 derivado**.

## Primitivos (4)

### 1. KnowledgeAsset

Unidade canônica e autorada de conhecimento. É a única forma de fonte de verdade no sistema.

Todo KnowledgeAsset possui um **envelope comum**:

| Campo | Significado |
|---|---|
| `id` | Identificador único e estável em todo o sistema (SSOT). |
| `type` | Um tipo da Ontology (Specialist, Capability, Manifest…). |
| `version` | Versão do próprio asset. |
| `lifecycle` | Estado atual (ver primitivo Lifecycle). |
| `relations` | Lista de Relations para outros Assets. |
| `spec` | Conteúdo específico do tipo (varia por `type`). |

Só o `spec` varia entre tipos. O envelope é universal — é o que permite que CLI, Portal e validação operem genericamente sobre qualquer asset.

### 2. Relation

Aresta **tipada e direcionada** entre dois Assets. Conjunto fechado de verbos canônicos:

`owns` · `executes` · `realizes` · `requires` · `references` · `bound-to` · `contributes` · `satisfies` · `supersedes` · `produces` · `consumes`

Relations são declaradas no Asset de origem. Não existe relação implícita.

### 3. Constraint

Regra invariável verificável sobre o grafo de Assets. Constraints não são opinião: são checáveis de forma determinística (ver Invariantes).

### 4. Lifecycle

Máquina de estados de um Asset:

```
draft → active → deprecated → superseded
```

- `draft` — em elaboração; não é fonte autoritativa.
- `active` — fonte de verdade vigente.
- `deprecated` — válido, mas desencorajado; substituição prevista.
- `superseded` — substituído por outro Asset via Relation `supersedes`.

## Derivado (1)

### Artifact

Saída **gerada** a partir de um ou mais KnowledgeAssets. Nunca é fonte de verdade, nunca é editado à mão, é sempre reprodutível. Markdown, índices, JSON Schemas e páginas de portal são Artifacts. (Distinção congelada por ADR-0005.)

## Relacionamentos entre primitivos

- Um **KnowledgeAsset** referencia outros via **Relation**.
- Um **KnowledgeAsset** está sujeito a **Constraints**.
- Um **KnowledgeAsset** tem um estado de **Lifecycle**.
- Um **Artifact** é derivado de um ou mais **KnowledgeAssets** (Relation `produces`).

## Invariantes obrigatórias (Constraints do Kernel)

1. **Unicidade** — todo `id` é único em todo o sistema. (SSOT)
2. **Tipagem** — todo Asset tem um `type` pertencente à Ontology.
3. **Integridade referencial** — toda Relation aponta para um `id` existente.
4. **Acíclico onde exigido** — `supersedes` e `requires` não formam ciclos.
5. **Origem de Artifact** — todo Artifact tem ao menos um Asset de origem; nenhum Artifact é fonte de outro Asset.
6. **Fonte única** — nenhuma informação canônica existe em dois Assets.
7. **Estado válido** — todo Asset está em um estado de Lifecycle válido e as transições respeitam a ordem.

## Por que parar em 4+1

Qualquer conceito novo do domínio (Specialist, Provider, Decision…) é um **tipo** de KnowledgeAsset, não um primitivo novo. Adicionar um primitivo é a única mudança que exige reabrir o Meta-Model — e exige ADR. Essa é a barreira que mantém o Kernel pequeno por 10 anos.
