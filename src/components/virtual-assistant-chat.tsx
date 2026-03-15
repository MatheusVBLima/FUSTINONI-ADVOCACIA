"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Brain, MessageCircle, Send, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Streamdown } from "streamdown";

import { Shimmer } from "@/components/ai-elements/shimmer";
import { LeadCaptureDialog } from "@/components/lead-capture-dialog";
import { Button } from "@/components/ui/button";
import { type AppLocale } from "@/i18n/routing";
import { getChatWhatsAppPrefillMessage } from "@/lib/whatsapp";

type VirtualAssistantChatProps = {
  locale: AppLocale;
  whatsappUrl: string;
  whatsappPhone: string;
};

const TABLE_SEPARATOR_PATTERN =
  /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*(?:\s*:?-{3,}:?\s*)?\|?\s*$/;

function getTableCellCount(line: string): number {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|")) {
    return 0;
  }

  const withoutLeadingPipe = trimmed.slice(1);
  const withoutEdgePipes = withoutLeadingPipe.endsWith("|")
    ? withoutLeadingPipe.slice(0, -1)
    : withoutLeadingPipe;

  const cells = withoutEdgePipes.split("|").map(cell => cell.trim());
  return cells.filter(Boolean).length;
}

function normalizeMarkdownTables(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const normalized: string[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const currentLine = lines[index] ?? "";
    normalized.push(currentLine);

    if (TABLE_SEPARATOR_PATTERN.test(currentLine)) {
      continue;
    }

    const cellCount = getTableCellCount(currentLine);
    if (cellCount < 2) {
      continue;
    }

    let previousNonEmptyIndex = index - 1;
    while (
      previousNonEmptyIndex >= 0 &&
      !(lines[previousNonEmptyIndex] ?? "").trim()
    ) {
      previousNonEmptyIndex -= 1;
    }

    const previousNonEmptyLine =
      previousNonEmptyIndex >= 0 ? lines[previousNonEmptyIndex] ?? "" : "";
    const previousLineIsTableLike =
      TABLE_SEPARATOR_PATTERN.test(previousNonEmptyLine) ||
      getTableCellCount(previousNonEmptyLine) >= 2;
    if (previousLineIsTableLike) {
      continue;
    }

    let nextNonEmptyIndex = index + 1;
    while (nextNonEmptyIndex < lines.length && !(lines[nextNonEmptyIndex] ?? "").trim()) {
      nextNonEmptyIndex += 1;
    }

    const nextNonEmptyLine = lines[nextNonEmptyIndex] ?? "";
    if (TABLE_SEPARATOR_PATTERN.test(nextNonEmptyLine)) {
      continue;
    }

    const separator = `| ${Array.from({ length: cellCount }, () => "---").join(" | ")} |`;
    normalized.push(separator);
  }

  return normalized.join("\n");
}

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

