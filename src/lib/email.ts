import "server-only";

import nodemailer from "nodemailer";

/**
 * Transactional email.
 *
 * Templates use the Arkynox palette (zinc-900 CTAs, #f8fafc page, #f1f5f9
 * surfaces) so outbound mail matches the in-app design system.
 *
 * All senders return `false` — never throw — when SMTP is not configured, so a
 * missing mail configuration degrades gracefully in local development.
 */

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });
}

function fromAddress(): string | null {
  return process.env.SMTP_FROM || process.env.SMTP_USER || null;
}

/** Shared branded shell so every ArkyDesk email looks the same. */
function layout(options: {
  greeting: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
  footnote: string;
}) {
  const button = options.ctaUrl && options.ctaLabel
    ? `<tr><td style="padding:8px 32px 28px;">
         <a href="${options.ctaUrl}"
            style="display:inline-block;background:#18181b;color:#ffffff;text-decoration:none;
                   padding:14px 28px;border-radius:12px;font-weight:700;font-size:14px;">${options.ctaLabel}</a>
       </td></tr>`
    : "";

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="max-width:560px;background:#ffffff;border:1px solid rgba(15,23,42,0.1);
                    border-radius:16px;overflow:hidden;">
        <tr><td style="padding:28px 32px 0;">
          <span style="font-size:18px;font-weight:900;letter-spacing:-0.03em;color:#18181b;">ArkyDesk</span>
          <span style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;margin-left:8px;">Arkynox</span>
        </td></tr>
        <tr><td style="padding:20px 32px 0;">
          <h1 style="margin:0 0 12px;font-size:22px;font-weight:800;letter-spacing:-0.02em;color:#0f172a;">${options.greeting}</h1>
          <div style="margin:0;font-size:15px;line-height:1.6;color:#475569;">${options.body}</div>
        </td></tr>
        ${button}
        <tr><td style="padding:0 32px 28px;">
          <div style="background:#f1f5f9;border-radius:12px;padding:16px;font-size:12px;line-height:1.55;color:#64748b;">
            ${options.footnote}
          </div>
        </td></tr>
        <tr><td style="border-top:1px solid rgba(15,23,42,0.1);padding:18px 32px;">
          <p style="margin:0;font-size:11px;line-height:1.5;color:#94a3b8;">
            Sent by Arkynox. If you did not expect this email you can safely ignore it.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

async function send(options: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const transporter = getTransporter();
  const from = fromAddress();
  if (!transporter || !from) return false;

  try {
    await transporter.sendMail({
      from: `${options.subject.includes("ArkyDesk") ? "ArkyDesk" : "Arkynox"} <${from}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

/** Magic link that signs a visitor into their guest ticket workspace. */
export function sendGuestLoginLinkEmail(name: string, to: string, loginUrl: string) {
  return send({
    to,
    subject: "Your ArkyDesk temporary login link",
    html: layout({
      greeting: `Hello ${escapeHtml(name)},`,
      body: `<p style="margin:0 0 12px;">Use the button below to open your ArkyDesk guest workspace and continue your support conversation.</p>
             <p style="margin:0;">This link signs you in without a password.</p>`,
      ctaLabel: "Open my workspace",
      ctaUrl: loginUrl,
      footnote:
        "This link can be used <strong>once</strong> and expires in 60 minutes. If you did not request guest access, you can ignore this email.",
    }),
  });
}

/** Confirms ownership of the address used to create the account. */
export function sendVerificationEmail(name: string, to: string, verifyUrl: string) {
  return send({
    to,
    subject: "Confirm your ArkyDesk email address",
    html: layout({
      greeting: `Welcome to ArkyDesk, ${escapeHtml(name)}.`,
      body: `<p style="margin:0 0 12px;">Confirm this email address to secure your account and make sure we can reach you about your support tickets.</p>`,
      ctaLabel: "Confirm my email",
      ctaUrl: verifyUrl,
      footnote: `This link expires in <strong>24 hours</strong>. If you did not create an ArkyDesk account, ignore this email.`,
    }),
  });
}

/** Password reset link. */
export function sendPasswordResetEmail(name: string, to: string, resetUrl: string) {
  return send({
    to,
    subject: "Reset your ArkyDesk password",
    html: layout({
      greeting: `Password reset requested`,
      body: `<p style="margin:0 0 12px;">Hello ${escapeHtml(
        name
      )}, we received a request to reset the password on your ArkyDesk account.</p>`,
      ctaLabel: "Choose a new password",
      ctaUrl: resetUrl,
      footnote: `This link can be used <strong>once</strong> and expires in <strong>60 minutes</strong>. If you did not request a reset, your password has not changed and you can ignore this email.`,
    }),
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
