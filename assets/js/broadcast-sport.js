/* ==========================================================================
   FOOT CASTI — SPORT BROADCAST PAGE LOGIC
   --------------------------------------------------------------------------
   Powers every non-football broadcast page (broadcast-baseball.html,
   broadcast-ufc.html, broadcast-uefa.html, and any new ones you add).
   Reads from SITE_CONFIG.sports (assets/js/config.js), keyed by the
   data-sport="..." attribute on <body>. Which match is shown (live vs.
   next upcoming) is computed automatically from kickoff times — see
   schedule-utils.js. To add a new sport: add an entry to sports in
   config.js, then copy one of the existing broadcast-*.html pages and
   change its data-sport attribute + text.
   ========================================================================== */

(function () {
  var cfg = window.SITE_CONFIG;
  var Sched = window.ScheduleUtils;
  var sportKey = document.body.getAttribute('data-sport');
  var sport = cfg.sports && cfg.sports[sportKey];

  if (!sport) {
    console.warn('Foot Casti: no config found for sport "' + sportKey + '"');
    return;
  }

  document.title = cfg.siteName + ' — ' + sport.label + ' Live';
  document.querySelectorAll('.js-site-name').forEach(function (el) {
    el.textContent = cfg.siteName;
  });

  // ---- Matches used for this page: the "matches" array in config.js ----
  function currentMatches() {
    return sport.matches;
  }

  var noteEl = document.getElementById('coming-soon');
  var fixtureEl = document.getElementById('fixture-heading');
  var competitionEl = document.getElementById('info-competition');
  var venueEl = document.getElementById('info-venue');

  function renderFixture() {
    var featured = Sched.getFeatured(currentMatches(), sport.defaultDurationMinutes);

    // ---- Status note above the player ----
    if (noteEl) {
      if (!featured) {
        noteEl.innerHTML = '<p>' + sport.icon + ' No ' + sport.label + ' matches scheduled right now.</p>';
      } else if (featured.status === 'upcoming') {
        var kickoff = new Date(featured.kickoff);
        var when = kickoff.toLocaleString(undefined, {
          weekday: 'long', month: 'short', day: 'numeric',
          hour: '2-digit', minute: '2-digit'
        });
        noteEl.innerHTML = '<p>' + sport.icon + ' Stream starts ' + when + ' <span style="color:var(--muted);">(your local time)</span></p><p>Come back when the stream has started.</p>';
      } else if (featured.status === 'finished') {
        noteEl.innerHTML = '<p>This event has ended. Check the home page for what\'s next.</p>';
      } else {
        noteEl.style.display = 'none';
      }
    }

    // ---- Fixture heading ----
    if (fixtureEl && featured) {
      fixtureEl.innerHTML = featured.home + ' <span class="vs">vs</span> ' + featured.away;
    }

    // ---- Match info rows ----
    if (competitionEl) competitionEl.textContent = featured ? featured.group : '—';
    if (venueEl) venueEl.textContent = featured ? featured.venue : '—';
  }

  renderFixture();

  // ---- Stream embed + server switcher ----
  var playerFrame = document.getElementById('player-frame');
  var switcherEl = document.getElementById('server-switcher');

  function renderServer(server) {
    if (!playerFrame) return;
    if (server.embedCode && server.embedCode.trim()) {
      playerFrame.innerHTML = server.embedCode;
    } else if (server.embedUrl && server.embedUrl.trim()) {
      playerFrame.innerHTML =
        '<iframe id="stream-iframe" src="' + server.embedUrl + '" ' +
        'title="Foot Casti Stream" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
        'allowfullscreen></iframe>';
    } else {
      playerFrame.innerHTML =
        '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--muted);text-align:center;padding:20px;">' +
        'Stream link not set yet for this server.<br>Add an embedUrl or embedCode in config.js.' +
        '</div>';
    }
  }

  var servers = sport.streamServers || [];
  if (switcherEl && servers.length) {
    servers.forEach(function (server, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'server-btn' + (i === 0 ? ' active' : '');
      btn.textContent = server.label || ('Server ' + (i + 1));
      btn.addEventListener('click', function () {
        switcherEl.querySelectorAll('.server-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        renderServer(server);
      });
      switcherEl.appendChild(btn);
    });
    renderServer(servers[0]);
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
})();
