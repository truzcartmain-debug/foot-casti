/* ==========================================================================
   FOOT CASTI — SCHEDULE UTILS
   --------------------------------------------------------------------------
   Shared by main.js, broadcast.js, and broadcast-sport.js. Figures out
   whether a match is "upcoming", "live", or "finished" purely from its
   kickoff time (+ a duration) compared to the visitor's current clock —
   no match ever needs to be flagged live by hand.

   Each match object looks like:
     { home, away, group, venue, kickoff, durationMinutes }
   "kickoff" must be an ISO datetime WITH a timezone offset.
   "durationMinutes" is optional — falls back to the sport's
   defaultDurationMinutes (set in config.js) if omitted.
   ========================================================================== */

window.ScheduleUtils = (function () {

  function getEnd(match, defaultDuration) {
    var duration = match.durationMinutes || defaultDuration || 120;
    return new Date(new Date(match.kickoff).getTime() + duration * 60000);
  }

  // 'upcoming' | 'live' | 'finished'
  function getStatus(match, defaultDuration, now) {
    now = now || new Date();
    var kickoff = new Date(match.kickoff);
    var end = getEnd(match, defaultDuration);
    if (now < kickoff) return 'upcoming';
    if (now <= end) return 'live';
    return 'finished';
  }

  // Adds a computed `.status` (and `.endsAt`) to every match, without
  // mutating the original config objects.
  function annotate(matches, defaultDuration, now) {
    now = now || new Date();
    return (matches || []).map(function (m) {
      return Object.assign({}, m, {
        status: getStatus(m, defaultDuration, now),
        endsAt: getEnd(m, defaultDuration)
      });
    });
  }

  // Sort order: live first, then soonest upcoming, then most-recently
  // finished. Good default order for rendering a schedule list.
  function sortForDisplay(annotatedMatches) {
    var rank = { live: 0, upcoming: 1, finished: 2 };
    return annotatedMatches.slice().sort(function (a, b) {
      if (rank[a.status] !== rank[b.status]) return rank[a.status] - rank[b.status];
      var ak = new Date(a.kickoff).getTime();
      var bk = new Date(b.kickoff).getTime();
      if (a.status === 'finished') return bk - ak; // most recent finished first
      return ak - bk; // soonest first for live/upcoming
    });
  }

  // The single "best" match to headline (hero badge, broadcast page
  // fixture heading): the live one if there is one, otherwise the
  // soonest upcoming one, otherwise the most recently finished one.
  // Returns null if there are no matches at all.
  function getFeatured(matches, defaultDuration, now) {
    var annotated = annotate(matches, defaultDuration, now);
    if (!annotated.length) return null;
    var sorted = sortForDisplay(annotated);
    return sorted[0];
  }

  function isSameDay(date, now) {
    now = now || new Date();
    return date.toDateString() === now.toDateString();
  }

  return {
    getStatus: getStatus,
    getEnd: getEnd,
    annotate: annotate,
    sortForDisplay: sortForDisplay,
    getFeatured: getFeatured,
    isSameDay: isSameDay
  };
})();
