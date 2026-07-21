/* ==========================================================================
   FOOT CASTI — LIVE DATA (TheSportsDB free API)
   --------------------------------------------------------------------------
   Pulls REAL fixtures (team names, dates, venues) for a sport straight from
   TheSportsDB's free JSON API, so you stop hand-typing matches into
   config.js. Shared by main.js (home page) and broadcast-sport.js (each
   sport's own broadcast page).

   HOW TO TURN THIS ON FOR A SPORT
   --------------------------------------------------------------------------
   In config.js, add a "liveSource" block to that sport, e.g. for baseball:

     liveSource: {
       provider: "thesportsdb",
       leagueId: "4424",     // MLB. Find other league IDs at thesportsdb.com
       apiKey: "123",        // shared free test key — swap in your own free
                              // key from thesportsdb.com/free_sports_api for
                              // a more reliable/dedicated rate limit
       lookaheadDays: 10      // how many days ahead to pull fixtures for
     }

   Leave "liveSource" off a sport (like UFC, which TheSportsDB covers
   thinly) and it just keeps using the manual "matches" array in config.js,
   same as before — nothing breaks.

   WHAT THIS DOES NOT DO
   --------------------------------------------------------------------------
   - It does NOT give you a real live score/minute-by-minute feed — that's
     TheSportsDB's paid "V2 livescore" feature. Live/upcoming/finished
     status is still computed from kickoff time + duration, same as always
     (see schedule-utils.js) — just fed by real fixture dates now instead
     of hand-typed ones.
   - It does NOT provide stream links. Nobody's sports-data API does that.
     You still fill in streamServers in config.js yourself.
   ========================================================================== */

window.LiveData = (function () {

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function isoDate(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  }

  // Turn one TheSportsDB "event" object into the { home, away, group,
  // venue, kickoff } shape the rest of the site already expects.
  function transformEvent(ev) {
    if (!ev || !ev.strHomeTeam || !ev.strAwayTeam) return null;

    var kickoffIso = null;
    if (ev.strTimestamp) {
      // strTimestamp is UTC without an offset suffix — add "Z" so
      // schedule-utils.js (and `new Date(...)`) reads it as UTC correctly.
      kickoffIso = ev.strTimestamp + 'Z';
    } else if (ev.dateEvent && ev.strTime) {
      var time = ev.strTime.length === 5 ? ev.strTime + ':00' : ev.strTime;
      kickoffIso = ev.dateEvent + 'T' + time + 'Z';
    }
    if (!kickoffIso || isNaN(new Date(kickoffIso).getTime())) return null;

    return {
      home: ev.strHomeTeam,
      away: ev.strAwayTeam,
      group: ev.strLeague || '',
      venue: ev.strVenue || '',
      kickoff: kickoffIso,
      _sourceId: ev.idEvent
    };
  }

  function fetchDay(leagueId, apiKey, dateStr) {
    var url = 'https://www.thesportsdb.com/api/v1/json/' + apiKey +
      '/eventsday.php?d=' + dateStr + '&l=' + leagueId;
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) { return (data && data.events) || []; })
      .catch(function (err) {
        console.warn('Foot Casti live data: failed to fetch ' + dateStr, err);
        return [];
      });
  }

  // Fetches every day from today through +lookaheadDays, merges + de-dupes
  // by event ID, and returns a flat array of transformed matches. Resolves
  // to [] (never rejects) if the API is unreachable — callers should treat
  // an empty array as "fall back to config.js matches for this sport".
  function fetchMatches(liveSource) {
    if (!liveSource || !liveSource.leagueId) return Promise.resolve([]);
    var apiKey = liveSource.apiKey || '123';
    var days = liveSource.lookaheadDays || 7;

    var requests = [];
    for (var i = 0; i < days; i++) {
      var d = new Date();
      d.setDate(d.getDate() + i);
      requests.push(fetchDay(liveSource.leagueId, apiKey, isoDate(d)));
    }

    return Promise.all(requests).then(function (dayResults) {
      var seen = {};
      var matches = [];
      dayResults.forEach(function (events) {
        events.forEach(function (ev) {
          if (!ev || seen[ev.idEvent]) return;
          var m = transformEvent(ev);
          if (m) {
            seen[ev.idEvent] = true;
            matches.push(m);
          }
        });
      });
      return matches;
    });
  }

  return { fetchMatches: fetchMatches };
})();
