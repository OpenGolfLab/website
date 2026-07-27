// ---------------------------------------------------------------------------
// Funnel counters (browser side).
//
// Cloudflare Web Analytics answers "how many people saw this page". It cannot
// answer "did they reach the contribute pitch", because it has no custom
// events — Cloudflare's own FAQ says so. That one ratio is the number this
// project is actually stuck on, so the events live here instead: a first-party
// POST to /api/e, which writes to Workers Analytics Engine.
//
// The privacy promise on /privacy is the specification for this file. A counter
// carries the event name, the path it happened on, a short detail string and an
// optional number. There is no identifier, no session, no cookie, no
// localStorage, no referrer and no fingerprint, so two events cannot be joined
// into a person. Funnels are computed as ratios of totals, which is all the
// contributor question needs.
// ---------------------------------------------------------------------------

const ENDPOINT = "/api/e";

declare global {
  interface Window {
    /** Set by components/Analytics.astro. Optional at the call site: the
     *  calculators fire through it and must not break if it hasn't booted. */
    oglTrack?: typeof track;
  }
}

/** Honour Do Not Track. Cheap to respect, and this site's whole pitch is that
 *  it doesn't take what it isn't given. */
function allowed(): boolean {
  const dnt =
    navigator.doNotTrack ??
    (window as any).doNotTrack ??
    (navigator as any).msDoNotTrack;
  return dnt !== "1" && dnt !== "yes";
}

/**
 * Record one event. Fire-and-forget by design: it never awaits, never retries,
 * never throws into the caller, and never blocks navigation — a counter that
 * can break a download button is worse than no counter.
 */
export function track(name: string, detail = "", value = 0): void {
  if (!allowed()) return;

  const payload = JSON.stringify({
    n: name,
    p: location.pathname,
    d: detail,
    v: value,
  });

  try {
    // sendBeacon survives the page unloading, which is exactly the case for
    // the event that matters most (a click that navigates away to GitHub).
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        ENDPOINT,
        new Blob([payload], { type: "application/json" }),
      );
    } else {
      void fetch(ENDPOINT, {
        method: "POST",
        body: payload,
        keepalive: true,
        headers: { "content-type": "application/json" },
      }).catch(() => {});
    }
  } catch {
    /* analytics is never worth an exception */
  }
}

/** Anchors that point straight at the installer asset, wherever they appear. */
const INSTALLER_HREF = "/releases/latest/download/";

/** Scroll depths reported, in percent of document height. */
const DEPTHS = [25, 50, 75, 100];

/**
 * Wire the whole schema up once per page load. Everything is either automatic
 * (page views, installer clicks) or driven by a `data-ogl-*` attribute on the
 * element being measured, so instrumentation sits next to the thing it counts
 * instead of in a registry that drifts away from the markup.
 */
export function boot(): void {
  if (!allowed()) return;

  // page_view: duplicated with Cloudflare Web Analytics on purpose. Having the
  // denominator in the same store as the events makes every funnel ratio a
  // single query instead of a manual reconciliation between two dashboards.
  track("page_view");

  // ---- Clicks -------------------------------------------------------------
  document.addEventListener(
    "click",
    (e) => {
      const el = (e.target as Element | null)?.closest?.(
        `a[href*="${INSTALLER_HREF}"], [data-ogl-event]`,
      ) as HTMLElement | null;
      if (!el) return;

      const named = el.dataset.oglEvent;
      if (named) {
        track(named, el.dataset.oglDetail ?? "");
      } else {
        track("download_click");
      }
    },
    { capture: true },
  );

  // ---- Sections scrolled into view ----------------------------------------
  // `data-ogl-view="event_name"` with an optional `data-ogl-detail`. Fires once
  // per page load, when the section reaches the middle half of the viewport.
  //
  // That's a rootMargin rather than a `threshold`, because a threshold is a
  // fraction of the *target*: the Gear Guide's category sections are several
  // screens tall, so "40% of it visible" is unreachable no matter how long
  // someone reads. Overlapping the centre band means the same thing for a
  // section of any height, and it doesn't count one flying past the edge of
  // the screen during a fast scroll to the footer.
  const views = document.querySelectorAll<HTMLElement>("[data-ogl-view]");
  if (views.length && "IntersectionObserver" in window) {
    const seen = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          track(el.dataset.oglView!, el.dataset.oglDetail ?? "");
          seen.unobserve(el);
        }
      },
      { rootMargin: "-25% 0px -25% 0px", threshold: 0 },
    );
    views.forEach((el) => seen.observe(el));
  }

  // ---- Scroll depth -------------------------------------------------------
  // Opt-in per page via `data-ogl-scroll` on any element, because it's only
  // worth the beacons where the question is "is the ask below the fold".
  if (document.querySelector("[data-ogl-scroll]")) {
    let hit = 0;
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100;

      for (const d of DEPTHS) {
        if (pct >= d && hit < d) {
          hit = d;
          track("scroll_depth", "", d);
        }
      }
      if (hit >= 100) window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // a short page is 100% read on arrival
  }
}
