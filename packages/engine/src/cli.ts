#!/usr/bin/env node
// R4 EOS CLI — thin wrapper over the Knowledge Engine.
// Commands: validate | generate [--check]
// Exit code 0 = ok, 1 = invalid/out-of-sync, 2 = usage error.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve as resolvePath } from "node:path";
import { runFromRoot } from "./engine.ts";
import type { Issue } from "./types.ts";

function findRoot(start: string): string {
  let dir = start;
  for (let i = 0; i < 12; i++) {
    if (existsSync(join(dir, "kernel", "meta-model.yaml"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return start;
}

function printErrors(errors: Issue[]): void {
  for (const e of errors) {
    console.error(`  ✗ [${e.assetId}] ${e.message}${e.source ? `  (${e.source})` : ""}`);
  }
}

function main(argv: string[]): number {
  const cmd = argv[0];
  const check = argv.includes("--check");
  const root = findRoot(resolvePath(process.cwd()));

  if (cmd !== "validate" && cmd !== "generate") {
    console.error("uso: r4 <validate|generate> [--check]");
    return 2;
  }

  const result = runFromRoot(root);

  if (!result.valid) {
    console.error(`✗ validação falhou: ${result.errors.length} erro(s) em ${result.assets.length} asset(s).`);
    printErrors(result.errors);
    return 1;
  }
  console.log(`✓ validação ok: ${result.assets.length} asset(s), 0 erro(s).`);

  if (cmd === "validate") return 0;

  // generate
  let drift = 0;
  for (const art of result.artifacts) {
    const full = join(root, art.path);
    const current = existsSync(full) ? readFileSync(full, "utf8") : null;
    if (check) {
      if (current !== art.content) {
        drift++;
        console.error(`  ✗ desatualizado: ${art.path}`);
      }
    } else {
      mkdirSync(dirname(full), { recursive: true });
      writeFileSync(full, art.content);
      console.log(`  ↻ ${art.path}`);
    }
  }
  if (check && drift > 0) {
    console.error(`✗ ${drift} artefato(s) derivado(s) fora de sincronia. Rode 'r4 generate'.`);
    return 1;
  }
  console.log(check ? "✓ derivados em sincronia." : `✓ ${result.artifacts.length} artefato(s) gerado(s).`);
  return 0;
}

process.exit(main(process.argv.slice(2)));
