import { readFile } from "node:fs/promises";
import path from "node:path";

import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const runtime = "nodejs";
export const maxDuration = 30;

let cachedContext: string | null = null;

async function loadProjectContext(): Promise<string> {
  if (cachedContext) {
    return cachedContext;
  }

  const basePath = path.join(process.cwd(), "context");
  const [lawyersContext, practiceAreasContext] = await Promise.all([
    readFile(path.join(basePath, "advogados.md"), "utf8"),
    readFile(path.join(basePath, "areas-atuacao.md"), "utf8"),
  ]);

  cachedContext = [
    "# CONTEXTO DO PROJETO (FONTE ÚNICA)",
    "## Arquivo: advogados.md",
    lawyersContext,
    "## Arquivo: areas-atuacao.md",
    practiceAreasContext,
  ].join("\n\n");

  return cachedContext;
}

function buildSystemPrompt(projectContext: string, whatsappUrl: string): string {
  return `
Você é o assistente virtual da FUSTINONI ADVOCACIA.

Objetivo:
- Responder dúvidas exclusivamente sobre:
  1) equipe de advogados;
  2) áreas de atuação;
  3) forma de atendimento e próximo passo para agendamento.

Regras obrigatórias:
- Use APENAS o contexto fornecido abaixo.
- Não invente informações, não complemente com conhecimento externo e não faça suposições.
- Se a pergunta estiver fora do contexto do escritório (ex.: clima, futebol, política, entretenimento), recuse de forma educada e diga que pode ajudar apenas com informações institucionais do escritório.
- Se o usuário pedir para avançar com consulta, atendimento humano, agendamento ou contato, NÃO mostre URL crua.
- Nesses casos, responda usando exatamente este link em Markdown:
  [Falar com a equipe no WhatsApp](${whatsappUrl})
- Não exiba o endereço completo "https://wa.me/..." em texto puro.
- Se o usuário pedir tabela, responda em tabela Markdown válida.
- Responda sempre em português do Brasil.
- Mantenha respostas claras, objetivas e profissionais.

Contexto oficial:
${projectContext}
`.trim();
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const projectContext = await loadProjectContext();
    const whatsappUrl = buildWhatsAppUrl();

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: buildSystemPrompt(projectContext, whatsappUrl),
      messages: await convertToModelMessages(messages),
      temperature: 0.2,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat route error:", error);
    return new Response(
      "Não foi possível processar sua mensagem agora. Tente novamente em instantes.",
      { status: 500 },
    );
  }
}
