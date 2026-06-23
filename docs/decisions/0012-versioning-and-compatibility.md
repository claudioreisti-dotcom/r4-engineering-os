# ADR-0012: Versioning and Compatibility

## Status

Accepted

## Context

"Version Everything" era princípio sem arquitetura de versionamento. Evolução de schema entre múltiplos projetos é um risco central de longo prazo.

## Decision

- O **Kernel** segue **SemVer**.
- Mudança incompatível no Meta-Model, Ontology ou Manifest Model = **major**, exigindo ADR + documento de migração.
- **Projetos pinam** a versão do Kernel no Manifest (`requires`).
- **Extensões** (Providers/Plugins) declaram compatibilidade via `requires` (faixa de versão do Kernel).

## Rationale

Pinagem + migração explícita permitem evoluir o Kernel sem quebrar projetos silenciosamente.

## Consequences

- Toda quebra de compatibilidade é rastreável e migrável.
- O `engineering_os.version` de um projeto significa "versão do Kernel a que adere".
