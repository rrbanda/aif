import simpleGit, { type SimpleGit, type LogResult } from "simple-git";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../..");

const git: SimpleGit = simpleGit(repoRoot);

export async function commitFile(
  filePath: string,
  message: string
): Promise<string> {
  const fullPath = `content/${filePath}`;
  await git.add(fullPath);
  const result = await git.commit(message, fullPath);
  return result.commit;
}

export async function getFileLog(
  filePath: string,
  maxCount = 20
): Promise<LogResult> {
  return git.log({ file: `content/${filePath}`, maxCount });
}

export async function getDiff(hash: string): Promise<string> {
  return git.diff([`${hash}~1`, hash]);
}

export async function getStatus() {
  return git.status();
}

export async function isGitRepo(): Promise<boolean> {
  try {
    await git.revparse(["--is-inside-work-tree"]);
    return true;
  } catch {
    return false;
  }
}