export function VirtualAssistantChat({
  locale,
  whatsappPhone,
}: VirtualAssistantChatProps) {
  const t = useTranslations("virtualAssistant");
  const resolvedLocale = (useLocale() as AppLocale) ?? locale;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [streamNotice, setStreamNotice] = useState<string | null>(null);
  const panelId = useId();
  const headingId = useId();
  const inputId = useId();
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previouslyOpenRef = useRef(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const { messages, sendMessage, status, error, setMessages, clearError, stop } =
    useChat({
      transport: new DefaultChatTransport({
        api: `/api/chat?locale=${resolvedLocale}`,
      }),
      onError: () => {
        setStreamNotice(t("streamInterrupted"));
      },
      onFinish: ({ isAbort, isDisconnect, isError, finishReason }) => {
        if (isAbort) {
          return;
        }

        const streamEndedWithIssue =
          isDisconnect || isError || finishReason === "length";
        if (streamEndedWithIssue) {
          setStreamNotice(t("streamIncomplete"));
          return;
        }

        setStreamNotice(null);
      },
    });

  useEffect(() => {
    if (!messagesContainerRef.current) {
      return;
    }

    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages, status]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    } else if (previouslyOpenRef.current) {
      toggleButtonRef.current?.focus();
    }

    previouslyOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen]);

  const isSending = status === "submitted" || status === "streaming";

  function handleNewSession() {
    if (isSending) {
      stop();
    }

    setMessages([]);
    clearError();
    setInput("");
    setStreamNotice(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedInput = input.trim();

    if (!trimmedInput || isSending) {
      return;
    }

    setStreamNotice(null);
    sendMessage({ text: trimmedInput });
    setInput("");
  }

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[70]">
        <Button
          ref={toggleButtonRef}
          type="button"
          onClick={() => setIsOpen(open => !open)}
          className="size-12 rounded-none border border-black bg-black text-white hover:bg-black/85"
          aria-label={isOpen ? t("closeAssistantAria") : t("openAssistantAria")}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          {isOpen ? (
            <X className="h-4 w-4" aria-hidden="true" />
          ) : (
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>

      {isOpen ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={headingId}
          className="fixed bottom-24 left-6 z-[70] w-[calc(100vw-3rem)] max-w-md border border-black bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-black/15 px-4 py-3">
            <div id={headingId} className="text-xs font-semibold uppercase tracking-wider">
              {t("title")}
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleNewSession}
                className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-black/70 transition-colors hover:text-black"
              >
                {t("newSession")}
              </button>
            </div>
          </div>

          <div
            ref={messagesContainerRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-atomic={false}
            className="max-h-[55vh] min-h-72 overflow-y-auto px-4 py-4"
          >
            {messages.length === 0 ? (
              <div className="space-y-3 text-sm leading-relaxed text-black/70">
                <p>{t("introLine1")}</p>
                <p>{t("introLine2")}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
                  >
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
                        const isStreamingAssistantMessage =
                          status === "streaming" && isLatestAssistantMessage;
                        const normalizedMarkdown = normalizeMarkdownTables(part.text);

                        return (
                          <Streamdown
                            key={`${message.id}-${index}`}
                            className="streamdown chat-streamdown"
                            linkSafety={{ enabled: false }}
                            controls={{
                              table: false,
                            }}
                            components={chatStreamdownComponents}
                            mode={isStreamingAssistantMessage ? "streaming" : "static"}
                            isAnimating={isStreamingAssistantMessage}
                          >
                            {normalizedMarkdown}
                          </Streamdown>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isSending ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-4 flex items-center gap-2 text-xs uppercase tracking-wider text-black/70"
              >
                <Brain className="h-3.5 w-3.5" aria-hidden="true" />
                <Shimmer
                  duration={1}
                  className="[--color-background:#111111] [--color-muted-foreground:#6b7280]"
                >
                  {t("thinking")}
                </Shimmer>
              </div>
            ) : null}

            {error ? (
              <div role="alert" className="mt-4 border border-black/15 bg-neutral-50 px-3 py-2 text-xs text-black/70">
                {t("errorResponse")}
              </div>
            ) : null}

            {streamNotice && !error ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-4 border border-black/15 bg-neutral-50 px-3 py-2 text-xs text-black/70"
              >
                {streamNotice}
              </div>
            ) : null}
          </div>

          <div className="border-t border-black/15 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <label htmlFor={inputId} className="sr-only">
                {t("inputLabel")}
              </label>
              <input
                id={inputId}
                ref={inputRef}
                value={input}
                onChange={event => setInput(event.currentTarget.value)}
                placeholder={t("inputPlaceholder")}
                className="h-10 w-full border border-black/20 px-3 text-sm outline-none focus:border-black"
                disabled={isSending}
              />
              <Button
                type="submit"
                disabled={isSending}
                className="h-10 rounded-none border border-black bg-black px-3 text-white hover:bg-black/85"
                aria-label={t("sendAria")}
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>

            <LeadCaptureDialog
              whatsappPhone={whatsappPhone}
              whatsappBaseMessage={getChatWhatsAppPrefillMessage(resolvedLocale)}
            >
              <Button className="mt-3 h-10 w-full rounded-none border border-black bg-white text-xs uppercase tracking-wider text-black hover:bg-neutral-100">
                {t("ctaWhatsApp")}
              </Button>
            </LeadCaptureDialog>
          </div>
        </div>
      ) : null}
    </>
  );
}
