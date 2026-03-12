import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import { config } from "../config.js";

const configDir = path.join(config.contentDir, "config");

type ConfigType =
  | "program"
  | "phases"
  | "organization"
  | "use-cases"
  | "tech-stack"
  | "roles"
  | "metrics"
  | "navigation"
  | "partners";

const CONFIG_FILES: Record<ConfigType, string> = {
  program: "program.yaml",
  phases: "phases.yaml",
  organization: "organization.yaml",
  "use-cases": "use-cases.yaml",
  "tech-stack": "tech-stack.yaml",
  roles: "roles.yaml",
  metrics: "metrics.yaml",
  navigation: "navigation.yaml",
  partners: "partners.yaml",
};

export async function loadConfig(type: ConfigType): Promise<unknown> {
  const filename = CONFIG_FILES[type];
  if (!filename) throw new Error(`Unknown config type: ${type}`);

  const filePath = path.join(configDir, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  return yaml.load(raw);
}

export async function loadConfigEntry(
  type: ConfigType,
  id: string
): Promise<unknown> {
  const data = (await loadConfig(type)) as Record<string, unknown[]>;
  const listKey = Object.keys(data).find((k) => Array.isArray(data[k]));
  if (!listKey) return null;

  const items = data[listKey] as Array<Record<string, unknown>>;
  return items.find((item) => item.id === id) || null;
}

export async function updateConfig(
  type: ConfigType,
  id: string,
  updates: Record<string, unknown>
): Promise<void> {
  const filename = CONFIG_FILES[type];
  if (!filename) throw new Error(`Unknown config type: ${type}`);

  const filePath = path.join(configDir, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  const data = yaml.load(raw) as Record<string, unknown[]>;
  const listKey = Object.keys(data).find((k) => Array.isArray(data[k]));
  if (!listKey) throw new Error(`No list found in ${type} config`);

  const items = data[listKey] as Array<Record<string, unknown>>;
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) throw new Error(`Entry ${id} not found in ${type}`);

  items[index] = { ...items[index], ...updates };
  const output = yaml.dump(data, { lineWidth: 120, noRefs: true });
  await fs.writeFile(filePath, output, "utf-8");
}

export async function createConfigEntry(
  type: ConfigType,
  entry: Record<string, unknown>
): Promise<void> {
  const filename = CONFIG_FILES[type];
  if (!filename) throw new Error(`Unknown config type: ${type}`);

  const filePath = path.join(configDir, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  const data = yaml.load(raw) as Record<string, unknown[]>;
  const listKey = Object.keys(data).find((k) => Array.isArray(data[k]));
  if (!listKey) throw new Error(`No list found in ${type} config`);

  (data[listKey] as unknown[]).push(entry);
  const output = yaml.dump(data, { lineWidth: 120, noRefs: true });
  await fs.writeFile(filePath, output, "utf-8");
}

export async function deleteConfigEntry(
  type: ConfigType,
  id: string
): Promise<void> {
  const filename = CONFIG_FILES[type];
  if (!filename) throw new Error(`Unknown config type: ${type}`);

  const filePath = path.join(configDir, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  const data = yaml.load(raw) as Record<string, unknown[]>;
  const listKey = Object.keys(data).find((k) => Array.isArray(data[k]));
  if (!listKey) throw new Error(`No list found in ${type} config`);

  const items = data[listKey] as Array<Record<string, unknown>>;
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) throw new Error(`Entry ${id} not found in ${type}`);

  items.splice(index, 1);
  const output = yaml.dump(data, { lineWidth: 120, noRefs: true });
  await fs.writeFile(filePath, output, "utf-8");
}

export function isValidConfigType(type: string): type is ConfigType {
  return type in CONFIG_FILES;
}
