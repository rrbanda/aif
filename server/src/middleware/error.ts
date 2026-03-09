import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(`[error] ${err.message}`, err.stack);

  if (err.message.includes("not found") || err.message.includes("ENOENT")) {
    return res.status(404).json({ error: err.message });
  }

  if (err.message.includes("traversal")) {
    return res.status(403).json({ error: "Forbidden" });
  }

  return res.status(500).json({ error: "Internal server error" });
}
