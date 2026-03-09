import { Router, type Request, type Response, type NextFunction } from "express";
import { config } from "../config.js";

const router = Router();

const ADK_BASE = config.adkBaseUrl;
const APP_NAME = "ai_factory_agent";

function userId(req: Request): string {
  return req.session?.user?.username ?? "anonymous";
}

router.post(
  "/sessions",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uid = userId(req);
      const url = `${ADK_BASE}/apps/${APP_NAME}/users/${uid}/sessions`;
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body ?? {}),
      });
      if (!resp.ok) {
        const text = await resp.text();
        return res
          .status(resp.status)
          .json({ error: text || "ADK session creation failed" });
      }
      const data = await resp.json();
      res.json(data);
    } catch (err) {
      if (
        err instanceof TypeError &&
        (err as Error).message.includes("fetch")
      ) {
        return res
          .status(503)
          .json({ error: "Agent server unavailable. Start it with: adk web agents/" });
      }
      next(err);
    }
  }
);

router.get(
  "/sessions/:sessionId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uid = userId(req);
      const sid = Array.isArray(req.params.sessionId) ? req.params.sessionId[0] : req.params.sessionId;
      const url = `${ADK_BASE}/apps/${APP_NAME}/users/${uid}/sessions/${sid}`;
      const resp = await fetch(url);
      if (!resp.ok) {
        return res.status(resp.status).json({ error: "Session not found" });
      }
      const data = await resp.json();
      res.json(data);
    } catch (err) {
      if (
        err instanceof TypeError &&
        (err as Error).message.includes("fetch")
      ) {
        return res.status(503).json({ error: "Agent server unavailable" });
      }
      next(err);
    }
  }
);

router.post(
  "/run",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uid = userId(req);
      const body = {
        app_name: APP_NAME,
        user_id: uid,
        session_id: req.body.session_id,
        new_message: req.body.new_message,
      };
      const resp = await fetch(`${ADK_BASE}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!resp.ok) {
        const text = await resp.text();
        return res.status(resp.status).json({ error: text });
      }
      const data = await resp.json();
      res.json(data);
    } catch (err) {
      if (
        err instanceof TypeError &&
        (err as Error).message.includes("fetch")
      ) {
        return res.status(503).json({ error: "Agent server unavailable" });
      }
      next(err);
    }
  }
);

router.post(
  "/sse",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uid = userId(req);
      const body = {
        app_name: APP_NAME,
        user_id: uid,
        session_id: req.body.session_id,
        new_message: req.body.new_message,
      };
      const resp = await fetch(`${ADK_BASE}/run_sse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        const text = await resp.text();
        return res.status(resp.status).json({ error: text });
      }

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const reader = resp.body?.getReader();
      if (!reader) {
        return res.status(500).json({ error: "No response body" });
      }

      const decoder = new TextDecoder();
      req.on("close", () => reader.cancel());

      const pump = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            res.end();
            return;
          }
          res.write(decoder.decode(value, { stream: true }));
          if (typeof (res as unknown as Record<string, unknown>).flush === "function") {
            (res as unknown as { flush: () => void }).flush();
          }
        }
      };
      await pump();
    } catch (err) {
      if (
        err instanceof TypeError &&
        (err as Error).message.includes("fetch")
      ) {
        return res.status(503).json({ error: "Agent server unavailable" });
      }
      next(err);
    }
  }
);

export default router;
