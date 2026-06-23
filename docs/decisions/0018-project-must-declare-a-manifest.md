# ADR-0018: A Project Must Declare Exactly One Manifest

## Status

Accepted

## Context

Ao validar o R4 EOS contra o DOK1 real, o Engine reportou um diretório **sem nenhum
conhecimento R4 EOS** como `válido (0 assets, 0 erros)` — um falso positivo. A causa: o
Engine validava o conjunto de assets, mas não exigia que um *projeto* se declarasse.

## Decision

Tornar invariante de projeto (ADR-0011): **um projeto é declarado por exatamente um asset
do tipo `manifest`**. Ao validar a partir de uma raiz de projeto (`runFromRoot`,
`runForProject`), zero manifests ou mais de um → erro.

A regra vale apenas no limite de projeto (carregamento por raiz), não para conjuntos
arbitrários de assets (a função pura `run` permanece genérica).

## Rationale

Sem isso, qualquer diretório (inclusive um projeto que não adotou o R4 EOS, como o DOK1
real) passaria silenciosamente. A validação tem de ser honesta: "não declarado" não é
"válido".

## Consequences

- `validate --project <dir>` falha com mensagem clara quando o diretório não é um projeto
  R4 EOS.
- Expõe que governar um projeto brownfield exige primeiro **bootstrap** para o formato
  R4 EOS — capacidade ainda inexistente (ver journal `0001-dok1-real-validation`).
