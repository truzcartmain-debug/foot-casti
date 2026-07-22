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
        |------------ upcoming ------------|------------ live ------------|---- finished---->

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


   // ────────────────────────────────────────────────────────────────────
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
   // ────────────────────────────────────────────────────────────────────
   sports: {

     football: {
       key: "football",
       label: "Football",
       icon: "⚽",
       page: "broadcast.html",
       isHomeHero: true,
       tagline: "Live football matches — real-time updates",

       // Used whenever a match doesn't set its own durationMinutes.
       // 125 min ≈ 90 min regulation + stoppage/half-time buffer.
       defaultDurationMinutes: 125,

       // LIVE DATA: Real matches fetched from API-Football (see live-api.js)
       // These dates are CURRENT/FUTURE — update kickoff times to match your actual schedule
       // Dates shown are placeholder — replace with real match times
       matches: [
         {
           home: "Manchester United",
           away: "Liverpool",
           group: "Premier League",
           venue: "Old Trafford",
           kickoff: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0] + "T15:00:00+00:00"
         },
         {
           home: "Barcelona",
           away: "Real Madrid",
           group: "La Liga",
           venue: "Camp Nou",
           kickoff: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0] + "T20:00:00+00:00"
         },
         {
           home: "Paris Saint-Germain",
           away: "Marseille",
           group: "Ligue 1",
           venue: "Parc des Princes",
           kickoff: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0] + "T20:45:00+00:00"
         },
         {
           home: "Bayern Munich",
           away: "Borussia Dortmund",
           group: "Bundesliga",
           venue: "Allianz Arena",
           kickoff: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0] + "T18:30:00+00:00"
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
           embedCode: "<iframe src=\"https://logic.icelanders.st/embed/tntsports1-uk\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture\" allowfullscreen></iframe>"
         },
         {
           label: "Server 2",
           embedUrl: "",
           embedCode: "<iframe src=\"https://logic.icelanders.st/embed/beinsports-usa\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture\" allowfullscreen></iframe>"
         },
         {
           label: "Server 3",
           embedUrl: "",
           embedCode: "<iframe src=\"https://logic.icelanders.st/embed/telemundo-usa#player=clappr&autoplay=1\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture\" allowfullscreen></iframe>"
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

       // LIVE DATA: baseball fixtures from TheSportsDB
       liveSource: {
         provider: "thesportsdb",
         leagueId: "4424",   // MLB
         apiKey: "123",
         lookaheadDays: 10
       },

       // Fallback: used if live fetch fails
       matches: [
         {
           home: "NYY",
           away: "LAD",
           group: "MLB — World Series",
           venue: "Yankee Stadium",
           kickoff: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0] + "T19:00:00-04:00"
         },
         {
           home: "BOS",
           away: "HOU",
           group: "MLB — Regular Season",
           venue: "Fenway Park",
           kickoff: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0] + "T19:00:00-04:00"
         },
         {
           home: "CHC",
           away: "STL",
           group: "MLB — Regular Season",
           venue: "Wrigley Field",
           kickoff: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0] + "T20:05:00-05:00"
         }
       ],

       streamServers: [
         { label: "Server 1", embedUrl: "", embedCode: "<iframe src=\"https://xyzstreams.st/247.html?streamid=espn&proid=sling\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture\" allowfullscreen></iframe>" },
         { label: "Server 2", embedUrl: "", embedCode: "<iframe src=\"https://logic.icelanders.st/embed/fox-usa\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture\" allowfullscreen></iframe>" }
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
           kickoff: new Date(Date.now() + 6 * 86400000).toISOString().split('T')[0] + "T22:00:00-07:00"
         }
       ],

       streamServers: [
         { label: "Server 1", embedUrl: "", embedCode: "<iframe src=\"https://logic.icelanders.st/embed/dazn1-usa\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture\" allowfullscreen></iframe>" },
         { label: "Server 2", embedUrl: "", embedCode: "<iframe src=\"https://logic.icelanders.st/embed/espn-usa\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture\" allowfullscreen></iframe>" }
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
           kickoff: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0] + "T20:00:00+01:00"
         },
         {
           home: "Bayern",
           away: "PSG",
           group: "UEFA Champions League",
           venue: "Allianz Arena",
           kickoff: new Date(Date.now() + 8 * 86400000).toISOString().split('T')[0] + "T20:00:00+01:00"
         }
       ],

       streamServers: [
         { label: "Server 1", embedUrl: "", embedCode: "<iframe src=\"https://logic.icelanders.st/embed/dazn1-de\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture\" allowfullscreen></iframe>" },
         { label: "Server 2", embedUrl: "", embedCode: "<iframe src=\"https://logic.icelanders.st/embed/tntsports1-uk\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" allow=\"autoplay; encrypted-media; picture-in-picture\" allowfullscreen></iframe>" }
       ]
     }

   }
};
