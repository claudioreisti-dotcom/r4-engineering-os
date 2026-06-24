# Changelog — R4 EOS Kernel

O Kernel segue SemVer (ADR-0012). Projetos pinam `kernel_version` no manifest.

## 1.2.0

- Ontologia: ativado o tipo `workflow` como conceito descritivo de primeira classe (ADR-0021).
- Estritamente descritivo: passos ordenados + gates explícitos, reutilizando capabilities.
  Sem execução, sem controle de fluxo, sem orquestração. O Engine nunca executa workflows.
- Aditivo e não-quebrável: meta-modelo inalterado; projetos em 1.0.0/1.1.0 continuam válidos.

## 1.1.0

- Ontologia: ativados os tipos `component`, `resource`, `principle` (ADR-0020).
- Aditivo e não-quebrável: meta-modelo inalterado; projetos em 1.0.0 continuam válidos.

## 1.0.0

- Kernel inicial: meta-model (4 primitivos + Artifact), ontology (manifest, specialist,
  capability, provider), YAML language, manifest model, boundaries (Missions 0003/0004).
