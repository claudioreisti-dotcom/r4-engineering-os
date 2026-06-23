# Implementation Principles

> Permanentes. Como código será escrito quando a implementação começar. Mudanças exigem ADR.
>
> A implementação ainda não começou; estes princípios a governam desde o primeiro commit de código.

## 1. Código é substituível; conhecimento é durável
Nenhum ativo durável depende de um runtime específico. Dados e definições sobrevivem à reescrita do código.

## 2. Determinismo e ausência de estado oculto
Ferramentas que derivam conhecimento são puras e reprodutíveis: mesma entrada → mesma saída. Sem efeitos colaterais não declarados, sem rede implícita.

## 3. Especificação antes de código
Implementação é consequência de uma especificação aprovada. Não se implementa o que não foi especificado e congelado.

## 4. Menor dependência possível
Cada dependência externa é um passivo. Adicioná-la exige justificativa e (quando relevante) ADR. Preferir o que é simples e estável a 10 anos.

## 5. Sem abstração prematura
Implementar o que a Missão exige, não o que se imagina precisar (Grow on Demand). Generalização sem caso de uso é dívida.

## 6. Segredos nunca no repositório
Credenciais e estado de runtime ficam no ambiente, jamais no conhecimento versionado.

## 7. Testabilidade e reprodutibilidade
O que é implementado deve ser verificável de forma automática e reproduzível em CI, sem depender de uma máquina específica.

## 8. Reversibilidade
Preferir mudanças incrementais e reversíveis. Toda entrega passa pelo fluxo de revisão antes de tocar `main`.
