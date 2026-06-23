# Kernel — Manifest Model

> Modelo **conceitual** do Engineering Manifest. Não é o schema YAML (implementação futura).
> Congelado por ADR-0011.

## Propósito

O Manifest é o documento de identidade de um Project: declara o que o projeto é e **compõe**, por referência, os Assets que o governam. É o ponto de entrada que transforma um repositório qualquer em um Project governado pelo R4 EOS.

## Princípio inegociável

**O Manifest referencia; nunca redefine.** Ele aponta para Capabilities, Specialists, Providers e Plugins por `id`. Não copia missão de Specialist, nem passos de Capability, nem config de Provider. Isso elimina a divergência de SSOT (ex.: dois manifests com campos divergentes) na raiz.

## Blocos conceituais

1. **Identity** — nome, tipo de projeto, owner, governor.
2. **Kernel Binding** — versão do Kernel a que o projeto adere (`requires`). Habilita versionamento e migração explícita.
3. **Governance** — modelo (human-governed / ai-driven) e autoridade de decisão do projeto.
4. **Composition** — referências por `id` a: Capabilities habilitadas, Specialists ativos, Providers disponíveis, Plugins instalados.
5. **Context** *(opcional)* — domínio/indústria do projeto.
6. **Compliance** *(opcional)* — regimes aplicáveis (ex.: LGPD, SBIS, FHIR).
7. **Knowledge Map** — convenção de onde vivem os Assets do projeto.

## Relações

- `Manifest references Capability | Specialist | Provider | Plugin`
- `Manifest requires <kernel-version>`

## Lifecycle

`draft → active`, evoluindo junto com o Project. Mudanças de composição são commits versionados; mudanças incompatíveis de Kernel exigem migração (ADR-0012).

## Dogfooding

O próprio repositório do R4 EOS possui um Manifest (`manifest.yaml` na raiz, Sprint futura) que o declara como um Project — separando claramente "o EOS como produto" de "este repo como instância governada".

## Fora do escopo desta missão

- O schema YAML completo do Manifest.
- A lista canônica de tipos de projeto, domínios e regimes de compliance (cada um será um conjunto de Assets sob Grow on Demand).
