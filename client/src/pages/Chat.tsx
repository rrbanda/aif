import { useState, useRef, useEffect } from "react";
import {
  PageSection,
  SelectOption,
  SelectList,
} from "@patternfly/react-core";
import Chatbot, { ChatbotDisplayMode } from "@patternfly/chatbot/dist/esm/Chatbot";
import ChatbotContent from "@patternfly/chatbot/dist/esm/ChatbotContent";
import ChatbotFooter from "@patternfly/chatbot/dist/esm/ChatbotFooter";
import ChatbotHeader, {
  ChatbotHeaderMain,
  ChatbotHeaderTitle,
  ChatbotHeaderActions,
  ChatbotHeaderSelectorDropdown,
} from "@patternfly/chatbot/dist/esm/ChatbotHeader";
import MessageBar from "@patternfly/chatbot/dist/esm/MessageBar";
import MessageBox from "@patternfly/chatbot/dist/esm/MessageBox";
import Message from "@patternfly/chatbot/dist/esm/Message";
import ChatbotWelcomePrompt from "@patternfly/chatbot/dist/esm/ChatbotWelcomePrompt";
import { useAgent } from "../hooks/useAgent";
import { usePersonas } from "../hooks/useCustomerData";
import type { Persona } from "../types/agent";

import "@patternfly/chatbot/dist/css/main.css";

export default function Chat() {
  const { messages, streaming, error, sendMessage } =
    useAgent();
  const { personas } = usePersonas();
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState("");

  const allPersonas = personas?.personas ?? [];

  useEffect(() => {
    if (messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last.role === "assistant" && last.content) {
        setAnnouncement(`Assistant said: ${last.content.slice(0, 80)}`);
      }
    }
  }, [messages]);

  const handleSend = (message: string | number) => {
    const text = String(message).trim();
    if (!text || streaming) return;
    sendMessage(text, selectedPersona?.id);
  };

  const welcomePrompts = selectedPersona
    ? selectedPersona.suggested_prompts.map((prompt) => ({
        title: prompt.length > 50 ? prompt.slice(0, 50) + "..." : prompt,
        message: prompt,
        onClick: () => handleSend(prompt),
      }))
    : [
        {
          title: "Program overview",
          message: "Tell me about the AI Factory program",
          onClick: () => handleSend("Tell me about the AI Factory program"),
        },
        {
          title: "Readiness assessment",
          message: "Run a readiness assessment for my organization",
          onClick: () =>
            handleSend("Run a readiness assessment for my organization"),
        },
        {
          title: "Use case qualification",
          message: "Help me qualify an AI use case for fraud detection",
          onClick: () =>
            handleSend("Help me qualify an AI use case for fraud detection"),
        },
      ];

  const personaItems = allPersonas.map((p) => (
    <SelectOption key={p.id} value={p.id}>
      {p.short_title}
    </SelectOption>
  ));

  return (
    <PageSection
      isFilled
      padding={{ default: "noPadding" }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Chatbot displayMode={ChatbotDisplayMode.embedded}>
        <ChatbotHeader>
          <ChatbotHeaderMain>
            <ChatbotHeaderTitle>AI Factory Assistant</ChatbotHeaderTitle>
          </ChatbotHeaderMain>
          <ChatbotHeaderActions>
            <ChatbotHeaderSelectorDropdown
              value={selectedPersona?.short_title ?? "Auto"}
              onSelect={(_e, value) => {
                if (value === "__auto") {
                  setSelectedPersona(null);
                } else {
                  const p = allPersonas.find((x) => x.id === value);
                  setSelectedPersona(p ?? null);
                }
              }}
            >
              <SelectList>
                <SelectOption value="__auto" description="Routes to best agent">
                  Auto (Coordinator)
                </SelectOption>
                {personaItems}
              </SelectList>
            </ChatbotHeaderSelectorDropdown>
          </ChatbotHeaderActions>
        </ChatbotHeader>

        <ChatbotContent>
          <MessageBox announcement={announcement} ariaLabel="AI Factory chat messages">
            {messages.length === 0 && (
              <ChatbotWelcomePrompt
                title="AI Factory Assistant"
                description={
                  selectedPersona
                    ? selectedPersona.greeting
                    : "How can I help you with your AI Factory program today?"
                }
                prompts={welcomePrompts}
              />
            )}

            {messages.map((msg) => (
              <Message
                key={msg.id}
                role={msg.role === "user" ? "user" : "bot"}
                name={
                  msg.role === "user"
                    ? "You"
                    : selectedPersona?.short_title ?? "AI Factory"
                }
                content={msg.content}
                isLoading={
                  msg.role === "assistant" && !msg.content && streaming
                }
                timestamp={new Date(msg.timestamp).toLocaleTimeString()}
                avatar={
                  msg.role === "user"
                    ? undefined
                    : undefined
                }
              />
            ))}
            <div ref={scrollRef} />
          </MessageBox>
        </ChatbotContent>

        <ChatbotFooter>
          <MessageBar
            onSendMessage={handleSend}
            hasAttachButton={false}
            isSendButtonDisabled={streaming}
          />
          {error && (
            <div
              className="pf-v6-u-p-sm"
              style={{ color: "var(--pf-t--global--color--status--warning--default)" }}
            >
              {error}
            </div>
          )}
        </ChatbotFooter>
      </Chatbot>
    </PageSection>
  );
}
