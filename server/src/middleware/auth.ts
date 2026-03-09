import type { Request, Response, NextFunction } from "express";

declare module "express-session" {
  interface SessionData {
    user?: { username: string; role: string };
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.user) {
    return next();
  }

  if (req.path.startsWith("/api/")) {
    return res.status(401).json({ error: "Authentication required" });
  }

  return res.redirect("/login");
}

export function requireEditor(req: Request, res: Response, next: NextFunction) {
  if (req.session?.user?.role === "editor") {
    return next();
  }
  return res.status(403).json({ error: "Editor role required" });
}
