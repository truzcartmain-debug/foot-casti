/* ==========================================================================
   FOOT CASTI — HOME PAGE LOGIC (MINIMAL VERSION)
   --------------------------------------------------------------------------
   Renders the hero badge, the "Watch Live" sport-picker dropdown, and the
   "Browse by Sport" grid — all from SITE_CONFIG, no external API.
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
  var watchLiveMenu = document.getElementById('watch-live-menu');

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
  }

  // ---- "Watch Live" sport picker: clicking the hero button shows a
  //      dropdown of every sport; picking one opens its broadcast page
  //      in a new tab. ----
  function closeWatchLiveMenu() {
    if (watchLiveMenu) watchLiveMenu.hidden = true;
  }

  function renderWatchLiveMenu() {
    if (!watchLiveMenu) return;
    watchLiveMenu.innerHTML = '';
    Object.keys(cfg.sports).forEach(function (key) {
      var sport = cfg.sports[key];
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'watch-live-menu-item';
      item.innerHTML = '<span class="watch-live-menu-icon">' + sport.icon + '</span><span>' + sport.label + '</span>';
      item.addEventListener('click', function (e) {
        e.stopPropagation();
        window.open(sport.page, '_blank', 'noopener');
        closeWatchLiveMenu();
      });
      watchLiveMenu.appendChild(item);
    });
  }

  if (heroWatchBtn && watchLiveMenu) {
    renderWatchLiveMenu();
    heroWatchBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      watchLiveMenu.hidden = !watchLiveMenu.hidden;
    });
    document.addEventListener('click', function (e) {
      if (!watchLiveMenu.hidden && !watchLiveMenu.contains(e.target) && e.target !== heroWatchBtn) {
        closeWatchLiveMenu();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeWatchLiveMenu();
    });
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
