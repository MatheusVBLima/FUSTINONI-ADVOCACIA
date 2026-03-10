"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Brain, MessageCircle, Send, X } from "lucide-react";
import { Streamdown } from "streamdown";

import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";

type VirtualAssistantChatProps = {
  whatsappUrl: string;
};

const chatStreamdownComponents = {
  a: ({ children, href, node: _node, ...props }: any) => (
    <a
      href={href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold underline underline-offset-2 break-words"
      {...props}
    >
      {children}
    </a>
  ),
};

export function VirtualAssistantChat({ whatsappUrl }: VirtualAssistantChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const { messages, sendMessage, status, error, setMessages, clearError, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  useEffect(() => {
    if (!messagesContainerRef.current) {
      return;
    }

    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages, status]);

  const isSending = status === "submitted" || status === "streaming";

  function handleNewSession() {
    if (isSending) {
      stop();
    }

    setMessages([]);
    clearError();
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedInput = input.trim();

    if (!trimmedInput || isSending) {
      return;
    }

    sendMessage({ text: trimmedInput });
    setInput("");
  }

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[70]">
        <Button
          type="button"
          onClick={() => setIsOpen(open => !open)}
          className="size-12 rounded-none border border-black bg-black text-white hover:bg-black/85"
        >
          {isOpen ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
        </Button>
      </div>

      {isOpen ? (
        <div className="fixed bottom-24 left-6 z-[70] w-[calc(100vw-3rem)] max-w-md border border-black bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-black/15 px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-wider">Assistente Virtual</div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleNewSession}
                className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-black/70 transition-colors hover:text-black"
              >
                Nova sessão
              </button>
            </div>
          </div>

          <div ref={messagesContainerRef} className="max-h-[55vh] min-h-72 overflow-y-auto px-4 py-4">
            {messages.length === 0 ? (
              <div className="space-y-3 text-sm leading-relaxed text-black/70">
                <p>Olá. Posso ajudar com informações sobre equipe, áreas de atuação e atendimento do escritório.</p>
                <p>Se preferir, você também pode falar diretamente com a equipe pelo WhatsApp.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map(message => (
                  <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                    <div
                      className={
                        message.role === "user"
                          ? "max-w-[85%] border border-black bg-black px-3 py-2 text-sm text-white"
                          : "w-full max-w-full border border-black/15 bg-white px-3 py-2 text-sm text-black"
                      }
                    >
                      {message.parts.map((part, index) => {
                        if (part.type !== "text") {
                          return null;
                        }

                        const isLatestAssistantMessage =
                          message.role === "assistant" &&
                          message.id === messages[messages.length - 1]?.id;

                        return (
                          <Streamdown
                            key={`${message.id}-${index}`}
                            className="streamdown chat-streamdown"
                            linkSafety={{ enabled: false }}
                            controls={{
                              table: false,
                            }}
                            components={chatStreamdownComponents}
                            isAnimating={status === "streaming" && isLatestAssistantMessage}
                          >
                            {part.text}
                          </Streamdown>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isSending ? (
              <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-wider text-black/50">
                <Brain className="h-3.5 w-3.5" />
                <Shimmer
                  duration={1}
                  className="[--color-background:#111111] [--color-muted-foreground:#6b7280]"
                >
                  Pensando...
                </Shimmer>
              </div>
            ) : null}

            {error ? (
              <div className="mt-4 border border-black/15 bg-neutral-50 px-3 py-2 text-xs text-black/70">
                Não consegui responder agora. Tente novamente.
              </div>
            ) : null}
          </div>

          <div className="border-t border-black/15 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={event => setInput(event.currentTarget.value)}
                placeholder="Digite sua dúvida..."
                className="h-10 w-full border border-black/20 px-3 text-sm outline-none focus:border-black"
                disabled={isSending}
              />
              <Button
                type="submit"
                disabled={isSending}
                className="h-10 rounded-none border border-black bg-black px-3 text-white hover:bg-black/85"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <Button
              asChild
              className="mt-3 h-10 w-full rounded-none border border-black bg-white text-xs uppercase tracking-wider text-black hover:bg-neutral-100"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Falar com a equipe no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
