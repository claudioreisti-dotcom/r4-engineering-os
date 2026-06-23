// Derive Markdown Artifacts from the canonical assets.
// Pure projection: same assets → same bytes. Never hand-edited (ADR-0005).

import type { Artifact, KnowledgeAsset } from "./types.ts";

const BANNER = "<!-- AUTO-GERADO pelo R4 EOS Knowledge Engine. NÃO EDITE À MÃO. Fonte: YAML em /knowledge e /manifest.yaml. -->";

function byId(a: KnowledgeAsset, b: KnowledgeAsset): number {
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

function ofType(assets: KnowledgeAsset[], type: string): KnowledgeAsset[] {
  return assets.filter((a) => a.type === type).sort(byId);
}

function str(v: unknown): string {
  return v === undefined || v === null ? "" : String(v);
}

function specialistsDoc(assets: KnowledgeAsset[]): string {
  const rows = ofType(assets, "specialist").map((a) => {
    const owns = (a.relations ?? []).filter((r) => r.verb === "owns").map((r) => `\`${r.target}\``).join(", ") || "—";
    const provider = (a.relations ?? []).find((r) => r.verb === "bound-to")?.target ?? "—";
    return `| \`${a.id}\` | ${str(a.spec.mission)} | ${owns} | \`${provider}\` |`;
  });
  return [
    BANNER,
    "# Specialists",
    "",
    "| id | Missão | Owns | Provider |",
    "|---|---|---|---|",
    ...rows,
    "",
  ].join("\n");
}

function capabilitiesDoc(assets: KnowledgeAsset[]): string {
  const rows = ofType(assets, "capability").map((a) => {
    const by = (a.relations ?? []).find((r) => r.verb === "executed-by")?.target ?? "—";
    return `| \`${a.id}\` | ${str(a.spec.purpose)} | \`${by}\` |`;
  });
  return [BANNER, "# Capabilities", "", "| id | Propósito | Executed by |", "|---|---|---|", ...rows, ""].join("\n");
}

function providersDoc(assets: KnowledgeAsset[]): string {
  const rows = ofType(assets, "provider").map((a) => {
    const sat = (a.relations ?? []).filter((r) => r.verb === "satisfies").map((r) => `\`${r.target}\``).join(", ") || "—";
    return `| \`${a.id}\` | ${str(a.spec.vendor)} | ${str(a.spec.description)} | ${sat} |`;
  });
  return [BANNER, "# Providers", "", "| id | Vendor | Descrição | Satisfies |", "|---|---|---|---|", ...rows, ""].join("\n");
}

function indexDoc(assets: KnowledgeAsset[]): string {
  const counts = new Map<string, number>();
  for (const a of assets) counts.set(a.type, (counts.get(a.type) ?? 0) + 1);
  const lines = [...counts.entries()].sort().map(([t, n]) => `- **${t}**: ${n}`);
  return [
    BANNER,
    "# R4 EOS — Knowledge Index",
    "",
    `Total de Knowledge Assets: **${assets.length}**`,
    "",
    "## Por tipo",
    ...lines,
    "",
    "## Catálogos",
    "- [Specialists](specialists.md)",
    "- [Capabilities](capabilities.md)",
    "- [Providers](providers.md)",
    "",
  ].join("\n");
}

export function generate(assets: KnowledgeAsset[]): Artifact[] {
  return [
    { path: "generated/docs/index.md", content: indexDoc(assets) },
    { path: "generated/docs/specialists.md", content: specialistsDoc(assets) },
    { path: "generated/docs/capabilities.md", content: capabilitiesDoc(assets) },
    { path: "generated/docs/providers.md", content: providersDoc(assets) },
  ];
}
