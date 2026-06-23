// Resolve the asset graph: SSOT (unique ids) and referential integrity.

import type { Issue, KnowledgeAsset } from "./types.ts";

export function resolve(assets: KnowledgeAsset[]): Issue[] {
  const errors: Issue[] = [];
  const byId = new Map<string, KnowledgeAsset>();

  // SSOT — unique ids.
  for (const asset of assets) {
    if (!asset?.id) continue;
    const existing = byId.get(asset.id);
    if (existing) {
      errors.push({
        level: "error",
        assetId: asset.id,
        source: asset._source,
        message: `id duplicado (viola SSOT): também em '${existing._source}'`,
      });
    } else {
      byId.set(asset.id, asset);
    }
  }

  // Referential integrity — every relation target must exist.
  for (const asset of assets) {
    for (const rel of asset.relations ?? []) {
      if (rel.target && !byId.has(rel.target)) {
        errors.push({
          level: "error",
          assetId: asset.id ?? "(no id)",
          source: asset._source,
          message: `relation '${rel.verb}' aponta para id inexistente: '${rel.target}'`,
        });
      }
    }
  }
  return errors;
}
