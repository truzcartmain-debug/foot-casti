# Foot Casti — V2

Live sports streaming site (football, UEFA, baseball, UFC) built on TanStack
Start + React + Tailwind v4.

## What changed in V2

- New centralized colour theme (deep midnight-pitch + refined emerald) — all
  tokens live in `src/styles.css`.
- Stream Schedule removed everywhere (page, nav item, homepage section, links).
- Schedule section removed from the home page.
- Redesigned button system in `src/components/ui/button.tsx` (one source of
  truth for primary / secondary / outline / ghost, hover, active, disabled).
- Ads disabled by default behind a single flag — `ADS_ENABLED` in
  `src/config/ads.ts`. Flip it to `true` to bring every slot back.

## Everyday edits

- `src/config/site.ts` — site name, footer links, sports, fixtures, stream servers.
- `src/config/ads.ts` — `ADS_ENABLED` flag and per-slot ad network scripts.
- `src/styles.css` — colours, radius, fonts.

## Routes

- `/` — home (hero + browse by sport)
- `/watch/$sport` — player page for `football`, `uefa`, `baseball`, `ufc`

## Run

```bash
bun install   # or npm install
bun run dev   # http://localhost:8080
bun run build
```
