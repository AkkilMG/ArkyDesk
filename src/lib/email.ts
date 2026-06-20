import 'server-only';
import nodemailer from 'nodemailer';

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });
}

export async function sendGuestLoginLinkEmail(name: string, to: string, loginUrl: string) {
  const transporter = getTransporter();
  if (!transporter) {
    return false;
  }

  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!fromAddress) {
    return false;
  }

  await transporter.sendMail({
    from: fromAddress,
    to,
    subject: 'Your temporary ArkyDesk login link',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1f2937;">
        <h2 style="margin-bottom: 12px;">Hello ${name},</h2>
        <p style="margin-bottom: 16px;">Your temporary login link is ready. Use it once to access your guest account and continue the conversation.</p>
        <p style="margin-bottom: 20px;">
          <a href="${loginUrl}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;">Open your temporary account</a>
        </p>
        <p style="font-size: 13px; color: #6b7280;">This link expires soon and can only be used once.</p>
      </div>
    `,
  });

  return true;
}
