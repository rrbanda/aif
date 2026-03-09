import fs from "fs/promises";
import path from "path";
import { config } from "../config.js";

export async function readContent(contentPath: string): Promise<string> {
  const fullPath = path.join(config.contentDir, contentPath);
  await assertWithinContentDir(fullPath);
  return fs.readFile(fullPath, "utf-8");
}

export async function writeContent(
  contentPath: string,
  content: string
): Promise<void> {
  const fullPath = path.join(config.contentDir, contentPath);
  await assertWithinContentDir(fullPath);

  const dir = path.dirname(fullPath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(fullPath, content, "utf-8");
}

export async function contentExists(contentPath: string): Promise<boolean> {
  const fullPath = path.join(config.contentDir, contentPath);
  try {
    await fs.access(fullPath);
    return true;
  } catch {
    return false;
  }
}

export async function listContentTree(): Promise<ContentNode[]> {
  return buildTree(config.contentDir, "");
}

export interface ContentNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: ContentNode[];
}

async function buildTree(
  basePath: string,
  relativePath: string
): Promise<ContentNode[]> {
  const fullPath = path.join(basePath, relativePath);
  const entries = await fs.readdir(fullPath, { withFileTypes: true });
  const nodes: ContentNode[] = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const entryRelPath = path.join(relativePath, entry.name);
    if (entry.isDirectory()) {
      nodes.push({
        name: entry.name,
        path: entryRelPath,
        type: "directory",
        children: await buildTree(basePath, entryRelPath),
      });
    } else if (entry.name.endsWith(".md") || entry.name.endsWith(".yaml")) {
      nodes.push({
        name: entry.name,
        path: entryRelPath,
        type: "file",
      });
    }
  }

  return nodes;
}

async function assertWithinContentDir(fullPath: string): Promise<void> {
  const resolved = path.resolve(fullPath);
  const contentResolved = path.resolve(config.contentDir);
  if (!resolved.startsWith(contentResolved)) {
    throw new Error("Path traversal attempt blocked");
  }
}
