import "server-only";

import { getResendClient, getResendFromEmail } from "@/lib/resend";

type SendLeadConfirmationEmailParams = {
  confirmUrl: string;
  idempotencyKey: string;
  nome: string;
  to: string;
};

export async function sendLeadConfirmationEmail({
  confirmUrl,
  idempotencyKey,
  nome,
  to,
}: SendLeadConfirmationEmailParams) {
  const resend = getResendClient();
  const from = getResendFromEmail();
  const firstName = nome.trim().split(/\s+/)[0] ?? "Cliente";
  const safeFirstName = escapeHtml(firstName);
  const subject = "Confirmação de e-mail | FUSTINONI ADVOCACIA";
  const preheader =
    "Confirme seu e-mail para agilizar nosso contato com você.";

  const text = [
    `Olá, ${firstName}.`,
    "",
    "Recebemos sua solicitação de contato no site da FUSTINONI ADVOCACIA.",
    "Para facilitar nossa comunicação e agilizar o atendimento, confirme seu e-mail no link abaixo:",
    confirmUrl,
    "",
    "Este link expira em 24 horas e pode ser usado apenas uma vez.",
    "Se você não fez esta solicitação, ignore este e-mail.",
    "",
    "Atenciosamente,",
    "Equipe FUSTINONI ADVOCACIA",
  ].join("\n");

  const html = `
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${preheader}
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
                  Confirmação de e-mail
                </h1>
                <p style="margin:0 0 14px;font-size:16px;line-height:1.65;">
                  Olá, <strong>${safeFirstName}</strong>.
                </p>
                <p style="margin:0 0 14px;font-size:16px;line-height:1.65;">
                  Recebemos sua solicitação de contato no site da FUSTINONI ADVOCACIA.
                  Para facilitar nossa comunicação e agilizar o atendimento, confirme seu e-mail.
                </p>
                <p style="margin:0 0 22px;font-size:16px;line-height:1.65;">
                  Este link expira em <strong>24 horas</strong> e pode ser usado apenas uma vez.
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 22px;">
                  <tr>
                    <td style="background:#111111;">
                      <a href="${confirmUrl}" style="display:inline-block;padding:12px 22px;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.03em;text-transform:uppercase;">
                        Confirmar e-mail
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:#4b4b4b;">
                  Se o botão não abrir, copie e cole este link no navegador:
                </p>
                <p style="margin:0 0 18px;font-size:13px;line-height:1.7;word-break:break-word;">
                  <a href="${confirmUrl}" style="color:#7a5d2f;text-decoration:underline;">${confirmUrl}</a>
                </p>
                <hr style="border:none;border-top:1px solid #e6e1d8;margin:0 0 16px;" />
                <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#666666;">
                  Se você não fez esta solicitação, ignore este e-mail.
                </p>
                <p style="margin:0;font-size:13px;line-height:1.6;color:#666666;">
                  Equipe FUSTINONI ADVOCACIA
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
      to: [to],
      subject,
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
