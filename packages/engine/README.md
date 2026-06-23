# R4 EOS — Knowledge Engine

Interpretador **determinístico e sem estado** do conhecimento declarativo do R4 EOS
(ADR-0009). Não chama IA, não orquestra, não acessa rede. É uma função pura:

```
run(kernel, assets) → { valid, errors, artifacts }
```

## Pipeline

1. **load** — lê o Kernel (`kernel/*.yaml`) e os assets (`manifest.yaml`, `knowledge/**`).
2. **validate** — envelope (Meta-Model) + spec e relações por tipo (Ontology) + lifecycle.
3. **resolve** — unicidade de `id` (SSOT) e integridade referencial.
4. **generate** — deriva Artifacts Markdown em `generated/` (projeção pura).

## Uso

```bash
cd packages/engine
npm install
npm run validate   # valida o conhecimento do repositório
npm run generate   # regenera os artefatos derivados
npm run check      # falha se os derivados estiverem fora de sincronia (CI)
npm test           # testes do engine
npm run typecheck  # checagem de tipos
```

Requer Node ≥ 22 (executa TypeScript via type-stripping nativo; sem passo de build).

## Fronteira

O Engine é ferramenta de suporte, **fora do Kernel** e substituível. Trocar a stack não
toca no conhecimento em YAML. Ver `docs/kernel/04-kernel-boundaries.md` e ADR-0009.
