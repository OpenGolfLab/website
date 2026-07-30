// ---------------------------------------------------------------------------
// Feedback inbox.
//
// Receives bug reports and improvement ideas from two senders: the /feedback
// form on the site, and the desktop app's Send Feedback dialog. Rows land in
// the opengolflab-feedback D1 database; there is no admin UI, the inbox is
//
//   npx wrangler d1 execute opengolflab-feedback --remote \
//     --command "SELECT ts, source, kind, message, contact FROM feedback ORDER BY ts DESC LIMIT 50"
//
// Unlike the analytics counter (api/e.ts), a feedback submission is something
// the sender typed and cares about, so failures are real errors: the caller
// finds out and can retry, rather than the message silently vanishing.
// ---------------------------------------------------------------------------
import type { APIRoute } from "astro";

export const prerender = false;

const LIMITS = {
  message: 4000,
  contact: 200,
  app_version: 32,
  page: 128,
  ua: 256,
} as const;

const KINDS = new Set(["bug", "idea"]);
const SOURCES = new Set(["website", "app"]);

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export const POST: APIRoute = async ({ request, locals }) => {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return new Response("Body must be JSON.", { status: 400 });
  }

  // Honeypot: the form ships a visually hidden "website" field that humans
  // never see. Bots that fill it get a success response and no row.
  if (str(body.website, 10)) return new Response(null, { status: 204 });

  const message = str(body.message, LIMITS.message);
  if (message.length < 3) {
    return new Response("Say a little more — the message is the feedback.", {
      status: 400,
    });
  }

  const kind = KINDS.has(body.kind as string) ? (body.kind as string) : "idea";
  const source = SOURCES.has(body.source as string)
    ? (body.source as string)
    : "website";

  const db = (locals as any)?.runtime?.env?.FEEDBACK_DB;
  if (!db) {
    // Plain `astro dev` has no D1 binding; wrangler dev and production do.
    return new Response("Feedback storage unavailable.", { status: 503 });
  }

  try {
    await db
      .prepare(
        "INSERT INTO feedback (id, ts, kind, message, contact, source, app_version, page, ua) " +
          "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)",
      )
      .bind(
        crypto.randomUUID(),
        new Date().toISOString(),
        kind,
        message,
        str(body.contact, LIMITS.contact) || null,
        source,
        str(body.app_version, LIMITS.app_version) || null,
        str(body.page, LIMITS.page) || null,
        str(request.headers.get("user-agent"), LIMITS.ua) || null,
      )
      .run();
  } catch {
    return new Response("Couldn't save the feedback. Please try again.", {
      status: 500,
    });
  }

  return new Response(null, { status: 204 });
};
