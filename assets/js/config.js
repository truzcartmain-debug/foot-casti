/* ==========================================================================
   FOOT CASTI — SITE CONFIG
   --------------------------------------------------------------------------
   This is the ONLY file you should need to edit for everyday changes:
   teams, kickoff times, and stream links.

   AUTO SCHEDULING: you no longer flag a match as "the live one" by hand.
   Every match just needs a "kickoff" time (ISO datetime WITH a timezone
   offset). The site works out on its own — from the visitor's clock —
   whether each match is upcoming, currently live, or finished, using:

     kickoff                                    kickoff + durationMinutes
       |------------ upcoming ------------|------------ live ------------|---- finished ---->

   "durationMinutes" is optional per match — if you leave it off, the
   sport's defaultDurationMinutes below is used instead. Add as many
   matches as you like to each sport's "matches" array; you never need
   to remove old ones — they just automatically show as "Finished".

   Everything else (index.html, broadcast*.html, style.css, main.js,
   broadcast.js, broadcast-sport.js, schedule-utils.js) reads from this
   file automatically.
   ========================================================================== */

window.SITE_CONFIG = {

  // Shown in the header, browser tab, and footer.
  siteName: "Foot Casti",

  // Hero stat on the home page that can't be auto-computed from a
  // schedule (there's no data source for "teams left in the
  // tournament"). "Live Now" and "Matches Today" ARE auto-computed from
  // the football matches below, so you don't need to touch those here.
  stats: {
    teamsLeft: 4
  },

  footerLinks: [
    { label: "Twitter", url: "#" },
    { label: "YouTube", url: "#" },
    { label: "Discord", url: "#" }
  ],


  // --------------------------------------------------------------------
  // SPORTS — each one gets its own page and stream servers. "football"
  // is special: it's the one featured in the home page hero + main
  // schedule section (because isHomeHero is true). Every other sport
  // shows up as a card in the "Browse by Sport" grid and links to its
  // own broadcast-<key>.html page.
  //
  // "key"  must match the data-sport="..." attribute on that sport's
  //        broadcast-<key>.html page (already set up for baseball, ufc,
  //        uefa below — duplicate one of those HTML files if you add a
  //        new sport, or edit broadcast.html for football).
  // --------------------------------------------------------------------
  sports: {

    football: {
      key: "football",
      label: "Football",
      icon: "⚽",
      page: "broadcast.html",
      isHomeHero: true,
      tagline: "World Cup 2026 — full match coverage",

      // Used whenever a match doesn't set its own durationMinutes.
      // 125 min ≈ 90 min regulation + stoppage/half-time buffer.
      defaultDurationMinutes: 125,

      matches: [
        {
          home: "ARG",
          away: "ESP",
          group: "Group A",
          venue: "Central Stadium",
          kickoff: "2026-07-21T10:30:00+05:30" // adjust to your real kickoff time
        },
        {
          home: "ESP",
          away: "ARG",
          group: "Group B",
          venue: "National Arena",
          kickoff: "2026-07-22T00:30:00+05:30"
        },
        {
          home: "BRA",
          away: "FRA",
          group: "Group C",
          venue: "Riverside Park",
          kickoff: "2026-07-23T20:30:00+05:30"
        },
        {
          home: "GER",
          away: "POR",
          group: "Group D",
          venue: "Central Stadium",
          kickoff: "2026-07-24T17:00:00+05:30"
        }
      ],

      // Stream server options. Viewers see buttons — "Server 1",
      // "Server 2", "Server 3" — and can switch between them if one is
      // slow or down. Add as many or as few as you like.
      //
      // For each server, fill in ONE of:
      //   embedUrl  — a plain link (YouTube Live, Twitch, Vimeo, etc.)
      //   embedCode — a full custom <iframe>...</iframe> snippet, if
      //               your provider gives you a whole ready-made block
      //               instead of just a URL. If embedCode is filled in,
      //               it's used INSTEAD of embedUrl for that server.
      streamServers: [
        {
          label: "Server 1",
          embedUrl: "",
          embedCode: "<iframe src=\"https://player.xyzstreams.st/embed/fox-usa2#player=clappr&autoplay=1\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture; fullscreen\" allowfullscreen></iframe>"
        },
        {
          label: "Server 2",
          embedUrl: "",
          embedCode: "<iframe src=\"https://hgfutgtbjfbtfb.pages.dev/play/telemundo-xyz-waUvqaAACr#player=clappr&autoplay=1\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture; fullscreen\" allowfullscreen></iframe>"
        },
        {
          label: "Server 3",
          embedUrl: "",
          embedCode: "<iframe src=\"https://logic.icelanders.st/embed/telemundo-usa#player=clappr&autoplay=1\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture; fullscreen\" allowfullscreen></iframe>"
        }
      ]
    },

    baseball: {
      key: "baseball",
      label: "Baseball",
      icon: "⚾",
      page: "broadcast-baseball.html",
      tagline: "MLB — live & upcoming games",
      defaultDurationMinutes: 210, // ~3.5 hr average MLB game

      // --------------------------------------------------------------
      // LIVE DATA: baseball fixtures are now pulled automatically from
      // TheSportsDB's free API (see assets/js/live-data.js) instead of
      // being hand-typed below. Real MLB games appear here on their own
      // as soon as they're scheduled — no code changes needed.
      //
      // Swap "apiKey" for your own free key from
      // https://www.thesportsdb.com/free_sports_api for a more reliable
      // rate limit (the "123" key is a shared public test key).
      // --------------------------------------------------------------
      liveSource: {
        provider: "thesportsdb",
        leagueId: "4424",   // MLB
        apiKey: "123",
        lookaheadDays: 10
      },

      // Fallback ONLY: used if the live fetch above fails (offline, API
      // down, rate-limited) so the page never shows completely empty.
      matches: [
        {
          home: "NYY",
          away: "LAD",
          group: "MLB — World Series",
          venue: "Yankee Stadium",
          kickoff: "2026-07-21T09:00:00+05:30"
        },
        {
          home: "BOS",
          away: "HOU",
          group: "MLB — Regular Season",
          venue: "Fenway Park",
          kickoff: "2026-07-22T19:00:00-04:00"
        },
        {
          home: "CHC",
          away: "STL",
          group: "MLB — Regular Season",
          venue: "Wrigley Field",
          kickoff: "2026-07-23T19:00:00-04:00"
        }
      ],

      streamServers: [
        { label: "Server 1", embedUrl: "", embedCode: "<iframe src=\"https://xyzstreams.st/247.html?streamid=espn&proid=sling\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture; fullscreen\" allowfullscreen></iframe>" },
        { label: "Server 2", embedUrl: "", embedCode: "" }
      ]
    },

    ufc: {
      key: "ufc",
      label: "UFC",
      icon: "🥊",
      page: "broadcast-ufc.html",
      tagline: "Fight night — every card, live",
      defaultDurationMinutes: 240, // full PPV card block

      matches: [
        {
          home: "Prochazka",
          away: "Pereira",
          group: "UFC 305 — Main Card",
          venue: "T-Mobile Arena, Las Vegas",
          kickoff: "2026-07-26T22:00:00-04:00"
        }
      ],

      streamServers: [
        { label: "Server 1", embedUrl: "", embedCode: "" },
        { label: "Server 2", embedUrl: "", embedCode: "" }
      ]
    },

    uefa: {
      key: "uefa",
      label: "UEFA",
      icon: "🏆",
      page: "broadcast-uefa.html",
      tagline: "Champions League — matchday coverage",
      defaultDurationMinutes: 125,

      matches: [
        {
          home: "Real Madrid",
          away: "Man City",
          group: "UEFA Champions League",
          venue: "Santiago Bernabéu",
          kickoff: "2026-07-29T20:00:00+01:00"
        },
        {
          home: "Bayern",
          away: "PSG",
          group: "UEFA Champions League",
          venue: "Allianz Arena",
          kickoff: "2026-07-30T20:00:00+01:00"
        }
      ],

      streamServers: [
        { label: "Server 1", embedUrl: "", embedCode: "" },
        { label: "Server 2", embedUrl: "", embedCode: "" }
      ]
    }

  }
};
