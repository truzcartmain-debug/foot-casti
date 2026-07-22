/* ==========================================================================
   FOOT CASTI — HOME PAGE LOGIC (MINIMAL VERSION)
   --------------------------------------------------------------------------
   Simplified version without schedule system. Only renders hero badge and
   sports grid.
   ========================================================================== */

(function () {
  var cfg = window.SITE_CONFIG;
  var Sched = window.ScheduleUtils;

  // ---- Brand name + title ----
  document.title = cfg.siteName;
  document.querySelectorAll('.js-site-name').forEach(function (el) {
    el.textContent = cfg.siteName;
  });

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

  // ---- Hero live badge: reflects whichever match, across ALL sports, is
  //      the current headline ----
  var heroBadge = document.getElementById('hero-live-badge');
  var heroWatchBtn = document.getElementById('hero-watch-btn');

  function getAllMatches() {
    var all = [];
    Object.keys(cfg.sports).forEach(function (key) {
      var sport = cfg.sports[key];
      var matches = sport.matches || [];
      var annotated = Sched.annotate(matches, sport.defaultDurationMinutes);
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

  function renderHero() {
    var allMatches = getAllMatches();
    var sortedAll = Sched.sortForDisplay(allMatches);
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

  // ---- "Browse by Sport" cards ----
  var sportsGrid = document.getElementById('sports-grid');

  function renderSportsGrid() {
    if (!sportsGrid) return;
    sportsGrid.innerHTML = '';
    Object.keys(cfg.sports).forEach(function (key) {
      var sport = cfg.sports[key];
      var sportFeatured = Sched.getFeatured(sport.matches || [], sport.defaultDurationMinutes);

      var card = document.createElement('a');
      card.className = 'sport-card in-view';
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
        '<div class="sport-card-cta">Watch <span>→</span></div>';

      sportsGrid.appendChild(card);
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

  renderHero();
  renderSportsGrid();

  // ---- Re-check statuses periodically ----
  setInterval(function () {
    renderHero();
    renderSportsGrid();
  }, 30000);
})();