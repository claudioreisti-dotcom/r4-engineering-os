// Validate each asset against the Meta-Model envelope and the Ontology type rules.
// Deterministic: same input → same ordered errors.

import type { Issue, Kernel, KnowledgeAsset } from "./types.ts";

export function validate(kernel: Kernel, assets: KnowledgeAsset[]): Issue[] {
  const errors: Issue[] = [];
  const { metaModel, ontology } = kernel;
  const verbs = new Set(metaModel.relation_verbs);
  const states = new Set(metaModel.lifecycle.states);

  for (const asset of assets) {
    const id = asset?.id ?? "(no id)";
    const src = asset?._source;
    const err = (message: string) => errors.push({ level: "error", assetId: id, source: src, message });

    // Malformed YAML (untrusted input): report and skip further checks for this file.
    if (asset?._parseError) {
      err(`YAML inválido: ${asset._parseError}`);
      continue;
    }

    // Envelope — required fields.
    for (const field of metaModel.envelope.required) {
      if ((asset as unknown as Record<string, unknown>)?.[field] === undefined) err(`envelope: campo obrigatório ausente: '${field}'`);
    }
    if (asset?.lifecycle && !states.has(asset.lifecycle)) err(`lifecycle inválido: '${asset.lifecycle}'`);

    // Type — must exist in Ontology and be active.
    const typeDef = asset?.type ? ontology.types[asset.type] : undefined;
    if (!asset?.type) {
      // already reported by envelope check
    } else if (!typeDef) {
      err(`type desconhecido na Ontology: '${asset.type}'`);
    } else if (typeDef.status !== "active") {
      err(`type '${asset.type}' está dormente (status=${typeDef.status}); não pode ter instâncias`);
    } else {
      // Required spec fields for the type.
      for (const field of typeDef.required_spec ?? []) {
        if (asset.spec?.[field] === undefined) err(`spec: campo obrigatório ausente para type '${asset.type}': '${field}'`);
      }
      // Relations — canonical verb + allowed for this type.
      const allowed = new Set(typeDef.allowed_relations ?? []);
      for (const rel of asset.relations ?? []) {
        if (!verbs.has(rel.verb)) err(`relation com verbo não canônico: '${rel.verb}'`);
        else if (!allowed.has(rel.verb)) err(`relation '${rel.verb}' não permitida para type '${asset.type}'`);
        if (!rel.target) err(`relation '${rel.verb}' sem target`);
      }
    }
  }
  return errors;
}
