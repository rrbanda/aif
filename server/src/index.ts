import express from "express";
import session from "express-session";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "./config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { requireAuth } from "./middleware/auth.js";
import { errorHandler } from "./middleware/error.js";
import authRoutes from "./routes/auth.routes.js";
import configRoutes from "./routes/config.routes.js";
import contentRoutes from "./routes/content.routes.js";
import gitRoutes from "./routes/git.routes.js";
import dataRoutes from "./routes/data.routes.js";
import agentRoutes from "./routes/agent.routes.js";

const app = express();

if (config.nodeEnv === "production") {
  app.set("trust proxy", 1);
}

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "5mb" }));

app.use(
  session({
    secret: config.auth.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.nodeEnv === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

app.use("/api/config", requireAuth, configRoutes);
app.use("/api/content", requireAuth, contentRoutes);
app.use("/api/git", requireAuth, gitRoutes);
app.use("/api/data", requireAuth, dataRoutes);
app.use("/api/agent", requireAuth, agentRoutes);

if (config.nodeEnv === "production") {
  const clientDist = path.resolve(__dirname, "../../client/dist");
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[server] AI Factory running on http://localhost:${config.port}`);
  console.log(`[server] Content directory: ${config.contentDir}`);
  console.log(`[server] Environment: ${config.nodeEnv}`);
});
