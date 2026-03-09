export interface ContentNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: ContentNode[];
}

export interface GitLogEntry {
  hash: string;
  date: string;
  message: string;
  author_name: string;
}

export interface GitLogResult {
  all: GitLogEntry[];
}

export interface GitStatus {
  modified: string[];
  not_added: string[];
  staged: string[];
}

export type ViewMode = "customer" | "internal";
