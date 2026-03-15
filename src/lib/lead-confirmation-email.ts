import "server-only";

import { type AppLocale } from "@/i18n/routing";
import { getResendClient, getResendFromEmail } from "@/lib/resend";

type SendLeadConfirmationEmailParams = {
  confirmUrl: string;
  idempotencyKey: string;
  locale: AppLocale;
  nome: string;
  to: string;
};

type EmailCopy = {
  subject: string;
  preheader: string;
  heading: string;
  greeting: string;
  bodyLine1: string;
  bodyLine2: string;
  expiryLine: string;
  cta: string;
  fallbackLine: string;
  ignoreLine: string;
  signature: string;
};

const COPY_BY_LOCALE: Record<AppLocale, EmailCopy> = {
  pt: {
    subject: "Confirmação de e-mail | FUSTINONI ADVOCACIA",
    preheader: "Confirme seu e-mail para agilizar nosso contato com você.",
    heading: "Confirmação de e-mail",
    greeting: "Olá",
    bodyLine1:
      "Recebemos sua solicitação de contato no site da FUSTINONI ADVOCACIA.",
    bodyLine2:
      "Para facilitar nossa comunicação e agilizar o atendimento, confirme seu e-mail.",
    expiryLine:
      "Este link expira em 24 horas e pode ser usado apenas uma vez.",
    cta: "Confirmar e-mail",
    fallbackLine:
      "Se o botão não abrir, copie e cole este link no navegador:",
    ignoreLine: "Se você não fez esta solicitação, ignore este e-mail.",
    signature: "Equipe FUSTINONI ADVOCACIA",
  },
  en: {
    subject: "Email confirmation | FUSTINONI ADVOCACIA",
    preheader: "Confirm your email to speed up our contact with you.",
    heading: "Email confirmation",
    greeting: "Hello",
    bodyLine1:
      "We received your contact request on the FUSTINONI ADVOCACIA website.",
    bodyLine2:
      "To facilitate communication and speed up assistance, please confirm your email.",
    expiryLine:
      "This link expires in 24 hours and can only be used once.",
    cta: "Confirm email",
    fallbackLine: "If the button does not open, copy and paste this link in your browser:",
    ignoreLine: "If you did not make this request, please ignore this email.",
    signature: "FUSTINONI ADVOCACIA Team",
  },
  es: {
    subject: "Confirmación de correo | FUSTINONI ADVOCACIA",
    preheader: "Confirme su correo para agilizar nuestro contacto con usted.",
    heading: "Confirmación de correo",
    greeting: "Hola",
    bodyLine1:
      "Recibimos su solicitud de contacto en el sitio de FUSTINONI ADVOCACIA.",
    bodyLine2:
      "Para facilitar nuestra comunicación y agilizar la atención, confirme su correo.",
    expiryLine:
      "Este enlace vence en 24 horas y solo puede usarse una vez.",
    cta: "Confirmar correo",
    fallbackLine:
      "Si el botón no abre, copie y pegue este enlace en su navegador:",
    ignoreLine:
      "Si usted no realizó esta solicitud, ignore este correo.",
    signature: "Equipo FUSTINONI ADVOCACIA",
  },
  it: {
    subject: "Conferma e-mail | FUSTINONI ADVOCACIA",
    preheader: "Confermi la sua e-mail per velocizzare il nostro contatto.",
    heading: "Conferma e-mail",
    greeting: "Buongiorno",
    bodyLine1:
      "Abbiamo ricevuto la sua richiesta di contatto sul sito di FUSTINONI ADVOCACIA.",
    bodyLine2:
      "Per facilitare la comunicazione e velocizzare l'assistenza, confermi la sua e-mail.",
    expiryLine:
      "Questo link scade in 24 ore e può essere usato una sola volta.",
    cta: "Conferma e-mail",
    fallbackLine:
      "Se il pulsante non si apre, copi e incolli questo link nel browser:",
    ignoreLine:
      "Se non ha effettuato questa richiesta, ignori questa e-mail.",
    signature: "Team FUSTINONI ADVOCACIA",
  },
};

export async function sendLeadConfirmationEmail({
  confirmUrl,
  idempotencyKey,
  locale,
  nome,
  to,
}: SendLeadConfirmationEmailParams) {
  const resend = getResendClient();
  const from = getResendFromEmail();
  const replyTo =
    process.env.RESEND_REPLY_TO_EMAIL?.trim() || "contato@fustinoni.adv.br";
  const firstName = nome.trim().split(/\s+/)[0] ?? "Cliente";
  const safeFirstName = escapeHtml(firstName);
  const copy = COPY_BY_LOCALE[locale] ?? COPY_BY_LOCALE.pt;

  const text = [
    `${copy.greeting}, ${firstName}.`,
    "",
    copy.bodyLine1,
    copy.bodyLine2,
    confirmUrl,
    "",
    copy.expiryLine,
    copy.ignoreLine,
    "",
    copy.signature,
  ].join("\n");

  const html = `
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${copy.preheader}
    </div>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f4f1eb;padding:28px 12px;font-family:Georgia,'Times New Roman',serif;color:#1b1b1b;">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:620px;background:#ffffff;border:1px solid #d8d2c7;">
            <tr>
              <td style="padding:22px 28px;background:#111111;color:#f5f2ec;">
                <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">FUSTINONI ADVOCACIA</div>
                <div style="font-size:12px;margin-top:8px;color:#d7c8aa;">Assessoria jurídica estratégica</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <h1 style="margin:0 0 16px;font-size:30px;line-height:1.15;font-weight:600;color:#111111;">
                  ${copy.heading}
                </h1>
                <p style="margin:0 0 14px;font-size:16px;line-height:1.65;">
                  ${copy.greeting}, <strong>${safeFirstName}</strong>.
                </p>
                <p style="margin:0 0 14px;font-size:16px;line-height:1.65;">
                  ${copy.bodyLine1}
                </p>
                <p style="margin:0 0 14px;font-size:16px;line-height:1.65;">
                  ${copy.bodyLine2}
                </p>
                <p style="margin:0 0 22px;font-size:16px;line-height:1.65;">
                  ${copy.expiryLine}
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 22px;">
                  <tr>
                    <td style="background:#111111;">
                      <a href="${confirmUrl}" style="display:inline-block;padding:12px 22px;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.03em;text-transform:uppercase;">
                        ${copy.cta}
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:#4b4b4b;">
                  ${copy.fallbackLine}
                </p>
                <p style="margin:0 0 18px;font-size:13px;line-height:1.7;word-break:break-word;">
                  <a href="${confirmUrl}" style="color:#7a5d2f;text-decoration:underline;">${confirmUrl}</a>
                </p>
                <hr style="border:none;border-top:1px solid #e6e1d8;margin:0 0 16px;" />
                <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#666666;">
                  ${copy.ignoreLine}
                </p>
                <p style="margin:0;font-size:13px;line-height:1.6;color:#666666;">
                  ${copy.signature}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `.trim();

  const { data, error } = await resend.emails.send(
    {
      from,
      replyTo: [replyTo],
      to: [to],
      subject: copy.subject,
      html,
      text,
    },
    {
      idempotencyKey,
    },
  );

  if (error) {
    throw new Error(`Falha ao enviar e-mail de confirmação: ${error.message}`);
  }

  return data;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
