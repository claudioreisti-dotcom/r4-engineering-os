// Load & parse the Kernel and all KnowledgeAssets from a repository root.
// Pure I/O boundary: no validation here.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { parse } from "yaml";
import type { Kernel, KnowledgeAsset, MetaModel, Ontology } from "./types.ts";

function readYaml(path: string): unknown {
  return parse(readFileSync(path, "utf8"));
}

function walkYaml(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walkYaml(full));
    else if (entry.endsWith(".yaml") || entry.endsWith(".yml")) out.push(full);
  }
  return out.sort();
}

export function loadKernel(root: string): Kernel {
  const metaModel = (readYaml(join(root, "kernel", "meta-model.yaml")) as { meta_model: MetaModel }).meta_model;
  const ontology = (readYaml(join(root, "kernel", "ontology.yaml")) as { ontology: Ontology }).ontology;
  return { metaModel, ontology };
}

export function loadAssets(root: string): KnowledgeAsset[] {
  const files: string[] = [];
  const manifest = join(root, "manifest.yaml");
  if (existsSync(manifest)) files.push(manifest);
  files.push(...walkYaml(join(root, "knowledge")));

  return files.map((file) => {
    const asset = readYaml(file) as KnowledgeAsset;
    asset._source = relative(root, file);
    return asset;
  });
}
