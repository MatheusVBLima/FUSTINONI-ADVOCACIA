import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { buildWhatsAppUrl, CHAT_WHATSAPP_PREFILL_MESSAGE } from "@/lib/whatsapp";

export const runtime = "nodejs";
export const maxDuration = 30;

const BCB_REPORT_URL =
  "https://www.bcb.gov.br/meubc/relatorioemprestimofinanciamento";
const CHAT_TOTAL_TIMEOUT_MS = 25_000;
const CHAT_CHUNK_TIMEOUT_MS = 8_000;


let cachedContext: string | null = null;

async function loadProjectContext(): Promise<string> {
  if (cachedContext) {
    return cachedContext;
  }

  const basePath = path.join(process.cwd(), "context");
  const files = await readdir(basePath, { withFileTypes: true });
  const markdownFiles = files
    .filter(file => file.isFile() && file.name.toLowerCase().endsWith(".md"))
    .map(file => file.name)
    .sort((a, b) => a.localeCompare(b));

  if (markdownFiles.length === 0) {
    throw new Error("Nenhum arquivo de contexto (.md) encontrado na pasta context.");
  }

  const blocks = await Promise.all(
    markdownFiles.map(async fileName => {
      const content = await readFile(path.join(basePath, fileName), "utf8");
      return [`## Arquivo: ${fileName}`, content].join("\n\n");
    }),
  );

  cachedContext = ["# CONTEXTO DO PROJETO (FONTE ÚNICA)", ...blocks].join("\n\n");

  return cachedContext;
}

function buildSystemPrompt(
  projectContext: string,
  whatsappUrl: string,
  bcbReportUrl: string,
): string {
  return `
Você é o assistente virtual da FUSTINONI ADVOCACIA.

Objetivo:
- Responder dúvidas exclusivamente sobre:
  1) equipe de advogados;
  2) áreas de atuação;
  3) serviços específicos do escritório;
  4) forma de atendimento e próximo passo para agendamento.

Regras obrigatórias:
- Use APENAS o contexto fornecido abaixo.
- Não invente informações, não complemente com conhecimento externo e não faça suposições.
- Adapte a profundidade ao tipo de pergunta.
- Pergunta ampla (ex.: "fale sobre [serviço]"): responda em formato de resumo executivo, cobrindo apenas:
  1) o que é;
  2) para quem é;
  3) próximo passo prático.
- Pergunta específica: responda diretamente ao ponto, sem adicionar blocos extras.
- Não despeje página inteira, FAQ completo ou listas longas sem solicitação explícita do usuário.
- Só traga conteúdo extenso quando o usuário pedir claramente (ex.: "detalhe", "completo", "liste tudo", "traga o FAQ").
- Ao final de respostas amplas, ofereça opcionalmente 2 ou 3 recortes para aprofundar (ex.: elegibilidade, documentos, riscos, etapas).
- Faça uma checagem interna antes de enviar: se houver excesso para a intenção da pergunta, resuma mantendo precisão.
- Quando a dúvida for sobre "Análise de Apontamentos Indevidos", elegibilidade, documentos iniciais, SCR, Registrato ou recusa de crédito sem negativação:
  - indique como passo prático principal a emissão do relatório do Banco Central;
  - inclua exatamente este link em Markdown:
    [Gerar Relatório de Empréstimos e Financiamentos (Banco Central)](${bcbReportUrl})
- Não exiba a URL do Banco Central em texto puro.
- Se a pergunta estiver fora do contexto do escritório (ex.: clima, futebol, política, entretenimento), recuse de forma educada e diga que pode ajudar apenas com informações institucionais e serviços do escritório.
- Se o usuário pedir para avançar com consulta, atendimento humano, agendamento ou contato, NÃO mostre URL crua.
- Nesses casos, responda usando exatamente este link em Markdown:
  [Falar com a equipe no WhatsApp](${whatsappUrl})
- Não exiba o endereço completo "https://wa.me/..." em texto puro.
- Ao listar itens, use listas Markdown (- item) em vez de tabelas. Reserve tabelas apenas quando o usuário pedir explicitamente ("tabela", "em formato de tabela").
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
    const whatsappUrl = buildWhatsAppUrl(undefined, CHAT_WHATSAPP_PREFILL_MESSAGE);

    const result = streamText({
      model: google("gemini-3.1-flash-lite-preview"),
      system: buildSystemPrompt(projectContext, whatsappUrl, BCB_REPORT_URL),
      messages: await convertToModelMessages(messages),
      temperature: 0.1,
      maxRetries: 0,
      timeout: {
        totalMs: CHAT_TOTAL_TIMEOUT_MS,
        chunkMs: CHAT_CHUNK_TIMEOUT_MS,
      },
      providerOptions: {
        google: {
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      },
      onFinish: ({ finishReason }) => {
        console.info("Chat stream finished:", finishReason);
      },
      onError: ({ error }) => {
        console.error("Chat streamText error:", error);
      },
    });

    return result.toUIMessageStreamResponse({
      onError: error => {
        console.error("Chat UI stream error:", error);
        return "Não consegui concluir a resposta agora. Tente novamente.";
      },
    });
  } catch (error) {
    console.error("Chat route error:", error);
    return new Response(
      "Não foi possível processar sua mensagem agora. Tente novamente em instantes.",
      { status: 500 },
    );
  }
}
