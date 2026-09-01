//#region node_modules/.nitro/vite/services/ssr/assets/site-config-w4GE-b40.js
var day = (offset, time) => new Date(Date.now() + offset * 864e5).toISOString().split("T")[0] + "T" + time;
var iframe = (src) => `<iframe src="${src}" width="100%" height="100%" frameborder="0" scrolling="no" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
var SITE_NAME = "Foot Casti";
var SPORTS = {
	football: {
		key: "football",
		label: "Football",
		tagline: "Live football matches — real-time updates",
		defaultDurationMinutes: 125,
		matches: [
			{
				home: "Manchester United",
				away: "Liverpool",
				group: "Premier League",
				venue: "Old Trafford",
				kickoff: day(2, "15:00:00+00:00")
			},
			{
				home: "Barcelona",
				away: "Real Madrid",
				group: "La Liga",
				venue: "Camp Nou",
				kickoff: day(3, "20:00:00+00:00")
			},
			{
				home: "Paris Saint-Germain",
				away: "Marseille",
				group: "Ligue 1",
				venue: "Parc des Princes",
				kickoff: day(4, "20:45:00+00:00")
			},
			{
				home: "Bayern Munich",
				away: "Borussia Dortmund",
				group: "Bundesliga",
				venue: "Allianz Arena",
				kickoff: day(5, "18:30:00+00:00")
			}
		],
		streamServers: [
			{
				label: "Server 1",
				embedCode: iframe("https://logic.icelanders.st/embed/tntsports1-uk")
			},
			{
				label: "Server 2",
				embedCode: iframe("https://logic.icelanders.st/embed/beinsports-usa")
			},
			{
				label: "Server 3",
				embedCode: iframe("https://logic.icelanders.st/embed/telemundo-usa#player=clappr&autoplay=1")
			}
		]
	},
	uefa: {
		key: "uefa",
		label: "UEFA",
		tagline: "Champions League — matchday coverage",
		defaultDurationMinutes: 125,
		matches: [{
			home: "Real Madrid",
			away: "Man City",
			group: "UEFA Champions League",
			venue: "Santiago Bernabéu",
			kickoff: day(7, "20:00:00+01:00")
		}, {
			home: "Bayern",
			away: "PSG",
			group: "UEFA Champions League",
			venue: "Allianz Arena",
			kickoff: day(8, "20:00:00+01:00")
		}],
		streamServers: [{
			label: "Server 1",
			embedCode: iframe("https://logic.icelanders.st/embed/dazn1-de")
		}, {
			label: "Server 2",
			embedCode: iframe("https://logic.icelanders.st/embed/tntsports1-uk")
		}]
	},
	baseball: {
		key: "baseball",
		label: "Baseball",
		tagline: "MLB — live & upcoming games",
		defaultDurationMinutes: 210,
		matches: [
			{
				home: "NYY",
				away: "LAD",
				group: "MLB — World Series",
				venue: "Yankee Stadium",
				kickoff: day(2, "19:00:00-04:00")
			},
			{
				home: "BOS",
				away: "HOU",
				group: "MLB — Regular Season",
				venue: "Fenway Park",
				kickoff: day(3, "19:00:00-04:00")
			},
			{
				home: "CHC",
				away: "STL",
				group: "MLB — Regular Season",
				venue: "Wrigley Field",
				kickoff: day(4, "20:05:00-05:00")
			}
		],
		streamServers: [{
			label: "Server 1",
			embedCode: iframe("https://xyzstreams.st/247.html?streamid=espn&proid=sling")
		}, {
			label: "Server 2",
			embedCode: iframe("https://logic.icelanders.st/embed/fox-usa")
		}]
	},
	ufc: {
		key: "ufc",
		label: "UFC",
		tagline: "Fight night — every card, live",
		defaultDurationMinutes: 240,
		matches: [{
			home: "Prochazka",
			away: "Pereira",
			group: "UFC 305 — Main Card",
			venue: "T-Mobile Arena, Las Vegas",
			kickoff: day(6, "22:00:00-07:00")
		}],
		streamServers: [{
			label: "Server 1",
			embedCode: iframe("https://logic.icelanders.st/embed/dazn1-usa")
		}, {
			label: "Server 2",
			embedCode: iframe("https://logic.icelanders.st/embed/espn-usa")
		}]
	}
};
var SPORT_LIST = Object.values(SPORTS);
var FOOTER_LINKS = [
	{
		label: "Twitter",
		url: "#"
	},
	{
		label: "YouTube",
		url: "#"
	},
	{
		label: "Discord",
		url: "#"
	}
];
//#endregion
export { SPORT_LIST as i, SITE_NAME as n, SPORTS as r, FOOTER_LINKS as t };
