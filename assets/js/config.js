/* ==========================================================================
   FOOT CASTI — SITE CONFIG
   --------------------------------------------------------------------------
   This is the ONLY file you should need to edit for everyday changes:
   team names, kickoff times, your stream link, and the hero stats.
   Everything else (index.html, broadcast.html, style.css, main.js,
   broadcast.js) reads from this file automatically.
   ========================================================================== */

window.SITE_CONFIG = {

  // Shown in the header, browser tab, and footer.
  siteName: "Foot Casti",


  // Hero stat counters on the home page (they count up on load).
  stats: {
    liveNow: 0,
    matchesToday: 0,
    teamsLeft: 4
  },

  // The match currently being broadcast (shown on the home page hero,
  // the schedule's top row, and the broadcast page).
  liveMatch: {
    home: "non",
    away: "non",
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
      home: "North City",
      away: "South Town",
      group: "Group C",
      kickoff: "2026-07-15T20:30:00+05:30" // 8:30 PM IST
    },
    {
      home: "East Athletic",
      away: "West Wanderers",
      group: "Group A",
      kickoff: "2026-07-16T17:00:00+05:30" // 5:00 PM IST
    }
  ],

  // Your broadcast's server options. Viewers see buttons — "Server 1",
  // "Server 2", "Server 3" — and can switch between them if one is slow
  // or down. Add as many or as few as you like; the switcher on
  // broadcast.html builds itself from however many objects are in this
  // array.
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
      embedCode: "<iframe src=\"https://ritzembeds.pages.dev/play/fox-usa\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture; fullscreen\" allowfullscreen></iframe>"
    },
    {
      label: "Server 2",
      embedUrl: "",
      embedCode: "<iframe src=\"https://ritzembeds.pages.dev/embed/fox-usa#player=clappr&autoplay=1\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture; fullscreen\" allowfullscreen></iframe>"
    },
    {
      label: "Server 3",
      embedUrl: "",
      embedCode: "<iframe src=\"https://ritzembeds.pages.dev/embed/fox4k-usa#player=clappr&autoplay=1\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture; fullscreen\" allowfullscreen></iframe>"
    }
  ],

  footerLinks: [
    { label: "Twitter", url: "#" },
    { label: "YouTube", url: "#" },
    { label: "Discord", url: "#" }
  ]
};
