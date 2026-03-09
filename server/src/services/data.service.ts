import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import { config } from "../config.js";

const customersDir = path.join(config.contentDir, "customers");

async function dirExists(p: string): Promise<boolean> {
  try {
    const stat = await fs.stat(p);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function loadYaml<T = unknown>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return yaml.load(raw) as T;
  } catch {
    return null;
  }
}

async function loadAllYamlInDir(dirPath: string): Promise<unknown[]> {
  const items: unknown[] = [];
  if (!(await dirExists(dirPath))) return items;
  const entries = await fs.readdir(dirPath);
  for (const entry of entries.sort()) {
    if (entry.endsWith(".yaml")) {
      const data = await loadYaml(path.join(dirPath, entry));
      if (data) items.push(data);
    }
  }
  return items;
}

export async function listCustomers(): Promise<unknown[]> {
  const customers: unknown[] = [];
  if (!(await dirExists(customersDir))) return customers;
  const entries = await fs.readdir(customersDir);
  for (const entry of entries.sort()) {
    if (entry.startsWith(".")) continue;
    const acctPath = path.join(customersDir, entry, "account.yaml");
    const data = await loadYaml<Record<string, unknown>>(acctPath);
    if (!data) continue;
    const acct = (data.account ?? {}) as Record<string, unknown>;
    const prog = (data.program_state ?? {}) as Record<string, unknown>;
    const assessment = (data.assessment ?? {}) as Record<string, unknown>;
    customers.push({
      id: acct.id ?? entry,
      name: acct.name ?? entry,
      industry: acct.industry ?? "",
      tier: acct.tier ?? "",
      region: acct.region ?? "",
      current_phase: prog.current_phase ?? "not-started",
      overall_readiness: assessment.overall_readiness ?? "",
    });
  }
  return customers;
}

export async function getCustomer(
  customerId: string
): Promise<Record<string, unknown> | null> {
  const acctPath = path.join(customersDir, customerId, "account.yaml");
  return loadYaml(acctPath);
}

export async function getCustomerModels(
  customerId: string
): Promise<unknown[]> {
  return loadAllYamlInDir(path.join(customersDir, customerId, "models"));
}

export async function getCustomerModel(
  customerId: string,
  modelId: string
): Promise<unknown | null> {
  return loadYaml(
    path.join(customersDir, customerId, "models", `${modelId}.yaml`)
  );
}

export async function getCustomerPortfolio(
  customerId: string
): Promise<unknown[]> {
  return loadAllYamlInDir(path.join(customersDir, customerId, "portfolio"));
}

export async function getCustomerUseCase(
  customerId: string,
  useCaseId: string
): Promise<unknown | null> {
  return loadYaml(
    path.join(customersDir, customerId, "portfolio", `${useCaseId}.yaml`)
  );
}

export async function getCustomerMetrics(
  customerId: string,
  modelId: string
): Promise<unknown | null> {
  return loadYaml(
    path.join(customersDir, customerId, "metrics", `${modelId}.yaml`)
  );
}

export async function getCustomerInfrastructure(
  customerId: string
): Promise<unknown | null> {
  return loadYaml(
    path.join(customersDir, customerId, "infrastructure.yaml")
  );
}

export async function getCustomerDeliverables(
  customerId: string
): Promise<unknown[]> {
  const delDir = path.join(customersDir, customerId, "deliverables");
  const items: unknown[] = [];
  if (!(await dirExists(delDir))) return items;
  const entries = await fs.readdir(delDir);
  for (const entry of entries.sort()) {
    if (entry.endsWith(".md")) {
      const content = await fs.readFile(path.join(delDir, entry), "utf-8");
      const titleMatch = content.match(/^#\s+(.+)$/m);
      items.push({
        filename: entry,
        title: titleMatch?.[1] ?? entry.replace(/\.md$/, ""),
        size: content.length,
      });
    }
  }
  return items;
}

export async function getCustomerDeliverable(
  customerId: string,
  filename: string
): Promise<string | null> {
  const filePath = path.join(customersDir, customerId, "deliverables", filename);
  if (!(await fileExists(filePath))) return null;
  return fs.readFile(filePath, "utf-8");
}

export async function getCustomerStates(
  customerId: string
): Promise<unknown[]> {
  return loadAllYamlInDir(path.join(customersDir, customerId, "states"));
}

export async function getCustomerTraining(
  customerId: string
): Promise<unknown[]> {
  return loadAllYamlInDir(path.join(customersDir, customerId, "training"));
}

export async function getPersonas(): Promise<unknown> {
  return loadYaml(path.join(config.contentDir, "config", "personas.yaml"));
}
