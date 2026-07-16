/* ==========================================================================
   FOOT CASTI — HOME PAGE LOGIC
   --------------------------------------------------------------------------
   Reads everything from SITE_CONFIG (assets/js/config.js) and renders the
   header/footer brand name, hero live badge, hero stats, and the schedule
   list. Edit config.js for content changes — you shouldn't need to touch
   this file unless you're changing how things behave.
   ========================================================================== */

(function () {
  var cfg = window.SITE_CONFIG;

  // ---- Brand name + title ----
  document.title = cfg.siteName;
  document.querySelectorAll('.js-site-name').forEach(function (el) {
    el.textContent = cfg.siteName;
  });

  // ---- Hero live badge ----
  var heroBadge = document.getElementById('hero-live-badge');
  if (heroBadge) {
    heroBadge.innerHTML =
      '<span class="dot"></span> Live Now · ' + cfg.liveMatch.home + ' vs ' + cfg.liveMatch.away;
  }

  // ---- Hero stats (count up on scroll into view) ----
  var statsContainer = document.getElementById('hero-stats');
  if (statsContainer) {
    var statDefs = [
      { count: cfg.stats.liveNow, label: 'Live Now' },
      { count: cfg.stats.matchesToday, label: 'Match' + (cfg.stats.matchesToday === 1 ? '' : 'es') + ' Today' },
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

  // ---- Live match row ----
  var liveRow = document.getElementById('schedule-live-row');
  if (liveRow) {
    liveRow.innerHTML =
      '<div class="match-status"><span class="status-live"><span class="dot"></span> Live</span></div>' +
      '<div class="match-teams">' +
        '<div class="badges">' +
          '<span class="team-badge">' + initials(cfg.liveMatch.home) + '</span>' +
          '<span class="team-badge">' + initials(cfg.liveMatch.away) + '</span>' +
        '</div>' +
        '<div class="match-names">' + cfg.liveMatch.home + ' <span class="vs">vs</span> ' + cfg.liveMatch.away +
          '<span class="match-group">' + cfg.liveMatch.competition + ' · Full HD Broadcast</span>' +
        '</div>' +
      '</div>' +
      '<div class="match-action"><a href="broadcast.html" class="btn btn-primary btn-sm">Watch Live</a></div>';
  }

  // ---- Upcoming schedule rows, generated from config ----
  var scheduleList = document.getElementById('schedule-list');
  if (scheduleList) {
    cfg.schedule.forEach(function (match) {
      var row = document.createElement('div');
      row.className = 'match-row';
      row.setAttribute('data-kickoff', match.kickoff);
      row.innerHTML =
        '<div class="match-status">' +
          '<span class="status-time">--:--</span>' +
          '<span class="status-date"></span>' +
        '</div>' +
        '<div class="match-teams">' +
          '<div class="badges">' +
            '<span class="team-badge">' + initials(match.home) + '</span>' +
            '<span class="team-badge">' + initials(match.away) + '</span>' +
          '</div>' +
          '<div class="match-names">' + match.home + ' <span class="vs">vs</span> ' + match.away +
            '<span class="match-group">' + match.group + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="match-action"><span class="btn btn-sm btn-disabled">Not Started</span></div>';
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

  // ---- Convert every kickoff time into the visitor's own local timezone ----
  document.querySelectorAll('.match-row[data-kickoff]').forEach(function (row) {
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
})();
