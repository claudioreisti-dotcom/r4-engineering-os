# Documentation Principles

> Permanentes. Como o conhecimento é documentado no R4 EOS. Mudanças exigem ADR.

## 1. Fonte estruturada primeiro
Conteúdo canônico nasce em formato estruturado e declarativo. Documentação legível é **derivada** dele — nunca o contrário.

## 2. Source vs Derived
O que é autorado é fonte de verdade. O que é gerado é derivado, nunca editado à mão, sempre reconstruível. Editar um artefato derivado é proibido.

## 3. Single Source of Truth
Cada fato vive em um único lugar. Listas, índices e catálogos são derivados — nunca cópias mantidas em paralelo.

## 4. Sem documentação órfã
Todo documento tem um dono e uma razão de existir. Documento que ninguém mantém é removido ou promovido a fonte.

## 5. Conhecimento, não conversa
Decisões e descobertas relevantes saem do chat e viram documento versionado (Mission, ADR, asset).

## 6. Idioma e clareza
A documentação do projeto é mantida em português (pt-BR), salvo termos técnicos consagrados. Clareza e concisão acima de completude decorativa.

## 7. Documentação é parte do Done
Uma entrega não está concluída se sua documentação canônica não estiver consistente (ver `definition-of-done.md`).
