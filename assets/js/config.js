/* ==========================================================================
   FOOT CASTI — SITE CONFIG
   --------------------------------------------------------------------------
   This is the ONLY file you should need to edit for everyday changes:
   team names, kickoff times, stream links, and hero stats.
   Everything else (index.html, broadcast*.html, style.css, main.js,
   broadcast.js) reads from this file automatically.
   ========================================================================== */

window.SITE_CONFIG = {

  // Shown in the header, browser tab, and footer.
  siteName: "Foot Casti",


  // Hero stat counters on the home page (they count up on load).
  stats: {
    liveNow: 1,
    matchesToday: 0,
    teamsLeft: 4
  },

  // The match currently being broadcast (shown on the home page hero,
  // the schedule's top row, and the football broadcast page).
  liveMatch: {
    home: "ARG",
    away: "ESP",
    competition: "Group A",
    venue: "Central Stadium"
  },


  // Upcoming fixtures for the schedule section.
  // "kickoff" must be an ISO datetime WITH a timezone offset.
  // Visitors automatically see this converted to their own local time —
  // you only ever need to set it once, in one timezone.
  schedule: [
    {
      home: "ESP",
      away: "ARG",
      group: "Group B",
      kickoff: "2026-07-20T00:30:00+05:30" // Monday, 20 July 2026, 12:30 AM IST
    },

     {
      home: "no match",
      away: "no match",
      group: "no match",
      kickoff: "2026-07-15T20:30:00+05:30" // 8:30 PM IST
    },
    {
      home: "no match",
      away: "no match",
      group: "no match",
      kickoff: "2026-07-16T17:00:00+05:30" // 5:00 PM IST
    }
  ],


  // Your (football) broadcast's server options. Viewers see buttons —
  // "Server 1", "Server 2", "Server 3" — and can switch between them if
  // one is slow or down. Add as many or as few as you like; the switcher
  // on broadcast.html builds itself from however many objects are in
  // this array.
  //
  // For each server, fill in ONE of:
  //   embedUrl  — a plain link (YouTube Live, Twitch, Vimeo, etc.)
  //   embedCode — a full custom <iframe>...</iframe> snippet, if your
  //               provider gives you a whole ready-made block instead
  //               of just a URL. If embedCode is filled in, it's used
  //               INSTEAD of embedUrl for that server.
  //
  // YouTube Live:  embedUrl: "https://www.youtube.com/embed/VIDEO_ID?autoplay=1"
  // Twitch:        embedUrl: "https://player.twitch.tv/?channel=YOUR_CHANNEL&parent=YOUR_DOMAIN"
  // Vimeo:         embedUrl: "https://player.vimeo.com/video/VIDEO_ID"
  //
  // Leave a server's embedUrl/embedCode both empty to show the default
  // placeholder video on that button — handy while you're still setting
  // servers up one at a time.
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
  ],


  // --------------------------------------------------------------------
  // OTHER SPORTS — each one gets its OWN page (not the football
  // broadcast.html). Add / remove entries here and the "Browse by Sport"
  // grid on the home page rebuilds itself automatically.
  //
  // "key"  must match the data-sport="..." attribute on that sport's
  //        broadcast-<key>.html page (already set up for baseball, ufc,
  //        uefa below — duplicate one of those HTML files if you add a
  //        new sport).
  // "page" is the file the card links to.
  // "comingSoon" is optional — shown on that sport's page above the
  //        player, same as the football page's "Stream Starts on..."
  //        note. Leave it "" to hide it.
  // --------------------------------------------------------------------
  otherSports: {

    baseball: {
      key: "baseball",
      label: "Baseball",
      icon: "⚾",
      page: "broadcast-baseball.html",
      tagline: "MLB — live & upcoming games",
      comingSoon: "",
      liveMatch: {
        home: "NYY",
        away: "LAD",
        competition: "MLB — World Series",
        venue: "Yankee Stadium"
      },
      schedule: [
        {
          home: "BOS",
          away: "HOU",
          group: "MLB — Regular Season",
          kickoff: "2026-07-22T19:00:00-04:00"
        },
        {
          home: "no match",
          away: "no match",
          group: "no match",
          kickoff: "2026-07-23T19:00:00-04:00"
        }
      ],
      streamServers: [
        { label: "Server 1", embedUrl: "", embedCode: "" },
        { label: "Server 2", embedUrl: "", embedCode: "" }
      ]
    },

    ufc: {
      key: "ufc",
      label: "UFC",
      icon: "🥊",
      page: "broadcast-ufc.html",
      tagline: "Fight night — every card, live",
      comingSoon: "",
      liveMatch: {
        home: "Prochazka",
        away: "Pereira",
        competition: "UFC 305 — Main Card",
        venue: "T-Mobile Arena, Las Vegas"
      },
      schedule: [
        {
          home: "no match",
          away: "no match",
          group: "no match",
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
      comingSoon: "",
      liveMatch: {
        home: "Real Madrid",
        away: "Man City",
        competition: "UEFA Champions League",
        venue: "Santiago Bernabéu"
      },
      schedule: [
        {
          home: "Bayern",
          away: "PSG",
          group: "UEFA Champions League",
          kickoff: "2026-07-29T20:00:00+01:00"
        },
        {
          home: "no match",
          away: "no match",
          group: "no match",
          kickoff: "2026-07-30T20:00:00+01:00"
        }
      ],
      streamServers: [
        { label: "Server 1", embedUrl: "", embedCode: "" },
        { label: "Server 2", embedUrl: "", embedCode: "" }
      ]
    }

  },

  footerLinks: [
    { label: "Twitter", url: "#" },
    { label: "YouTube", url: "#" },
    { label: "Discord", url: "#" }
  ]
};
