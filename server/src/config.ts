import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../..");

dotenv.config({ path: path.resolve(projectRoot, ".env") });

export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  contentDir: path.resolve(
    projectRoot,
    process.env.CONTENT_DIR || "content"
  ),
  auth: {
    username: process.env.AUTH_USERNAME || "admin",
    passwordHash: process.env.AUTH_PASSWORD_HASH || "",
    sessionSecret: process.env.SESSION_SECRET || "dev-secret-change-me",
  },
  adkPort: parseInt(process.env.ADK_PORT || "8000", 10),
  adkBaseUrl: process.env.ADK_BASE_URL || `http://localhost:${parseInt(process.env.ADK_PORT || "8000", 10)}`,
  llm: {
    provider: (process.env.LLM_PROVIDER || "openai") as "openai" | "anthropic",
    openaiKey: process.env.OPENAI_API_KEY || "",
    anthropicKey: process.env.ANTHROPIC_API_KEY || "",
  },
};
