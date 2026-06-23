# Kernel — YAML Language

> Define convenções, princípios, organização e composição da linguagem declarativa.
> **Não** define schemas completos (isso é implementação futura). Congelado por ADR-0004.

## Princípios

1. **YAML é fonte; Markdown é derivado.** Nunca o contrário. Nenhum conteúdo canônico nasce em Markdown.
2. **Um arquivo = um KnowledgeAsset.** Sem múltiplos assets por arquivo, sem asset espalhado em vários arquivos.
3. **Envelope universal.** Todo arquivo segue o mesmo envelope do Meta-Model; só `spec` varia por tipo.
4. **Referência, nunca redefinição.** Um asset aponta para outro por `id`. Jamais copia o conteúdo do outro.
5. **Determinismo.** A ordem das chaves e a normalização são estáveis, para derivação reprodutível e diffs limpos.

## Envelope (forma, não schema)

Todo asset declara, no mínimo: `id`, `type`, `version`, `lifecycle`, `relations`, `spec`.

- `id` é único, estável e legível (kebab-case namespaced por tipo, ex.: `specialist/architecture`).
- `relations` lista verbos canônicos do Meta-Model apontando para outros `id`.
- `spec` contém só o que é específico do `type`.

> A forma concreta de cada `spec` (campos obrigatórios por tipo) será congelada em Sprint de implementação, sob Grow on Demand — não nesta missão.

## Organização

- Assets canônicos vivem em `knowledge/<tipo-plural>/` (ex.: `knowledge/specialists/`).
- Um `id` mapeia para um caminho previsível, mas o `id` — não o caminho — é a identidade.
- Artifacts derivados vivem separados dos fontes (ver Monorepo, Sprint futura). Mover um arquivo não muda seu `id`.

## Composição

- Sistemas maiores são **compostos por referência**: um Manifest referencia Capabilities/Specialists/Providers/Plugins por `id`; um Plugin contribui assets por `id`.
- Não há herança nem include textual. Composição é sempre via Relations tipadas — o grafo é explícito.
- A resolução do grafo (quem referencia quem, o que falta) é responsabilidade do Knowledge Engine, não do autor.

## O que esta linguagem NÃO faz

- Não tem lógica, condicionais nem templates embutidos. YAML descreve **fatos**, não comportamento.
- Não embute execução. Como algo é executado é problema do Provider, fora do conhecimento canônico.
- Não guarda segredos. Credenciais e estado de runtime não são conhecimento.
