// Tests for the Knowledge Engine — deterministic, no I/O of real repo (fixtures inline).

import { test } from "node:test";
import assert from "node:assert/strict";
import { run, projectIssues } from "../src/engine.ts";
import type { Kernel, KnowledgeAsset } from "../src/types.ts";

const kernel: Kernel = {
  metaModel: {
    version: "1.0.0",
    envelope: { required: ["id", "type", "version", "lifecycle", "spec"], optional: ["relations"] },
    relation_verbs: ["owns", "executed-by", "satisfies", "references", "bound-to"],
    lifecycle: { states: ["draft", "active", "deprecated", "superseded"], transitions: {} },
    constraints: [],
  },
  ontology: {
    version: "1.0.0",
    types: {
      specialist: { purpose: "x", required_spec: ["mission"], allowed_relations: ["owns", "bound-to"], status: "active" },
      capability: { purpose: "x", required_spec: ["purpose"], allowed_relations: ["executed-by"], status: "active" },
      workflow: { purpose: "x", status: "dormant" },
    },
  },
};

function asset(over: Partial<KnowledgeAsset>): KnowledgeAsset {
  return { id: "specialist/a", type: "specialist", version: "1.0.0", lifecycle: "active", spec: { mission: "m" }, ...over };
}

test("valid graph passes and generates artifacts", () => {
  const cap = asset({ id: "capability/c", type: "capability", spec: { purpose: "p" }, relations: [{ verb: "executed-by", target: "specialist/a" }] });
  const spc = asset({ relations: [{ verb: "owns", target: "capability/c" }] });
  const r = run(kernel, [spc, cap]);
  assert.equal(r.valid, true);
  assert.equal(r.errors.length, 0);
  assert.ok(r.artifacts.length > 0);
});

test("missing required spec field is an error", () => {
  const r = run(kernel, [asset({ spec: {} })]);
  assert.equal(r.valid, false);
  assert.ok(r.errors.some((e) => e.message.includes("mission")));
});

test("unknown type is an error", () => {
  const r = run(kernel, [asset({ type: "ghost" })]);
  assert.ok(r.errors.some((e) => e.message.includes("type desconhecido")));
});

test("dormant type cannot be instantiated", () => {
  const r = run(kernel, [asset({ id: "workflow/w", type: "workflow", spec: {} })]);
  assert.ok(r.errors.some((e) => e.message.includes("dormente")));
});

test("duplicate id violates SSOT", () => {
  const r = run(kernel, [asset({}), asset({})]);
  assert.ok(r.errors.some((e) => e.message.includes("SSOT")));
});

test("dangling relation target is an error", () => {
  const r = run(kernel, [asset({ relations: [{ verb: "owns", target: "capability/missing" }] })]);
  assert.ok(r.errors.some((e) => e.message.includes("inexistente")));
});

test("non-canonical verb is an error", () => {
  const r = run(kernel, [asset({ relations: [{ verb: "loves", target: "specialist/a" }] })]);
  assert.ok(r.errors.some((e) => e.message.includes("não canônico")));
});

test("a project with no manifest is rejected (no false-pass on empty dirs)", () => {
  assert.equal(projectIssues([]).length, 1);
  assert.ok(projectIssues([])[0].message.includes("nenhum manifest"));
});

test("a project with exactly one manifest passes the project invariant", () => {
  const m: KnowledgeAsset = { id: "manifest/x", type: "manifest", version: "1.0.0", lifecycle: "active", spec: {} };
  assert.equal(projectIssues([m]).length, 0);
  assert.equal(projectIssues([m, { ...m, id: "manifest/y" }]).length, 1); // two manifests → error
});

test("relation not allowed for type is an error", () => {
  const cap = asset({ id: "capability/c", type: "capability", spec: { purpose: "p" }, relations: [{ verb: "satisfies", target: "specialist/a" }] });
  const r = run(kernel, [cap, asset({})]);
  assert.ok(r.errors.some((e) => e.message.includes("não permitida")));
});
