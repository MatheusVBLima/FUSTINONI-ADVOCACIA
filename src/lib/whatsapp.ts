const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, gostaria de agendar uma consulta com a equipe da FUSTINONI ADVOCACIA.";

export const CHAT_WHATSAPP_PREFILL_MESSAGE =
  "Olá! Estava usando o assistente virtual do site e gostaria de falar com um atendente da FUSTINONI ADVOCACIA.";

function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function buildWhatsAppUrl(
  phone = process.env.WHATSAPP_PHONE_NUMBER ?? "",
  message = process.env.WHATSAPP_PREFILL_TEXT ?? DEFAULT_WHATSAPP_MESSAGE,
): string {
  const normalizedPhone = sanitizePhoneNumber(phone);

  if (!normalizedPhone) {
    return "#";
  }

  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${normalizedPhone}?text=${encodedMessage}`;
}
