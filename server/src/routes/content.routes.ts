import { Router, type Request, type Response, type NextFunction } from "express";
import {
  readContent,
  writeContent,
  listContentTree,
  contentExists,
} from "../services/content.service.js";
import { commitFile } from "../services/git.service.js";
import { requireEditor } from "../middleware/auth.js";

const router = Router();

function paramStr(val: string | string[] | undefined): string {
  return Array.isArray(val) ? val[0] : val || "";
}

router.get("/tree", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tree = await listContentTree();
    res.json(tree);
  } catch (err) {
    next(err);
  }
});

router.get("/*", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contentPath = paramStr(req.params[0]);
    if (!contentPath) return res.status(400).json({ error: "Path required" });

    const exists = await contentExists(contentPath);
    if (!exists) return res.status(404).json({ error: "Content not found" });

    const content = await readContent(contentPath);
    res.type("text/plain").send(content);
  } catch (err) {
    next(err);
  }
});

router.put("/*", requireEditor, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contentPath = paramStr(req.params[0]);
    if (!contentPath) return res.status(400).json({ error: "Path required" });

    const { content } = req.body;
    if (typeof content !== "string") {
      return res.status(400).json({ error: "Content must be a string" });
    }

    await writeContent(contentPath, content);

    const filename = contentPath.split("/").pop() || contentPath;
    await commitFile(contentPath, `Update ${filename}`);

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

router.post("/*", requireEditor, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contentPath = paramStr(req.params[0]);
    if (!contentPath) return res.status(400).json({ error: "Path required" });

    const exists = await contentExists(contentPath);
    if (exists) return res.status(409).json({ error: "File already exists" });

    const { content } = req.body;
    if (typeof content !== "string") {
      return res.status(400).json({ error: "Content must be a string" });
    }

    await writeContent(contentPath, content);

    const filename = contentPath.split("/").pop() || contentPath;
    await commitFile(contentPath, `Create ${filename}`);

    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
