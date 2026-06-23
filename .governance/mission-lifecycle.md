# Mission Lifecycle

> Permanente. Define como uma Missão nasce, evolui e se encerra.

Uma **Mission** é a unidade de trabalho do R4 EOS. Substitui o "prompt": o Governor não pede tarefas, ele emite Missões com objetivo, deliverables, restrições e critérios de qualidade.

## Forma e local

- Cada Missão é um arquivo em `.missions/NNNN-titulo.md`, versionado.
- Possui frontmatter com, no mínimo: `mission`, `title`, `status`, `governor`, `specialist`, `reviewer`.
- A Missão é **memória permanente**. Após concluída, **não é apagada** — muda de `status`.

## Estados

```
draft → approved → in-progress → delivered → in-review
            │                                    │
            │                          changes-requested ⇄ in-review
            │                                    │
            └──────────────────────────────→ merged → archived
                                                 │
                                            superseded
```

| Estado | Significado |
|---|---|
| `draft` | Em elaboração pelo Governor; ainda não vale como diretriz. |
| `approved` | Aprovada pelo Governor; pronta para execução. |
| `in-progress` | Em execução pelo Architecture Specialist. |
| `delivered` | PR aberto; aguardando revisão. |
| `in-review` | Em Architecture Review. |
| `changes-requested` | Revisão pediu ajustes; volta para a mesma branch. |
| `merged` | Aprovada e integrada por decisão do Governor. |
| `archived` | Encerrada; permanece como memória. |
| `superseded` | Substituída por outra Missão. |
| `rejected` / `cancelled` | Encerrada sem merge (com motivo registrado). |

## Regras

1. **Uma Missão ativa por vez** em `in-progress`/`in-review`, salvo decisão explícita do Governor. Evita trabalho concorrente sobre a mesma fundação.
2. **Numeração** é sequencial e estável. Frações (ex.: `0002.5`) são permitidas para missões intercaladas; o número nunca é reutilizado.
3. **Toda Missão termina em PR**, nunca em alteração direta de `main`.
4. **Rastreabilidade:** o PR referencia a Missão; a Missão registra, ao final, o PR e os ADRs gerados.
5. **Escopo é contrato:** o Specialist não amplia o escopo da Missão por conta própria; descobertas fora do escopo viram proposta de nova Missão.
