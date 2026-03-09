export interface Persona {
  id: string;
  title: string;
  short_title: string;
  icon: string;
  organization: "red-hat" | "customer";
  description: string;
  greeting: string;
  suggested_prompts: string[];
}

export interface PersonasConfig {
  personas: Persona[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  persona?: string;
}

export interface AgentSession {
  id: string;
  user_id: string;
  app_name: string;
}
