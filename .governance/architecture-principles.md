# Architecture Principles

> Permanentes. Invariantes **técnicos** que o desenvolvimento do R4 EOS preserva. Mudanças exigem ADR.
>
> Realizam os valores de `FOUNDATION.md`. Onde houver sobreposição, o FOUNDATION é a fonte.

## 1. Small Kernel
O núcleo permanece o menor possível. Qualquer responsabilidade que possa ser extensão fica fora do núcleo. Crescer o núcleo exige ADR e justificativa explícita.

## 2. Protocol over Program
O R4 EOS é um conjunto de definições declarativas versionadas, não um runtime. Preferir definição durável a execução bespoke.

## 3. Knowledge First
A arquitetura gira em torno do modelo de conhecimento. Conhecimento é o ativo; código é meio substituível.

## 4. Single Source of Truth
Nenhuma informação existe em mais de um local canônico — inclusive nesta governança.

## 5. Tool Independence
Papel, competência e execução são separados. Trocar de ferramenta é trocar de Provider, sem tocar no resto.

## 6. Determinism
Toda derivação é pura e reprodutível: mesma entrada → mesma saída. Sem estado oculto, sem rede, sem segredos no conhecimento.

## 7. Version Everything
Decisões e definições estruturais são versionadas, com compatibilidade e migração explícitas.

## 8. Grow on Demand
A complexidade cresce quando há uso real, nunca por antecipação. Abstração prematura é tratada como dívida.

## 9. Reversibility
Preferir decisões reversíveis. Decisões irreversíveis exigem ADR e revisão reforçada.
