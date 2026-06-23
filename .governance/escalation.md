# Escalation

> Permanente. Define como uma divergência é resolvida quando há desacordo entre Specialists ou entre Providers.

## Princípio

Divergência é saudável e deve ser **visível**. Nunca é resolvida silenciosamente. Nenhum Specialist tem autoridade para sobrepor outro — Specialists não detêm autoridade de decisão. A decisão final é sempre do Human Governor.

## Quando escalar

- Dois Specialists discordam sobre uma decisão dentro de uma Missão.
- Dois Providers (ex.: autor e revisor) chegam a conclusões conflitantes.
- Um Specialist julga uma instrução inconsistente com os Principles ou com um ADR vigente.

## Processo

1. **Resolução no nível de trabalho.** As partes expõem posições e evidências e tentam convergir. A maioria das divergências termina aqui.
2. **Registro.** Se não houver convergência, a divergência é documentada — no PR ou em ADR — com **ambas as posições** e seus trade-offs. Nenhuma é apagada.
3. **Escalonamento ao Human Governor.** O Governor decide. Se a decisão for estrutural, ela vira um ADR (ver [`decision-process.md`](decision-process.md)).
4. **Fechamento.** A decisão do Governor encerra a divergência; a objeção registrada permanece como memória do projeto.

## Divergência entre Providers

Quando autor e revisor são Providers distintos e discordam, o desacordo não é resolvido por autoridade de nenhum dos dois: segue o mesmo processo acima e termina no Human Governor. A independência da revisão é preservada — o revisor nunca é o autor.

## O que esta política não faz

- Não cria hierarquia entre Specialists.
- Não transfere autoridade de decisão para nenhum Provider.
- Não permite resolver divergência fora do repositório (nada estratégico fica só em chat).
