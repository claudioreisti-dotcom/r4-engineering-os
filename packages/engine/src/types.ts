// R4 EOS Knowledge Engine — shared types.
// The envelope is universal (ADR-0006); only `spec` varies by type.

export interface Relation {
  verb: string;
  target: string;
}

export interface KnowledgeAsset {
  id: string;
  type: string;
  version: string;
  lifecycle: string;
  relations?: Relation[];
  spec: Record<string, unknown>;
  /** Source file path, attached on load (not part of the canonical envelope). */
  _source?: string;
}

export interface MetaModel {
  version: string;
  envelope: { required: string[]; optional: string[] };
  relation_verbs: string[];
  lifecycle: { states: string[]; transitions: Record<string, string[]> };
  constraints: string[];
}

export interface OntologyType {
  purpose: string;
  required_spec?: string[];
  allowed_relations?: string[];
  status: "active" | "dormant";
}

export interface Ontology {
  version: string;
  types: Record<string, OntologyType>;
}

export interface Kernel {
  metaModel: MetaModel;
  ontology: Ontology;
}

export interface Issue {
  level: "error";
  assetId: string;
  source?: string;
  message: string;
}

export interface Artifact {
  path: string;
  content: string;
}

export interface EngineResult {
  valid: boolean;
  assets: KnowledgeAsset[];
  errors: Issue[];
  artifacts: Artifact[];
}
