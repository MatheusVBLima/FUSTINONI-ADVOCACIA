import type { AppLocale } from "@/i18n/routing";

const DEFAULT_LOCALE: AppLocale = "pt";

const DEFAULT_WHATSAPP_MESSAGE_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Olá, gostaria de agendar uma consulta com a equipe da FUSTINONI ADVOCACIA.",
  en: "Hello, I would like to schedule a consultation with the FUSTINONI ADVOCACIA team.",
  es: "Hola, me gustaría agendar una consulta con el equipo de FUSTINONI ADVOCACIA.",
  it: "Buongiorno, vorrei fissare una consulenza con il team di FUSTINONI ADVOCACIA.",
};

const CHAT_WHATSAPP_PREFILL_MESSAGE_BY_LOCALE: Record<AppLocale, string> = {
  pt: "Olá! Estava usando o assistente virtual do site e gostaria de falar com um atendente da FUSTINONI ADVOCACIA.",
  en: "Hello! I was using the website virtual assistant and would like to speak with someone from FUSTINONI ADVOCACIA.",
  es: "¡Hola! Estaba usando el asistente virtual del sitio y me gustaría hablar con un asesor de FUSTINONI ADVOCACIA.",
  it: "Buongiorno! Stavo usando l'assistente virtuale del sito e vorrei parlare con un consulente di FUSTINONI ADVOCACIA.",
};

export function getDefaultWhatsAppMessage(locale: AppLocale = DEFAULT_LOCALE) {
  return (
    DEFAULT_WHATSAPP_MESSAGE_BY_LOCALE[locale] ??
    DEFAULT_WHATSAPP_MESSAGE_BY_LOCALE[DEFAULT_LOCALE]
  );
}

export function getChatWhatsAppPrefillMessage(
  locale: AppLocale = DEFAULT_LOCALE,
) {
  return (
    CHAT_WHATSAPP_PREFILL_MESSAGE_BY_LOCALE[locale] ??
    CHAT_WHATSAPP_PREFILL_MESSAGE_BY_LOCALE[DEFAULT_LOCALE]
  );
}

function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function buildWhatsAppUrl(
  phone = process.env.WHATSAPP_PHONE_NUMBER ?? "",
  message = process.env.WHATSAPP_PREFILL_TEXT ?? getDefaultWhatsAppMessage(),
): string {
  const normalizedPhone = sanitizePhoneNumber(phone);

  if (!normalizedPhone) {
    return "#";
  }

  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${normalizedPhone}?text=${encodedMessage}`;
}

export function buildLeadWhatsAppMessage(
  nome: string,
  email: string,
  resumo: string,
  baseMessage = getDefaultWhatsAppMessage(),
): string {
  const parts = [baseMessage, "", `Nome: ${nome}`, `E-mail: ${email}`];

  if (resumo.trim()) {
    parts.push("", `Resumo: ${resumo.trim()}`);
  }

  return parts.join("\n");
}
