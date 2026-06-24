// Project Discovery — deterministic, read-only extraction of structural facts from any
// repository (Mission 0008, Phase 1/2). No judgment, no AI, no writes (ADR-0009).
// Interpretation (the Governance Proposal) is authored by the Adoption Specialist, not here.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";

export interface ProjectProfile {
  name: string | null;
  version: string | null;
  packageManager: string | null;
  node: string | null;
  language: string | null;
  monorepo: { tool: string | null; workspaces: string[]; members: string[] };
  scripts: string[];
  turboTasks: string[];
  deployables: { dockerfiles: string[]; composeServices: string[] };
  conventions: string[];
  docs: string[];
}

function readJson(path: string): Record<string, unknown> | null {
  return existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>) : null;
}
function readYaml(path: string): unknown {
  return existsSync(path) ? parse(readFileSync(path, "utf8")) : null;
}
function listDir(path: string): string[] {
  return existsSync(path) && statSync(path).isDirectory() ? readdirSync(path).sort() : [];
}
function walkFiles(dir: string, base: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir).sort()) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) walkFiles(full, base, out);
    else out.push(full.slice(base.length + 1));
  }
  return out;
}

export function discover(root: string): ProjectProfile {
  const pkg = readJson(join(root, "package.json")) ?? {};
  const engines = (pkg.engines as Record<string, string>) ?? {};

  // package manager: explicit field, else lockfile.
  let packageManager: string | null = (pkg.packageManager as string) ?? null;
  if (!packageManager) {
    if (existsSync(join(root, "pnpm-lock.yaml"))) packageManager = "pnpm";
    else if (existsSync(join(root, "yarn.lock"))) packageManager = "yarn";
    else if (existsSync(join(root, "package-lock.json"))) packageManager = "npm";
  }

  // monorepo workspaces.
  let tool: string | null = null;
  let workspaces: string[] = [];
  const pnpmWs = readYaml(join(root, "pnpm-workspace.yaml")) as { packages?: string[] } | null;
  if (pnpmWs?.packages) { tool = "pnpm-workspaces"; workspaces = pnpmWs.packages; }
  else if (Array.isArray(pkg.workspaces)) { tool = "npm-workspaces"; workspaces = pkg.workspaces as string[]; }
  if (existsSync(join(root, "turbo.json"))) tool = tool ? `${tool}+turbo` : "turbo";

  // members = dirs under each workspace glob root (e.g. "apps/*" → apps/<dir>).
  const members: string[] = [];
  for (const ws of workspaces) {
    const baseDir = ws.replace(/\/\*+$/, "");
    for (const m of listDir(join(root, baseDir))) members.push(`${baseDir}/${m}`);
  }

  const turbo = readJson(join(root, "turbo.json"));
  const turboTasks = turbo?.tasks ? Object.keys(turbo.tasks as object).sort() : [];

  const dockerfiles = listDir(root).filter((f) => f.startsWith("Dockerfile"));
  const compose = readYaml(join(root, "docker-compose.yml")) as { services?: object } | null;
  const composeServices = compose?.services ? Object.keys(compose.services).sort() : [];

  const conventions = ["AGENTS.md", "CLAUDE.md", "CODEX.md", "GEMINI.md", "README.md"].filter((f) => existsSync(join(root, f)));

  const docs = [...walkFiles(join(root, "docs"), root), ...walkFiles(join(root, ".specs"), root)].sort();

  return {
    name: (pkg.name as string) ?? null,
    version: (pkg.version as string) ?? null,
    packageManager,
    node: engines.node ?? null,
    language: existsSync(join(root, "tsconfig.base.json")) || existsSync(join(root, "tsconfig.json")) ? "typescript" : null,
    monorepo: { tool, workspaces: workspaces.sort(), members: members.sort() },
    scripts: pkg.scripts ? Object.keys(pkg.scripts as object).sort() : [],
    turboTasks,
    deployables: { dockerfiles: dockerfiles.sort(), composeServices },
    conventions,
    docs,
  };
}

export function profileToMarkdown(p: ProjectProfile): string {
  const list = (xs: string[]) => (xs.length ? xs.map((x) => `\`${x}\``).join(", ") : "—");
  return [
    "<!-- AUTO-GERADO por `r4 discover` (somente leitura). Fatos estruturais. -->",
    `# Project Profile — ${p.name ?? "(sem nome)"}`,
    "",
    `- **Versão:** ${p.version ?? "—"}`,
    `- **Linguagem:** ${p.language ?? "—"}`,
    `- **Package manager:** ${p.packageManager ?? "—"}`,
    `- **Node:** ${p.node ?? "—"}`,
    `- **Monorepo:** ${p.monorepo.tool ?? "—"}`,
    `- **Workspaces:** ${list(p.monorepo.workspaces)}`,
    `- **Membros:** ${list(p.monorepo.members)}`,
    `- **Scripts:** ${list(p.scripts)}`,
    `- **Turbo tasks:** ${list(p.turboTasks)}`,
    `- **Dockerfiles:** ${list(p.deployables.dockerfiles)}`,
    `- **Serviços (compose):** ${list(p.deployables.composeServices)}`,
    `- **Convenções:** ${list(p.conventions)}`,
    `- **Docs (${p.docs.length}):** ${list(p.docs)}`,
    "",
  ].join("\n");
}
