import { useState, useCallback, useRef } from "react";
import { api } from "../lib/api";
import type { ChatMessage, AgentSession } from "../types/agent";

let msgCounter = 0;

export function useAgent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [session, setSession] = useState<AgentSession | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const createSession = useCallback(async () => {
    try {
      setError(null);
      const data = await api.post<AgentSession>("/agent/sessions", {});
      setSession(data);
      return data;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to create session";
      setError(msg);
      return null;
    }
  }, []);

  const sendMessage = useCallback(
    async (text: string, persona?: string) => {
      setError(null);
      const userMsg: ChatMessage = {
        id: `msg-${++msgCounter}`,
        role: "user",
        content: text,
        timestamp: Date.now(),
        persona,
      };
      setMessages((prev) => [...prev, userMsg]);

      let activeSession = session;
      if (!activeSession) {
        activeSession = await api
          .post<AgentSession>("/agent/sessions", {})
          .catch(() => null);
        if (!activeSession) {
          setError("Could not connect to agent server. Is the ADK server running?");
          return;
        }
        setSession(activeSession);
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${++msgCounter}`,
        role: "assistant",
        content: "",
        timestamp: Date.now(),
        persona,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setStreaming(true);

      try {
        const controller = new AbortController();
        abortRef.current = controller;

        const resp = await fetch("/api/agent/sse", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: activeSession.id,
            new_message: {
              role: "user",
              parts: [{ text }],
            },
          }),
          signal: controller.signal,
        });

        if (!resp.ok) {
          const body = await resp.json().catch(() => ({ error: resp.statusText }));
          throw new Error(body.error || `Agent error: ${resp.status}`);
        }

        const reader = resp.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6).trim();
            if (!jsonStr || jsonStr === "[DONE]") continue;
            try {
              const event = JSON.parse(jsonStr);
              const parts = event?.content?.parts;
              if (parts) {
                for (const part of parts) {
                  if (part.text) accumulated += part.text;
                }
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsg.id
                      ? { ...m, content: accumulated }
                      : m
                  )
                );
              }
            } catch {
              // skip non-JSON SSE lines
            }
          }
        }

        if (!accumulated) {
          try {
            const fallback = await api.post<{
              content?: { parts?: Array<{ text?: string }> };
            }>("/agent/run", {
              session_id: activeSession.id,
              new_message: { role: "user", parts: [{ text }] },
            });
            const parts = fallback?.content?.parts;
            if (parts) {
              accumulated = parts.map((p) => p.text ?? "").join("");
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsg.id
                    ? { ...m, content: accumulated }
                    : m
                )
              );
            }
          } catch {
            // SSE worked but no text parts — leave as-is
          }
        }
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        const msg = e instanceof Error ? e.message : "Agent communication failed";
        setError(msg);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, content: `_Error: ${msg}_` }
              : m
          )
        );
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [session]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setSession(null);
    setError(null);
  }, []);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    setStreaming(false);
  }, []);

  return {
    messages,
    session,
    streaming,
    error,
    sendMessage,
    createSession,
    clearChat,
    stopStreaming,
  };
}
