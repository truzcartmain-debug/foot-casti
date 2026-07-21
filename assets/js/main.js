/* ==========================================================================
   FOOT CASTI — HOME PAGE LOGIC
   --------------------------------------------------------------------------
   Reads everything from SITE_CONFIG (assets/js/config.js) and renders the
   header/footer brand name, hero live badge, hero stats, the schedule
   list, and the "Browse by Sport" cards. Match status (live / upcoming /
   finished) is computed automatically from each match's kickoff time —
   see schedule-utils.js. Edit config.js for content changes — you
   shouldn't need to touch this file unless you're changing how things
   behave.
   ========================================================================== */

(function () {
  var cfg = window.SITE_CONFIG;
  var Sched = window.ScheduleUtils;

  // ---- Which sport powers the hero + main schedule section ----
  var heroSportKey = Object.keys(cfg.sports).filter(function (k) {
    return cfg.sports[k].isHomeHero;
  })[0] || Object.keys(cfg.sports)[0];
  var heroSport = cfg.sports[heroSportKey];

  var annotated = Sched.annotate(heroSport.matches, heroSport.defaultDurationMinutes);
  var sorted = Sched.sortForDisplay(annotated);
  var featured = sorted[0] || null; // live match if any, else soonest upcoming, else most recent

  // ---- Brand name + title ----
  document.title = cfg.siteName;
  document.querySelectorAll('.js-site-name').forEach(function (el) {
    el.textContent = cfg.siteName;
  });

  // ---- Hero live badge (reflects real status, not a manual flag) ----
  var heroBadge = document.getElementById('hero-live-badge');
  if (heroBadge) {
    if (!featured) {
      heroBadge.innerHTML = '<span class="dot"></span> No matches scheduled';
    } else if (featured.status === 'live') {
      heroBadge.innerHTML = '<span class="dot"></span> Live Now · ' + featured.home + ' vs ' + featured.away;
    } else if (featured.status === 'upcoming') {
      heroBadge.innerHTML = '<span class="dot"></span> Next: ' + featured.home + ' vs ' + featured.away + ' — ' + formatWhen(new Date(featured.kickoff));
    } else {
      heroBadge.innerHTML = '<span class="dot"></span> Last match: ' + featured.home + ' vs ' + featured.away + ' (Finished)';
    }
  }

  // ---- Hero stats (auto: live now + matches today; teams left stays manual) ----
  var statsContainer = document.getElementById('hero-stats');
  if (statsContainer) {
    var liveNowCount = annotated.filter(function (m) { return m.status === 'live'; }).length;
    var matchesTodayCount = annotated.filter(function (m) {
      return Sched.isSameDay(new Date(m.kickoff));
    }).length;

    var statDefs = [
      { count: liveNowCount, label: 'Live Now' },
      { count: matchesTodayCount, label: 'Match' + (matchesTodayCount === 1 ? '' : 'es') + ' Today' },
      { count: cfg.stats.teamsLeft, label: 'Teams Left' }
    ];
    statDefs.forEach(function (def) {
      var stat = document.createElement('div');
      stat.className = 'stat';
      stat.innerHTML =
        '<div class="stat-num" data-count="' + def.count + '">0</div>' +
        '<div class="stat-label">' + def.label + '</div>';
      statsContainer.appendChild(stat);
    });
  }

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

  // ---- Full schedule, built entirely from computed status (no separate
  //      "live row" — whichever match is live just sorts to the top and
  //      gets the is-live styling automatically) ----
  var scheduleList = document.getElementById('schedule-list');
  if (scheduleList) {
    sorted.forEach(function (match) {
      var row = document.createElement('div');
      row.className = 'match-row' + (match.status === 'live' ? ' is-live' : '') + (match.status === 'finished' ? ' is-finished' : '');
      row.setAttribute('data-kickoff', match.kickoff);
      row.setAttribute('data-status', match.status);

      var actionHtml;
      if (match.status === 'live') {
        actionHtml = '<a href="' + heroSport.page + '" class="btn btn-primary btn-sm">Watch Live</a>';
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
          '<div class="match-names">' + match.home + ' <span class="vs">vs</span> ' + match.away +
            '<span class="match-group">' + match.group + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="match-action">' + actionHtml + '</div>';
      scheduleList.appendChild(row);
    });
  }

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
      if (sport.isHomeHero) return; // football already has the hero above

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

  // ---- Convert every kickoff time into the visitor's own local timezone ----
  document.querySelectorAll('.match-row[data-kickoff]').forEach(function (row) {
    if (row.getAttribute('data-status') !== 'upcoming') return;
    var kickoff = new Date(row.getAttribute('data-kickoff'));
    var timeEl = row.querySelector('.status-time');
    var dateEl = row.querySelector('.status-date');
    if (timeEl) {
      timeEl.textContent = kickoff.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    }
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
  });

  // ---- Animate hero stat numbers counting up once visible ----
  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute('data-count'), 10);
      var startTime = null;
      var duration = 900;
      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
      statObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.stat-num').forEach(function (el) { statObserver.observe(el); });

  // ---- Reveal schedule rows as they scroll into view ----
  var rowObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = (i * 0.06) + 's';
        entry.target.classList.add('in-view');
        rowObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.match-row').forEach(function (el) { rowObserver.observe(el); });

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
  //      upcoming -> live -> finished on its own, without a refresh ----
  setInterval(function () {
    var stillFeatured = Sched.getFeatured(heroSport.matches, heroSport.defaultDurationMinutes);
    var currentlyShown = heroBadge && heroBadge.textContent.indexOf('Live Now') !== -1;
    var shouldBeLive = stillFeatured && stillFeatured.status === 'live';
    if (currentlyShown !== shouldBeLive) {
      location.reload();
    }
  }, 60000);
})();
