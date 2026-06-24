// Integration tests over real files: the EOS repo itself, plus a synthetic downstream
// project written to a temp dir (proves multi-project reuse without a committed example).

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runFromRoot, runForProject } from "../src/engine.ts";

const repoRoot = join(import.meta.dirname, "..", "..", "..");

test("EOS repo validates against its own Kernel", () => {
  const r = runFromRoot(repoRoot);
  assert.equal(r.valid, true, JSON.stringify(r.errors, null, 2));
  assert.ok(r.artifacts.length > 0);
});

test("a downstream project validates reusing the EOS Kernel", () => {
  const dir = mkdtempSync(join(tmpdir(), "r4-proj-"));
  try {
    writeFileSync(join(dir, "manifest.yaml"),
      "id: manifest/x\ntype: manifest\nversion: 1.0.0\nlifecycle: active\n" +
      "relations:\n  - { verb: references, target: specialist/x }\n" +
      "spec:\n  identity: { name: X, type: t, owner: o, governor: g }\n  kernel_version: 1.0.0\n" +
      "  governance: { model: human-governed, decision_authority: human }\n");
    mkdirSync(join(dir, "knowledge", "specialists"), { recursive: true });
    writeFileSync(join(dir, "knowledge", "specialists", "x.yaml"),
      "id: specialist/x\ntype: specialist\nversion: 1.0.0\nlifecycle: active\n" +
      "spec:\n  mission: m\n  responsibilities: [r1]\n");
    const r = runForProject(repoRoot, dir);
    assert.equal(r.valid, true, JSON.stringify(r.errors, null, 2));
    assert.equal(r.assets.length, 2);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("malformed YAML is reported as an error, not a crash", () => {
  const dir = mkdtempSync(join(tmpdir(), "r4-bad-"));
  try {
    writeFileSync(join(dir, "manifest.yaml"),
      "id: manifest/x\ntype: manifest\nversion: 1.0.0\nlifecycle: active\n" +
      "spec:\n  identity: { name: X, type: t, owner: o, governor: g }\n  kernel_version: 1.1.0\n" +
      "  governance: { model: human-governed, decision_authority: human }\n");
    mkdirSync(join(dir, "knowledge", "principles"), { recursive: true });
    // colon-in-scalar → invalid compact mapping
    writeFileSync(join(dir, "knowledge", "principles", "bad.yaml"),
      "id: principle/x\ntype: principle\nversion: 1.0.0\nlifecycle: active\nspec:\n  statement: foo: bar baz\n");
    const r = runForProject(repoRoot, dir);
    assert.equal(r.valid, false);
    assert.ok(r.errors.some((e) => e.message.includes("YAML inválido")));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a directory with no R4 EOS manifest is rejected (no false-pass)", () => {
  const dir = mkdtempSync(join(tmpdir(), "r4-empty-"));
  try {
    const r = runForProject(repoRoot, dir);
    assert.equal(r.valid, false);
    assert.ok(r.errors.some((e) => e.message.includes("nenhum manifest")));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
