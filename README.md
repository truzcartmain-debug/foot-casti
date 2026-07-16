# Foot Casti

A dark, green-accented live football broadcast site: home page with a
schedule, and a broadcast page with a multi-server video player.

## Project structure

```
foot-casti/
├── index.html              Home page (hero, stats, schedule)
├── broadcast.html           Watch Live page (server switcher + player)
├── README.md                 This file
└── assets/
    ├── css/
    │   └── style.css        All styling — colors, layout, animations
    └── js/
        ├── config.js         ← EDIT THIS for content changes
        ├── main.js            Home page logic (don't need to touch)
        └── broadcast.js       Broadcast page logic (don't need to touch)
```

## Customizing the site

**For everyday changes — team names, kickoff times, your streams,
stats — edit only `assets/js/config.js`.** Everything else reads from it
automatically. Open that file and you'll find:

- `siteName` — shown in the header, browser tab, and footer
- `stats` — the three counters in the hero (Live Now / Match Today / Teams Left)
- `liveMatch` — the match currently being broadcast
- `schedule` — an array of upcoming fixtures; add or remove entries freely
- `streamServers` — **your broadcast's server options** (see below)
- `viewersStart` — starting number for the cosmetic "watching now" counter
- `footerLinks` — your social links

### Changing colors / fonts

Open `assets/css/style.css` and edit the variables at the very top:

```css
:root{
  --bg: #0a0f0c;        /* page background */
  --surface: #10201a;   /* card backgrounds */
  --green: #22e07a;     /* accent color */
  --green-dim: #17b562; /* darker accent, used in gradients */
  --text: #eaf4ee;      /* main text color */
  --muted: #7f9a8c;     /* secondary text color */
}
```

Almost every color on the site derives from these five values.

### Adding a match to the schedule

In `config.js`, add an object to the `schedule` array:

```js
{ home: "Team A", away: "Team B", group: "Group D", kickoff: "2026-07-18T15:00:00+05:30" }
```

`kickoff` must include a timezone offset (the example above is IST,
`+05:30`). Every visitor automatically sees this converted into their own
local time — you only ever need to set it once, in one timezone.

## Broadcasting: the server switcher

`broadcast.html` now shows a row of buttons above the player — one per
entry in `streamServers` in `config.js`. Viewers can click between them
if one source is slow, geo-blocked, or goes down. The default config
ships with 3 servers, but you can add or remove entries freely; the
buttons build themselves from however many are in the array.

For each server, fill in **one** of:

- `embedUrl` — a plain link (YouTube Live, Twitch, Vimeo, etc.)
- `embedCode` — a full custom `<iframe>...</iframe>` snippet, if your
  provider hands you a whole ready-made block instead of just a URL.
  If `embedCode` is filled in, it's used instead of `embedUrl` for that
  server.

```js
streamServers: [
  { label: "Server 1", embedUrl: "https://www.youtube.com/embed/VIDEO_ID?autoplay=1", embedCode: "" },
  { label: "Server 2", embedUrl: "https://player.twitch.tv/?channel=YOUR_CHANNEL&parent=YOUR_DOMAIN", embedCode: "" },
  { label: "Server 3", embedUrl: "", embedCode: "" }
]
```

Leaving a server's `embedUrl`/`embedCode` both empty shows the default
placeholder video on that button — handy while you're setting servers up
one at a time.

**Common URL formats:**
- YouTube Live: `https://www.youtube.com/embed/VIDEO_ID?autoplay=1` (video ID is the part after `?v=` on the normal watch page)
- Twitch: `https://player.twitch.tv/?channel=YOUR_CHANNEL&parent=YOUR_DOMAIN` (the `parent` must exactly match the domain your site is served from)
- Vimeo: `https://player.vimeo.com/video/VIDEO_ID`

**Own HLS (.m3u8) stream from a licensed CDN/provider:** a plain
`<iframe>` can't play `.m3u8` directly — most browsers don't support HLS
natively. If this is your situation, ask and the `<iframe>` for that
server can be swapped for a `<video>` element wired up with hls.js
instead.

## Live viewer count

The "Watching now" number uses the free **whos.amung.us** widget —
already embedded directly in `broadcast.html` inside the "Watching now"
row. No config, no backend, no account setup needed beyond what's
already there; it tracks real visitors on its own.

If you want to swap it for your own whos.amung.us account (so the stats
dashboard is yours), sign up at https://whos.amung.us, get your own
embed snippet, and replace the two `<script>` tags inside the
`.viewers` `<span>` in `broadcast.html` with your version.



1. Create a new repository on GitHub and push this folder's contents to it
   (the `index.html` file must be at the repo root, not inside a subfolder).
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, choose the branch (usually `main`) and folder `/root`.
4. Save — GitHub gives you a URL like `https://yourusername.github.io/repo-name/`
   within a minute or two.

### Using a custom domain

In the same **Settings → Pages** screen, add your domain under **Custom
domain**, then create a `CNAME` record at your domain registrar pointing
to `yourusername.github.io`. GitHub's docs walk through this in more
detail if needed.

## Ads

Two ad slots are already placed and marked in the HTML — one below the
hero and one below the schedule (both in `index.html`), plus one below
the player in `broadcast.html`. Each looks like:

```html
<section class="ad-slot">
  <span class="ad-label">Advertisement</span>
</section>
```

Replace the inner `<span>` with your ad network's code (Google AdSense,
an affiliate banner, a sponsor image link, etc.) — the box already
reserves the right amount of space and stays responsive on mobile.
