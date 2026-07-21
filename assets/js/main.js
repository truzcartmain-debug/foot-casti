/* ==========================================================================
   FOOT CASTI — HOME PAGE LOGIC
   --------------------------------------------------------------------------
   Reads everything from SITE_CONFIG (assets/js/config.js) and renders the
   header/footer brand name, hero live badge, the cross-sport "Live Events"
   grid, the searchable schedule list, and the "Browse by Sport" cards.

   Nothing here is hand-flagged as live — every sport's matches are pulled
   from config.js, tagged with their own sport, merged into one list, and
   their live/upcoming/finished status is computed purely from the kickoff
   time vs. the visitor's clock (see schedule-utils.js). Add a match to any
   sport in config.js and it automatically appears in Live Events (once it
   kicks off), in the schedule, and in search — no other file needs touching.
   ========================================================================== */

(function () {
  var cfg = window.SITE_CONFIG;
  var Sched = window.ScheduleUtils;

  // ---- Merge every sport's matches into one list, each tagged with its
  //      own sport info, so the home page can show one unified, searchable
  //      feed instead of a single sport's fixtures ----
  function buildAllMatches() {
    var all = [];
    Object.keys(cfg.sports).forEach(function (key) {
      var sport = cfg.sports[key];
      var annotated = Sched.annotate(sport.matches, sport.defaultDurationMinutes);
      annotated.forEach(function (m) {
        all.push(Object.assign({}, m, {
          sportKey: key,
          sportLabel: sport.label,
          sportIcon: sport.icon,
          sportPage: sport.page
        }));
      });
    });
    return all;
  }

  var allMatches = buildAllMatches();

  // ---- Brand name + title ----
  document.title = cfg.siteName;
  document.querySelectorAll('.js-site-name').forEach(function (el) {
    el.textContent = cfg.siteName;
  });

  // ---- Team badge helper: first 2 letters of the team name, uppercased ----
  function initials(name) {
    var words = name.trim().split(/\s+/);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  function formatWhen(date) {
    var time = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    var dayLabel;
    if (date.toDateString() === today.toDateString()) dayLabel = 'Today';
    else if (date.toDateString() === tomorrow.toDateString()) dayLabel = 'Tomorrow';
    else dayLabel = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    return dayLabel + ' · ' + time;
  }

  function statusPill(match) {
    if (match.status === 'live') {
      return '<span class="status-live"><span class="dot"></span> Live</span>';
    }
    if (match.status === 'finished') {
      return '<span class="status-finished">Finished</span>';
    }
    return '<span class="status-time">--:--</span><span class="status-date"></span>';
  }

  // ---- Hero live badge: reflects whichever match, across ALL sports, is
  //      the current headline (live if any is live, else soonest upcoming,
  //      else most recently finished) ----
  var heroBadge = document.getElementById('hero-live-badge');
  var heroWatchBtn = document.getElementById('hero-watch-btn');

  function renderHero(sortedAll) {
    var featured = sortedAll[0] || null;
    if (heroBadge) {
      if (!featured) {
        heroBadge.innerHTML = '<span class="dot"></span> No matches scheduled';
      } else if (featured.status === 'live') {
        heroBadge.innerHTML = '<span class="dot"></span> Live Now · ' + featured.sportIcon + ' ' + featured.home + ' vs ' + featured.away;
      } else if (featured.status === 'upcoming') {
        heroBadge.innerHTML = '<span class="dot"></span> Next: ' + featured.sportIcon + ' ' + featured.home + ' vs ' + featured.away + ' — ' + formatWhen(new Date(featured.kickoff));
      } else {
        heroBadge.innerHTML = '<span class="dot"></span> Last match: ' + featured.home + ' vs ' + featured.away + ' (Finished)';
      }
    }
    if (heroWatchBtn && featured) {
      heroWatchBtn.href = featured.sportPage;
    }
  }

  // ---- Live Events grid: every match, across every sport, currently live
  //      right now — styled as cards, refreshed automatically ----
  var liveGrid = document.getElementById('live-events-grid');
  var liveEmpty = document.getElementById('live-events-empty');
  var liveCount = document.getElementById('live-events-count');

  function renderLiveEvents(liveMatches) {
    if (!liveGrid) return;
    liveGrid.innerHTML = '';
    if (liveCount) {
      liveCount.textContent = liveMatches.length
        ? liveMatches.length + ' live now'
        : '';
    }
    if (!liveMatches.length) {
      if (liveEmpty) liveEmpty.hidden = false;
      return;
    }
    if (liveEmpty) liveEmpty.hidden = true;

    liveMatches.forEach(function (match, i) {
      var card = document.createElement('a');
      card.className = 'live-event-card in-view';
      card.style.animationDelay = (i * 0.06) + 's';
      card.href = match.sportPage;

      card.innerHTML =
        '<div class="live-event-top">' +
          '<span class="live-event-tag"><span class="dot"></span> Live</span>' +
          '<span class="live-event-sport">' + match.sportIcon + ' ' + match.sportLabel + '</span>' +
        '</div>' +
        '<div class="live-event-badges">' +
          '<span class="team-badge lg">' + initials(match.home) + '</span>' +
          '<span class="live-event-vs">vs</span>' +
          '<span class="team-badge lg">' + initials(match.away) + '</span>' +
        '</div>' +
        '<div class="live-event-names">' + match.home + ' <span class="vs">vs</span> ' + match.away + '</div>' +
        '<div class="live-event-meta">' + (match.group || '') + '</div>' +
        '<div class="live-event-cta">Watch Live <span>&rarr;</span></div>';

      liveGrid.appendChild(card);
    });
  }

  // ---- Full schedule: every match from every sport, live first, then
  //      soonest upcoming, then most recently finished — filterable by
  //      the search bar below ----
  var scheduleList = document.getElementById('schedule-list');
  var scheduleEmpty = document.getElementById('schedule-empty');
  var scheduleCount = document.getElementById('schedule-count');

  function renderSchedule(sortedMatches) {
    if (!scheduleList) return;
    scheduleList.innerHTML = '';
    if (scheduleCount) {
      scheduleCount.textContent = sortedMatches.length
        ? sortedMatches.length + ' match' + (sortedMatches.length === 1 ? '' : 'es')
        : '';
    }
    if (!sortedMatches.length) {
      if (scheduleEmpty) scheduleEmpty.hidden = false;
      return;
    }
    if (scheduleEmpty) scheduleEmpty.hidden = true;

    sortedMatches.forEach(function (match) {
      var row = document.createElement('a');
      row.href = match.sportPage;
      row.className = 'match-row' + (match.status === 'live' ? ' is-live' : '') + (match.status === 'finished' ? ' is-finished' : '') + ' in-view';
      row.setAttribute('data-kickoff', match.kickoff);
      row.setAttribute('data-status', match.status);

      var actionHtml;
      if (match.status === 'live') {
        actionHtml = '<span class="btn btn-primary btn-sm">Watch Live</span>';
      } else if (match.status === 'upcoming') {
        actionHtml = '<span class="btn btn-sm btn-disabled">Not Started</span>';
      } else {
        actionHtml = '<span class="btn btn-sm btn-disabled">Finished</span>';
      }

      row.innerHTML =
        '<div class="match-status">' + statusPill(match) + '</div>' +
        '<div class="match-teams">' +
          '<div class="badges">' +
            '<span class="team-badge">' + initials(match.home) + '</span>' +
            '<span class="team-badge">' + initials(match.away) + '</span>' +
          '</div>' +
          '<div class="match-names">' +
            '<span class="sport-tag">' + match.sportIcon + ' ' + match.sportLabel + '</span><br>' +
            match.home + ' <span class="vs">vs</span> ' + match.away +
            '<span class="match-group">' + (match.group || '') + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="match-action">' + actionHtml + '</div>';
      scheduleList.appendChild(row);

      // Convert kickoff into the visitor's own local timezone
      if (match.status === 'upcoming') {
        var kickoff = new Date(match.kickoff);
        var timeEl = row.querySelector('.status-time');
        var dateEl = row.querySelector('.status-date');
        if (timeEl) timeEl.textContent = kickoff.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
        if (dateEl) {
          var today = new Date();
          var tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          var label;
          if (kickoff.toDateString() === today.toDateString()) label = 'Today';
          else if (kickoff.toDateString() === tomorrow.toDateString()) label = 'Tomorrow';
          else label = kickoff.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
          dateEl.textContent = label + ' · your local time';
        }
      }
    });
  }

  // ---- Search: filters both Live Events and the schedule together by
  //      team name, sport, or group/competition text ----
  var searchInput = document.getElementById('live-search-input');
  var searchClear = document.getElementById('live-search-clear');

  function matchesQuery(m, q) {
    var haystack = [m.home, m.away, m.sportLabel, m.group || ''].join(' ').toLowerCase();
    return haystack.indexOf(q) !== -1;
  }

  function renderAll() {
    var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var filtered = query ? allMatches.filter(function (m) { return matchesQuery(m, query); }) : allMatches;
    var sortedFiltered = Sched.sortForDisplay(filtered);
    var sortedAll = Sched.sortForDisplay(allMatches);

    renderHero(sortedAll); // hero always reflects the real global state, not the search filter
    renderLiveEvents(sortedFiltered.filter(function (m) { return m.status === 'live'; }));
    renderSchedule(sortedFiltered);

    if (searchClear) searchClear.hidden = !query;
  }

  if (searchInput) {
    searchInput.addEventListener('input', renderAll);
  }
  if (searchClear) {
    searchClear.addEventListener('click', function () {
      searchInput.value = '';
      searchInput.focus();
      renderAll();
    });
  }

  renderAll();

  // ---- Footer links ----
  var footerLinks = document.getElementById('footer-links');
  if (footerLinks && cfg.footerLinks) {
    cfg.footerLinks.forEach(function (link) {
      var a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.label;
      footerLinks.appendChild(a);
    });
  }

  // ---- "Browse by Sport" cards — each links to its OWN page, and shows
  //      its OWN auto-computed live/next status ----
  var sportsGrid = document.getElementById('sports-grid');
  if (sportsGrid) {
    Object.keys(cfg.sports).forEach(function (key) {
      var sport = cfg.sports[key];
      var sportFeatured = Sched.getFeatured(sport.matches, sport.defaultDurationMinutes);

      var card = document.createElement('a');
      card.className = 'sport-card';
      card.href = sport.page;

      var statusHtml = '';
      if (sportFeatured) {
        if (sportFeatured.status === 'live') {
          statusHtml = '<div class="sport-card-status is-live"><span class="dot"></span> Live · ' + sportFeatured.home + ' vs ' + sportFeatured.away + '</div>';
        } else if (sportFeatured.status === 'upcoming') {
          statusHtml = '<div class="sport-card-status">Next: ' + sportFeatured.home + ' vs ' + sportFeatured.away + ' — ' + formatWhen(new Date(sportFeatured.kickoff)) + '</div>';
        } else {
          statusHtml = '<div class="sport-card-status">Last: ' + sportFeatured.home + ' vs ' + sportFeatured.away + '</div>';
        }
      }

      card.innerHTML =
        '<div class="sport-card-icon">' + sport.icon + '</div>' +
        '<div class="sport-card-body">' +
          '<div class="sport-card-name">' + sport.label + '</div>' +
          '<div class="sport-card-tagline">' + (sport.tagline || '') + '</div>' +
          statusHtml +
        '</div>' +
        '<div class="sport-card-cta">Watch <span>&rarr;</span></div>';

      sportsGrid.appendChild(card);
    });
  }

  // ---- Reveal sport cards as they scroll into view ----
  var cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = (i * 0.06) + 's';
        entry.target.classList.add('in-view');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.sport-card').forEach(function (el) { cardObserver.observe(el); });

  // ---- Re-check statuses periodically so a page left open transitions
  //      upcoming -> live -> finished on its own, without a refresh, and
  //      new/removed live matches appear/disappear automatically ----
  setInterval(function () {
    allMatches = buildAllMatches();
    renderAll();
  }, 30000);
})();
