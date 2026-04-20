import nodemailer from "nodemailer";
import { env } from "./env";

type LeadEmailInput = {
  full_name: string;
  email?: string | null;
  phone?: string | null;
  message: string;
  created_at?: string;
};

function isMailerConfigured() {
  return Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASSWORD);
}

export async function sendLeadNotification(input: LeadEmailInput) {
  if (!isMailerConfigured()) return { sent: false, reason: "smtp_not_configured" };

  const to = env.LEADS_NOTIFY_TO ?? "studioj@stevedavila.com";
  const from = env.SMTP_FROM ?? env.SMTP_USER!;
  const port = env.SMTP_PORT ?? 587;
  const secure = env.SMTP_SECURE ?? port === 465;

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD
    }
  });

  const subject = `Nuevo mensaje web: ${input.full_name}`;
  const lines = [
    `Nombre: ${input.full_name}`,
    `Email: ${input.email ?? "-"}`,
    `Teléfono: ${input.phone ?? "-"}`,
    input.created_at ? `Fecha: ${input.created_at}` : null,
    "",
    "Mensaje:",
    input.message
  ].filter(Boolean);

  await transporter.sendMail({
    from,
    to,
    replyTo: input.email ?? undefined,
    subject,
    text: lines.join("\n")
  });

  return { sent: true };
}

