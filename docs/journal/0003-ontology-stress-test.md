# Journal 0003 — Ontology Stress Test (Mission 0010)

## Hipótese

Se a ontologia v1.1 representa 5 projetos radicalmente diferentes sem mudança, ela
generaliza — e não foi moldada apenas ao DOK1.

## Método

Cinco projetos sintéticos em `examples/stress/`, escolhidos para fugir do domínio web/saúde
do DOK1, modelados só com os tipos ativos (manifest, component, resource, principle,
specialist) e validados pelo Engine reusando o Kernel.

| Projeto | Stress | Resultado |
|---|---|---|
| rust-cli | binário único, **sem infraestrutura** | ✓ 0 erros |
| flutter-mobile | app + serviço de push | ✓ 0 erros |
| ml-pipeline | jobs batch + data-warehouse + scheduler | ✓ 0 erros |
| embedded-firmware | RTOS + **periférico de hardware** como resource | ✓ 0 erros |
| solidity-dapp | contratos + **nó RPC de blockchain** | ✓ 0 erros |

## Resultado

- **Ontologia inalterada.** Nenhum tipo, verbo ou campo novo foi necessário. `component.kind`
  e `resource.kind` (texto livre) absorveram desde `binary` até `blockchain-rpc-node`.
- **Robustez do Engine (não ontologia):** um fixture com YAML malformado fez o Engine
  lançar exceção. Corrigido: arquivos malformados viram erro "YAML inválido" reportado,
  nunca crash — necessário para adoção de projetos reais.

## Observação honesta

`kind` é texto livre: máxima flexibilidade (aceita qualquer arquétipo), porém sem validação
de vocabulário. Se um dia for preciso restringir/normalizar kinds, faz-se sob Grow on Demand.

## Conclusão

A ontologia ganhou o direito de governar o DOK1. Bootstrap desbloqueado (aguarda aprovação).
