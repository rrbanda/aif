import { Router, type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { config } from "../config.js";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  if (username !== config.auth.username) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  if (!config.auth.passwordHash) {
    if (config.nodeEnv === "development" && password === "admin") {
      req.session.user = { username, role: "editor" };
      return res.json({ user: req.session.user });
    }
    return res.status(500).json({ error: "Password hash not configured" });
  }

  const valid = await bcrypt.compare(password, config.auth.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  req.session.user = { username, role: "editor" };
  return res.json({ user: req.session.user });
});

router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    return res.json({ ok: true });
  });
});

router.get("/session", (req: Request, res: Response) => {
  if (req.session?.user) {
    return res.json({ user: req.session.user });
  }
  return res.status(401).json({ error: "Not authenticated" });
});

export default router;
