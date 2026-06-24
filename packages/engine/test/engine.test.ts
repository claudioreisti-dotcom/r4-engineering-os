// Tests for the Knowledge Engine — deterministic, no I/O of real repo (fixtures inline).

import { test } from "node:test";
import assert from "node:assert/strict";
import { run, projectIssues } from "../src/engine.ts";
import type { Kernel, KnowledgeAsset } from "../src/types.ts";

const kernel: Kernel = {
  metaModel: {
    version: "1.0.0",
    envelope: { required: ["id", "type", "version", "lifecycle", "spec"], optional: ["relations"] },
    relation_verbs: ["owns", "executed-by", "satisfies", "references", "bound-to", "requires", "supersedes", "realizes"],
    lifecycle: { states: ["draft", "active", "deprecated", "superseded"], transitions: {} },
    constraints: [],
  },
  ontology: {
    version: "1.0.0",
    types: {
      specialist: { purpose: "x", required_spec: ["mission"], allowed_relations: ["owns", "bound-to"], status: "active" },
      capability: { purpose: "x", required_spec: ["purpose"], allowed_relations: ["executed-by"], status: "active" },
      component: { purpose: "x", required_spec: ["purpose", "kind"], allowed_relations: ["requires", "references"], status: "active" },
      resource: { purpose: "x", required_spec: ["kind"], allowed_relations: ["requires"], status: "active" },
      principle: { purpose: "x", required_spec: ["statement"], allowed_relations: ["supersedes"], status: "active" },
      workflow: { purpose: "x", required_spec: ["steps"], allowed_relations: ["realizes", "references"], status: "active" },
      plugin: { purpose: "x", status: "dormant" },
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
  const r = run(kernel, [asset({ id: "plugin/p", type: "plugin", spec: {} })]);
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

test("v1.1 types (component, resource, principle) validate via the data-driven engine", () => {
  const component = asset({ id: "component/api", type: "component", spec: { purpose: "p", kind: "app" }, relations: [{ verb: "requires", target: "resource/db" }] });
  const resource = asset({ id: "resource/db", type: "resource", spec: { kind: "database" } });
  const principle = asset({ id: "principle/anti-enum", type: "principle", spec: { statement: "não usar enum" } });
  const r = run(kernel, [component, resource, principle]);
  assert.equal(r.valid, true, JSON.stringify(r.errors));
});

test("workflow (descriptive) validates: ordered steps + realizes/references, no execution semantics", () => {
  const cap = asset({ id: "capability/c", type: "capability", spec: { purpose: "p" }, relations: [] });
  const wf = asset({
    id: "workflow/pipe", type: "workflow",
    spec: { steps: [{ ref: "capability/c" }, { gate: "human-approval", actor: "human" }] },
    relations: [{ verb: "realizes", target: "capability/c" }, { verb: "references", target: "capability/c" }],
  });
  const r = run(kernel, [wf, cap]);
  assert.equal(r.valid, true, JSON.stringify(r.errors));
});

test("workflow missing required 'steps' is an error", () => {
  const r = run(kernel, [asset({ id: "workflow/w", type: "workflow", spec: {} })]);
  assert.ok(r.errors.some((e) => e.message.includes("steps")));
});

test("component missing required 'kind' is an error", () => {
  const r = run(kernel, [asset({ id: "component/x", type: "component", spec: { purpose: "p" } })]);
  assert.ok(r.errors.some((e) => e.message.includes("kind")));
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
