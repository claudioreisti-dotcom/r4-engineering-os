// Integration tests over real repo files: the EOS itself and the DOK1 downstream project.

import { test } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { runFromRoot, runForProject } from "../src/engine.ts";

const repoRoot = join(import.meta.dirname, "..", "..", "..");

test("EOS repo validates against its own Kernel", () => {
  const r = runFromRoot(repoRoot);
  assert.equal(r.valid, true, JSON.stringify(r.errors, null, 2));
  assert.ok(r.artifacts.length > 0);
});

test("DOK1 downstream project validates reusing the EOS Kernel", () => {
  const r = runForProject(repoRoot, join(repoRoot, "examples", "dok1"));
  assert.equal(r.valid, true, JSON.stringify(r.errors, null, 2));
  assert.equal(r.assets.length, 7);
});
