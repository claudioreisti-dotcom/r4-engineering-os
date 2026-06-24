# Existing Project Adoption — Process

> Processo reproduzível para incorporar **qualquer** projeto existente ao R4 EOS.
> Regra de ouro: **nunca adaptar o projeto; sempre adaptar o R4 EOS.** O DOK1 é apenas o
> primeiro caso de validação, não uma exceção.

## Papéis

- **Adoption Specialist** (`specialist/adoption`) — executa Discovery, autora a proposta.
- **Human Governor** — aprova a proposta antes de qualquer bootstrap.
- **Knowledge Engine** — fornece fatos determinísticos (`r4 discover`) e valida o resultado.

## Fases

### 1. Project Discovery (determinístico, somente leitura)
`r4 discover <dir>` extrai **fatos estruturais** — package manager, stack, workspaces,
membros, scripts, tasks, deployables, serviços, convenções, inventário de docs. Não
interpreta, não julga, não escreve. (ADR-0009)

### 2. Project Profile
Os fatos são consolidados em um perfil: stack, arquitetura, módulos, convenções,
ferramentas, riscos, maturidade, documentação. A leitura interpretativa (ex.: domínio,
compliance descritos em prosa) é feita pelo Adoption Specialist — não pelo Engine.

### 3. Governance Proposal
O Adoption Specialist **autora** uma proposta (não aplica): Engineering Manifest,
knowledge inicial, Specialists/Capabilities/Providers sugeridos, e **riscos e conflitos**
(inclusive lacunas de ontologia). Nenhuma alteração é aplicada automaticamente.

### 4. Human Approval (gate)
O Human Governor revisa a proposta. **Somente após aprovação** se prossegue.

### 5. Bootstrap
Após aprovação: gerar os arquivos do R4 EOS e **abrir um Pull Request** no repositório do
projeto. Nunca alterar diretamente a branch principal. O Engine valida o resultado.

## Invariantes

- O projeto-alvo nunca é modificado para fazer o R4 EOS funcionar.
- Discovery é determinística e sem efeitos colaterais.
- A interpretação é trabalho de IA (Specialist); a validação é determinística (Engine).
- Todo bootstrap ocorre via Pull Request.
