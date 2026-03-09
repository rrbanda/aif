import { Router, type Request, type Response, type NextFunction } from "express";
import {
  loadConfig,
  loadConfigEntry,
  updateConfig,
  createConfigEntry,
  deleteConfigEntry,
  isValidConfigType,
} from "../services/config.service.js";
import { commitFile } from "../services/git.service.js";
import { requireEditor } from "../middleware/auth.js";

const router = Router();

function param(val: string | string[] | undefined): string {
  return Array.isArray(val) ? val[0] : val || "";
}

function validateType(req: Request, res: Response, next: NextFunction) {
  const type = param(req.params.type);
  if (!isValidConfigType(type)) {
    return res.status(400).json({ error: `Invalid config type: ${type}` });
  }
  next();
}

router.get("/:type", validateType, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await loadConfig(param(req.params.type) as Parameters<typeof loadConfig>[0]);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:type/:id", validateType, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entry = await loadConfigEntry(
      param(req.params.type) as Parameters<typeof loadConfigEntry>[0],
      param(req.params.id)
    );
    if (!entry) return res.status(404).json({ error: "Not found" });
    res.json(entry);
  } catch (err) {
    next(err);
  }
});

router.put("/:type/:id", requireEditor, validateType, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const type = param(req.params.type) as Parameters<typeof updateConfig>[0];
    const id = param(req.params.id);
    await updateConfig(type, id, req.body);
    await commitFile(`config/${type}.yaml`, `Update ${type}: ${id}`);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

router.post("/:type", requireEditor, validateType, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const type = param(req.params.type) as Parameters<typeof createConfigEntry>[0];
    await createConfigEntry(type, req.body);
    await commitFile(`config/${type}.yaml`, `Add ${type}: ${req.body.id || "new entry"}`);
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

router.delete("/:type/:id", requireEditor, validateType, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const type = param(req.params.type) as Parameters<typeof deleteConfigEntry>[0];
    const id = param(req.params.id);
    await deleteConfigEntry(type, id);
    await commitFile(`config/${type}.yaml`, `Delete ${type}: ${id}`);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
