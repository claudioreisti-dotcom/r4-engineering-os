// The Knowledge Engine — a pure, deterministic, stateless function (ADR-0009).
// run(kernel, assets) → { valid, errors, artifacts }. No I/O, no network, no AI.

import type { EngineResult, Issue, Kernel, KnowledgeAsset } from "./types.ts";
import { validate } from "./validate.ts";
import { resolve } from "./resolve.ts";
import { generate } from "./generate.ts";
import { loadKernel, loadAssets } from "./load.ts";

export function run(kernel: Kernel, assets: KnowledgeAsset[]): EngineResult {
  const errors = [...validate(kernel, assets), ...resolve(assets)];
  const valid = errors.length === 0;
  // Artifacts are only derived from a valid knowledge graph.
  const artifacts = valid ? generate(assets) : [];
  return { valid, assets, errors, artifacts };
}

/**
 * Project-level invariant (ADR-0011): a project is declared by exactly one manifest.
 * Applied at the project boundary (loading from a root), not to arbitrary asset sets.
 * Without this, a directory with no R4 EOS knowledge would falsely validate.
 */
export function projectIssues(assets: KnowledgeAsset[]): Issue[] {
  const manifests = assets.filter((a) => a?.type === "manifest");
  if (manifests.length === 0)
    return [{
      level: "error",
      assetId: "(project)",
      message: "nenhum manifest do R4 EOS encontrado: o diretório não é um projeto governado pelo R4 EOS (ADR-0011)",
    }];
  if (manifests.length > 1)
    return [{
      level: "error",
      assetId: "(project)",
      message: `um projeto deve declarar exatamente um manifest; encontrados ${manifests.length}`,
    }];
  return [];
}

function runProject(kernel: Kernel, assets: KnowledgeAsset[]): EngineResult {
  const errors = [...projectIssues(assets), ...validate(kernel, assets), ...resolve(assets)];
  const valid = errors.length === 0;
  return { valid, assets, errors, artifacts: valid ? generate(assets) : [] };
}

/** Convenience: load from a repository root, then run with the project invariant. */
export function runFromRoot(root: string): EngineResult {
  return runProject(loadKernel(root), loadAssets(root));
}

/**
 * Validate a downstream project that reuses the EOS Kernel.
 * Kernel comes from the EOS root; assets (manifest + knowledge) from the project dir.
 * This is how a project like DOK1 is governed by a pinned Kernel without copying it.
 */
export function runForProject(eosRoot: string, projectRoot: string): EngineResult {
  return runProject(loadKernel(eosRoot), loadAssets(projectRoot));
}
