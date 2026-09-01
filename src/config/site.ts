/* ==========================================================================
   FOOT CASTI — SITE CONFIG (V2)
   --------------------------------------------------------------------------
   The only file you need to edit for everyday changes: site name, sports,
   fixtures and stream servers.

   Every match just needs a "kickoff" (ISO datetime WITH a timezone offset).
   The site works out on its own — from the visitor's clock — whether it is
   upcoming, live, or finished:

     kickoff                              kickoff + durationMinutes
       |---------- upcoming ----------|---------- live ----------|-- finished -->

   "durationMinutes" is optional per match and falls back to the sport's
   defaultDurationMinutes.
   ========================================================================== */

export interface Match {
  home: string;
  away: string;
  group: string;
  venue: string;
  /** ISO datetime WITH a timezone offset. */
  kickoff: string;
  durationMinutes?: number;
}

export interface StreamServer {
  label: string;
  /** A plain embed link (YouTube Live, Twitch, Vimeo, …). */
  embedUrl?: string;
  /** A full custom <iframe>…</iframe> snippet. Wins over embedUrl. */
  embedCode?: string;
}

export interface Sport {
  key: string;
  label: string;
  icon: string;
  tagline: string;
  defaultDurationMinutes: number;
  matches: Match[];
  streamServers: StreamServer[];
}

const dayFromNow = (days: number, time: string) =>
  new Date(Date.now() + days * 86400000).toISOString().split("T")[0] + time;

export const siteConfig = {
  siteName: "Foot Casti",
  tagline: "Real-time Sports Updates",
  footerLinks: [
    { label: "Twitter", url: "#" },
    { label: "YouTube", url: "#" },
    { label: "Discord", url: "#" },
  ],
};

export const sports: Record<string, Sport> = {
  football: {
    key: "football",
    label: "Football",
    icon: "⚽",
    tagline: "Live football matches — real-time updates",
    defaultDurationMinutes: 125,
    matches: [
      {
        home: "Manchester United",
        away: "Liverpool",
        group: "Premier League",
        venue: "Old Trafford",
        kickoff: dayFromNow(2, "T15:00:00+00:00"),
      },
      {
        home: "Barcelona",
        away: "Real Madrid",
        group: "La Liga",
        venue: "Camp Nou",
        kickoff: dayFromNow(3, "T20:00:00+00:00"),
      },
      {
        home: "Paris Saint-Germain",
        away: "Marseille",
        group: "Ligue 1",
        venue: "Parc des Princes",
        kickoff: dayFromNow(4, "T20:45:00+00:00"),
      },
      {
        home: "Bayern Munich",
        away: "Borussia Dortmund",
        group: "Bundesliga",
        venue: "Allianz Arena",
        kickoff: dayFromNow(5, "T18:30:00+00:00"),
      },
    ],
    streamServers: [
      {
        label: "Server 1",
        embedCode:
          '<iframe src="https://logic.icelanders.st/embed/tntsports1-uk" width="100%" height="100%" frameborder="0" scrolling="no" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>',
      },
      {
        label: "Server 2",
        embedCode:
          '<iframe src="https://logic.icelanders.st/embed/beinsports-usa" width="100%" height="100%" frameborder="0" scrolling="no" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>',
      },
      {
        label: "Server 3",
        embedCode:
          '<iframe src="https://logic.icelanders.st/embed/telemundo-usa#player=clappr&autoplay=1" width="100%" height="100%" frameborder="0" scrolling="no" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>',
      },
    ],
  },

  uefa: {
    key: "uefa",
    label: "UEFA",
    icon: "🏆",
    tagline: "Champions League — matchday coverage",
    defaultDurationMinutes: 125,
    matches: [
      {
        home: "Real Madrid",
        away: "Man City",
        group: "UEFA Champions League",
        venue: "Santiago Bernabéu",
        kickoff: dayFromNow(7, "T20:00:00+01:00"),
      },
      {
        home: "Bayern",
        away: "PSG",
        group: "UEFA Champions League",
        venue: "Allianz Arena",
        kickoff: dayFromNow(8, "T20:00:00+01:00"),
      },
    ],
    streamServers: [
      {
        label: "Server 1",
        embedCode:
          '<iframe src="https://logic.icelanders.st/embed/dazn1-de" width="100%" height="100%" frameborder="0" scrolling="no" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>',
      },
      {
        label: "Server 2",
        embedCode:
          '<iframe src="https://logic.icelanders.st/embed/tntsports1-uk" width="100%" height="100%" frameborder="0" scrolling="no" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>',
      },
    ],
  },

  baseball: {
    key: "baseball",
    label: "Baseball",
    icon: "⚾",
    tagline: "MLB — live & upcoming games",
    defaultDurationMinutes: 210,
    matches: [
      {
        home: "NYY",
        away: "LAD",
        group: "MLB — World Series",
        venue: "Yankee Stadium",
        kickoff: dayFromNow(2, "T19:00:00-04:00"),
      },
      {
        home: "BOS",
        away: "HOU",
        group: "MLB — Regular Season",
        venue: "Fenway Park",
        kickoff: dayFromNow(3, "T19:00:00-04:00"),
      },
      {
        home: "CHC",
        away: "STL",
        group: "MLB — Regular Season",
        venue: "Wrigley Field",
        kickoff: dayFromNow(4, "T20:05:00-05:00"),
      },
    ],
    streamServers: [
      {
        label: "Server 1",
        embedCode:
          '<iframe src="https://xyzstreams.st/247.html?streamid=espn&proid=sling" width="100%" height="100%" frameborder="0" scrolling="no" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>',
      },
      {
        label: "Server 2",
        embedCode:
          '<iframe src="https://logic.icelanders.st/embed/fox-usa" width="100%" height="100%" frameborder="0" scrolling="no" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>',
      },
    ],
  },

  ufc: {
    key: "ufc",
    label: "UFC",
    icon: "🥊",
    tagline: "Fight night — every card, live",
    defaultDurationMinutes: 240,
    matches: [
      {
        home: "Prochazka",
        away: "Pereira",
        group: "UFC 305 — Main Card",
        venue: "T-Mobile Arena, Las Vegas",
        kickoff: dayFromNow(6, "T22:00:00-07:00"),
      },
    ],
    streamServers: [
      {
        label: "Server 1",
        embedCode:
          '<iframe src="https://logic.icelanders.st/embed/dazn1-usa" width="100%" height="100%" frameborder="0" scrolling="no" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>',
      },
      {
        label: "Server 2",
        embedCode:
          '<iframe src="https://logic.icelanders.st/embed/espn-usa" width="100%" height="100%" frameborder="0" scrolling="no" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>',
      },
    ],
  },
};

export const sportList = Object.values(sports);
