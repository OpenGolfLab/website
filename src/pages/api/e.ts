// ---------------------------------------------------------------------------
// Funnel counter sink.
//
// The only on-demand route on an otherwise fully prerendered site. It exists
// because Cloudflare Web Analytics has no custom events, and the question the
// project is stuck on — "do people who land here ever reach the contribute
// pitch?" — is a custom-event question. See src/lib/analytics.ts for the
// client half and the privacy constraints this schema is built to.
//
// Storage is Workers Analytics Engine: no database to run, datasets are
// created on first write, and it's queryable over Cloudflare's SQL API. If the
// ANALYTICS binding is missing — local `astro dev`, or an account where the
// dataset hasn't been provisioned — the endpoint quietly does nothing rather
// than erroring, so the site never depends on it being there.
//
// Querying it (account-scoped API token with Account Analytics: Read):
//
//   curl -s https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/analytics_engine/sql \
//     -H "Authorization: Bearer $TOKEN" \
//     -d "SELECT blob1 AS event, blob2 AS path, count() AS n
//         FROM opengolflab_events
//         WHERE timestamp > now() - INTERVAL '7' DAY
//         GROUP BY event, path ORDER BY n DESC"
//
// The ratio worth a dashboard is download_click / page_view on the pages that
// carry a download button, and contributing_section_view / page_view on the
// guide.
// ---------------------------------------------------------------------------
import type { APIRoute } from "astro";

export const prerender = false;

/** Analytics Engine caps blobs at 16KB and the index at 96 bytes; these are far
 *  tighter, because anything longer than this is a bug or an abuse attempt. */
const LIMITS = { name: 48, path: 128, detail: 64 } as const;

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.slice(0, max) : "";
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = str(body.n, LIMITS.name);

    // An unnamed event is unqueryable, so there's nothing to record.
    if (name) {
      const dataset = (locals as any)?.runtime?.env?.ANALYTICS;
      dataset?.writeDataPoint({
        // One index, used for grouping and sampling: the event name is the
        // dimension every query starts from.
        indexes: [name],
        blobs: [name, str(body.p, LIMITS.path), str(body.d, LIMITS.detail)],
        doubles: [Number(body.v) || 0],
      });
    }
  } catch {
    /* Malformed body, missing binding, write failure — all the same to the
       caller. A counter must never turn into a visible error. */
  }

  // 204 unconditionally: sendBeacon ignores the response, and a non-2xx would
  // only produce noise in visitors' consoles.
  return new Response(null, { status: 204 });
};
