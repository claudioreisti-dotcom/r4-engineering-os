// Ontology Stress Test (Mission 0010): 5 radically different projects must validate
// against the current Kernel WITHOUT any ontology change. If any fails, the ontology
// has a gap — the test (and the mission) fails honestly.

import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { runForProject } from "../src/engine.ts";

const repoRoot = join(import.meta.dirname, "..", "..", "..");
const projects = ["rust-cli", "flutter-mobile", "ml-pipeline", "embedded-firmware", "solidity-dapp"];

for (const p of projects) {
  test(`stress: ${p} validates with the unchanged Kernel`, () => {
    const r = runForProject(repoRoot, join(repoRoot, "examples", "stress", p));
    assert.equal(r.valid, true, `${p}: ${JSON.stringify(r.errors, null, 2)}`);
  });
}
