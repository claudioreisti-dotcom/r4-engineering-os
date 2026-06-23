# Example — DOK1 (downstream project)

Demonstra um projeto **governado pelo R4 EOS** que **reusa o Kernel** sem copiá-lo.

DOK1 possui seu próprio `manifest.yaml` (que pina `kernel_version: 1.0.0`) e seu próprio
`knowledge/` (specialists, capabilities, providers, mais contexto de domínio e compliance
de saúde — LGPD/SBIS/FHIR). O Kernel (`kernel/`) vem do repositório do EOS.

Validação:

```bash
cd packages/engine
node src/cli.ts validate --project ../../examples/dok1
```

> Em produção, DOK1 seria um repositório próprio que depende de uma versão pinada do EOS
> (ADR-0014: reference projects são downstream). Aqui ele vive em `examples/` apenas para
> demonstrar o reuso do Kernel na V1.
