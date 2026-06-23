// The Knowledge Engine — a pure, deterministic, stateless function (ADR-0009).
// run(kernel, assets) → { valid, errors, artifacts }. No I/O, no network, no AI.

import type { EngineResult, Kernel, KnowledgeAsset } from "./types.ts";
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

/** Convenience: load from a repository root, then run. The only I/O entry point. */
export function runFromRoot(root: string): EngineResult {
  return run(loadKernel(root), loadAssets(root));
}

/**
 * Validate a downstream project that reuses the EOS Kernel.
 * Kernel comes from the EOS root; assets (manifest + knowledge) from the project dir.
 * This is how a project like DOK1 is governed by a pinned Kernel without copying it.
 */
export function runForProject(eosRoot: string, projectRoot: string): EngineResult {
  return run(loadKernel(eosRoot), loadAssets(projectRoot));
}
