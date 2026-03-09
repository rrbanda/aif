import { Router, type Request, type Response, type NextFunction } from "express";
import { getFileLog, getDiff, getStatus } from "../services/git.service.js";

const router = Router();

router.get("/status", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const status = await getStatus();
    res.json(status);
  } catch (err) {
    next(err);
  }
});

router.get("/log/*", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const raw = req.params[0];
    const filePath = Array.isArray(raw) ? raw[0] : raw;
    if (!filePath) return res.status(400).json({ error: "File path required" });

    const maxCount = parseInt(req.query.limit as string) || 20;
    const log = await getFileLog(filePath, maxCount);
    res.json(log);
  } catch (err) {
    next(err);
  }
});

router.get("/diff/:hash", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hash = Array.isArray(req.params.hash) ? req.params.hash[0] : req.params.hash;
    const diff = await getDiff(hash);
    res.type("text/plain").send(diff);
  } catch (err) {
    next(err);
  }
});

export default router;
