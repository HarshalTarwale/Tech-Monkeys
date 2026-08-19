import { Resend } from "resend";

import { site } from "@/lib/content";

/**
 * Delivers the /contact form to the studio's inbox via Resend.
 *
 * TODO(client): set RESEND_API_KEY in the deployment environment (see
 * .env.example) before this can actually send anything — without it every
 * submission fails server-side with a 500, logged but never delivered.
 * Once you have a Resend account, either verify a sending domain and swap
 * `FROM` below for an address on it, or leave the Resend sandbox sender in
 * place for testing. Also set CONTACT_TO_EMAIL if enquiries should land
 * somewhere other than `site.email`.
 *
 * Not built as a Server Action deliberately: this needs to be callable with
 * a plain `fetch`, a `Retry-After`-bearing 429, and a JSON error body the
 * client component can branch on — a normal Route Handler is the more
 * direct fit than a form action here.
 */

export const runtime = "nodejs";

// Resend's own shared sandbox sender — works with no domain verification,
// but Resend will only actually deliver mail sent through it to the
// account owner's own verified address. Real production sending needs a
// verified domain; swap this for e.g. "Tech Monkeys <enquiries@techmonkey.space>"
// once one exists.
const FROM = "Tech Monkeys <onboarding@resend.dev>";

// Minimum time a real visitor takes to fill the form. Caught bots submit
// within milliseconds of the page loading; this and the honeypot field
// below are the only two anti-spam checks — proportionate for a low-volume
// enquiry form, not a public-internet-facing endpoint.
const MIN_FILL_TIME_MS = 1500;
const MAX_FIELD_LENGTH = 4000;

interface Body {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  /** Honeypot — real visitors never see or fill this field. */
  website?: unknown;
  /** `Date.now()` captured when the form mounted. */
  startedAt?: unknown;
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  // Silently accept-and-drop honeypot hits and anything submitted
  // suspiciously fast — a real error response just teaches a bot what to
  // fix, whereas a fake success ends the conversation.
  const honeypot = str(body.website);
  const startedAt = Number(body.startedAt);
  const tooFast =
    Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_TIME_MS;
  if (honeypot || tooFast) {
    return Response.json({ ok: true });
  }

  const name = str(body.name).slice(0, 200);
  const email = str(body.email).slice(0, 200);
  const company = str(body.company).slice(0, 200);
  const message = str(body.message).slice(0, MAX_FIELD_LENGTH);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Tell us your name.";
  if (!email) errors.email = "Add an email so we can reply.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";
  if (!message) errors.message = "Add a line or two about the project.";
  else if (message.length < 10)
    errors.message = "A little more detail helps — a sentence or two.";

  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Check the highlighted fields.", fields: errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[/api/contact] RESEND_API_KEY is not set — see the TODO(client) in app/api/contact/route.ts.",
    );
    return Response.json(
      { error: "Enquiries aren't wired up to send yet — please email us directly instead." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || site.email;

  const details = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
  ];

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    replyTo: email,
    subject: `New enquiry — ${name}`,
    text: [
      ...details.map(([k, v]) => `${k}: ${v}`),
      "",
      message,
    ].join("\n"),
    html: `
      <table style="font-family:sans-serif;font-size:14px;color:#141416">
        ${details.map(([k, v]) => `<tr><td style="padding:2px 12px 2px 0;color:#5a5a60">${k}</td><td>${escapeHtml(v)}</td></tr>`).join("")}
      </table>
      <p style="margin-top:16px;white-space:pre-wrap;font-family:sans-serif;font-size:15px;color:#141416">${escapeHtml(message)}</p>
    `,
  });

  if (error) {
    console.error("[/api/contact] Resend error:", error);
    return Response.json(
      { error: "Something went wrong sending that — please email us directly instead." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
