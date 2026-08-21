import { site } from "@/lib/content";

/**
 * Delivers the /contact form to the studio's inbox via Web3 Forms.
 *
 * TODO(client): set WEB3FORMS_ACCESS_KEY in the deployment environment (see
 * .env.example) before this can actually send anything — without it every
 * submission fails server-side with a 500, logged but never delivered.
 * Get your Access Key from https://web3forms.com (Dashboard → Copy Access Key).
 * Also set CONTACT_TO_EMAIL if enquiries should land somewhere other than `site.email`.
 *
 * Not built as a Server Action deliberately: this needs to be callable with
 * a plain `fetch`, a `Retry-After`-bearing 429, and a JSON error body the
 * client component can branch on — a normal Route Handler is the more
 * direct fit than a form action here.
 */

export const runtime = "nodejs";

// Minimum time a real visitor takes to fill the form. Caught bots submit
// within milliseconds of the page loading; this and the honeypot field
// below are the only two anti-spam checks — proportionate for a low-volume
// enquiry form, not a public-internet-facing endpoint.
const MIN_FILL_TIME_MS = 1500;
const MAX_FIELD_LENGTH = 4000;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

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

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error(
      "[/api/contact] WEB3FORMS_ACCESS_KEY is not set — see the TODO(client) in app/api/contact/route.ts.",
    );
    return Response.json(
      { error: "Enquiries aren't wired up to send yet — please email us directly instead." },
      { status: 500 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || site.email;

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: name,
        email: email,
        company: company || "",
        message: message,
        subject: `New enquiry — ${name}`,
        to_email: to,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      console.error("[/api/contact] Web3 Forms error:", result);
      return Response.json(
        { error: "Something went wrong sending that — please email us directly instead." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[/api/contact] Web3 Forms request error:", error);
    return Response.json(
      { error: "Something went wrong sending that — please email us directly instead." },
      { status: 502 },
    );
  }
}

