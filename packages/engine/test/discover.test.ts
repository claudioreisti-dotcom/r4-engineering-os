// Tests for deterministic project discovery (read-only).

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { discover } from "../src/discover.ts";

function fixture(): string {
  const dir = mkdtempSync(join(tmpdir(), "r4-disc-"));
  writeFileSync(join(dir, "package.json"), JSON.stringify({
    name: "demo", version: "1.2.3", packageManager: "pnpm@10", engines: { node: ">=22" },
    scripts: { build: "x", test: "y" },
  }));
  writeFileSync(join(dir, "pnpm-lock.yaml"), "");
  writeFileSync(join(dir, "pnpm-workspace.yaml"), "packages:\n  - \"apps/*\"\n");
  writeFileSync(join(dir, "tsconfig.json"), "{}");
  writeFileSync(join(dir, "Dockerfile.api"), "");
  writeFileSync(join(dir, "AGENTS.md"), "");
  mkdirSync(join(dir, "apps", "api"), { recursive: true });
  mkdirSync(join(dir, "docs"), { recursive: true });
  writeFileSync(join(dir, "docs", "PRD.md"), "x");
  return dir;
}

test("discover extracts deterministic structural facts", () => {
  const dir = fixture();
  try {
    const p = discover(dir);
    assert.equal(p.name, "demo");
    assert.equal(p.version, "1.2.3");
    assert.equal(p.packageManager, "pnpm@10");
    assert.equal(p.node, ">=22");
    assert.equal(p.language, "typescript");
    assert.deepEqual(p.monorepo.workspaces, ["apps/*"]);
    assert.deepEqual(p.monorepo.members, ["apps/api"]);
    assert.deepEqual(p.scripts, ["build", "test"]);
    assert.deepEqual(p.deployables.dockerfiles, ["Dockerfile.api"]);
    assert.ok(p.conventions.includes("AGENTS.md"));
    assert.deepEqual(p.docs, ["docs/PRD.md"]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("discover is read-only and tolerant of a bare directory", () => {
  const dir = mkdtempSync(join(tmpdir(), "r4-bare-"));
  try {
    const p = discover(dir);
    assert.equal(p.name, null);
    assert.deepEqual(p.monorepo.members, []);
    assert.deepEqual(p.conventions, []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
