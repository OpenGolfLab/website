# OpenGolfLab website refinement

Refine the UI and clean up the code of this site. Polish, don't rebuild.

## Context

- **Stack:** Astro 5 with `@astrojs/cloudflare`, hand-written CSS in `src/styles/global.css` and `src/styles/lab.css` — no Tailwind, no UI framework. Blog uses Astro content collections.
- **Deploy:** builds to a single Cloudflare Worker (`opengolflab`) serving opengolflab.com. The `*.workers.dev` URL is load-bearing — the desktop app fetches from it. Treat `wrangler.jsonc` as read-only.
- **Audience:** golf-simulator enthusiasts and data nerds — technical, DIY-minded people who respect substance over marketing gloss. The site should read like it was built by an engineer who plays golf, not by a SaaS landing-page generator.

## Hard constraints

1. No architecture or routing changes. Keep Astro, keep the adapter, keep every page path exactly as is.
2. No new dependencies, no framework migrations, no Tailwind conversion.
3. Do not touch `wrangler.jsonc`, the Worker/community API code, or anything the desktop app depends on.
4. Do not deploy. `npm run build` must pass when you're done.

## Model usage — important

Reserve yourself (the top-tier model) for judgment: the audit, prioritization, visual-design decisions, and any cross-file change. **Delegate every mechanical, well-specified task to subagents on cheaper models** — Sonnet for cleanups that need light reasoning, Haiku for pure deletions:

- dead-CSS sweeps and duplicate-rule consolidation
- stripping redundant comments and boilerplate
- single-file markup cleanups with an exact spec

Give each subagent a precise brief (files, exact change, what not to touch) and run independent ones in parallel. If a task is too fuzzy to hand to Sonnet safely, that's a sign it belongs in the plan, not in a subagent.

## Process

**Phase 1 — Audit (no edits yet).** Read the source and produce a prioritized findings list:

- *UI/UX:* 3–5 high-impact improvements for audience appeal, visual hierarchy, and cleanliness. Name the file, the element, and the specific change.
- *Code health:* redundant CSS, duplicated markup/logic across pages, dead selectors, over-commenting, unnecessary wrapper elements or abstractions, generic filler copy. State exactly what gets deleted or consolidated and why it's safe.

Then self-review the list and cut anything that ripples into routing, deployment, or the app integration. Present the surviving plan and wait for my approval before editing.

**Phase 2 — Execute.** Edit files directly — no code-in-chat, no `// ... existing code ...` snippets. Fan the mechanical items out to Sonnet/Haiku subagents per the model-usage rules; do the judgment work yourself.

**Phase 3 — Verify.**

- `npm run build` passes.
- Preview the key pages (index, download, lab, gear, a blog post) in the browser and confirm nothing regressed — check a mobile viewport too.
- Report what changed per file and roughly how much CSS/markup was removed.
