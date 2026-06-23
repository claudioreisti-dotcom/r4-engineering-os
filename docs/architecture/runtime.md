# Runtime Model

## Purpose

O Runtime interpreta o Engineering Manifest de um projeto e instancia a governança, workforce, plugins e capabilities necessárias.

## Responsibilities

- Ler o Engineering Manifest.
- Validar o projeto.
- Carregar plugins.
- Determinar a Workforce.
- Determinar capabilities disponíveis.
- Preparar adapters.
- Executar quality gates.

## Non-Responsibilities

O Runtime não contém regras de domínio.

O Runtime não conhece DOK1, iVet ou IAReis.

O Runtime não depende de Claude, Codex ou qualquer modelo específico.
