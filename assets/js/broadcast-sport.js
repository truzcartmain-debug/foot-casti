/* ==========================================================================
   FOOT CASTI — SPORT BROADCAST PAGE LOGIC
   --------------------------------------------------------------------------
   Powers every non-football broadcast page (broadcast-baseball.html,
   broadcast-ufc.html, broadcast-uefa.html, and any new ones you add).
   Reads from SITE_CONFIG.otherSports (assets/js/config.js), keyed by the
   data-sport="..." attribute on <body>. To add a new sport: add an entry
   to otherSports in config.js, then copy one of the existing
   broadcast-*.html pages and change its data-sport attribute + text.
   ========================================================================== */

(function () {
  var cfg = window.SITE_CONFIG;
  var sportKey = document.body.getAttribute('data-sport');
  var sport = cfg.otherSports && cfg.otherSports[sportKey];

  if (!sport) {
    console.warn('Foot Casti: no config found for sport "' + sportKey + '"');
    return;
  }

  document.title = cfg.siteName + ' — ' + sport.label + ' Live';
  document.querySelectorAll('.js-site-name').forEach(function (el) {
    el.textContent = cfg.siteName;
  });

  // ---- Coming soon note (optional, per sport) ----
  var comingSoonEl = document.getElementById('coming-soon');
  if (comingSoonEl) {
    if (sport.comingSoon && sport.comingSoon.trim()) {
      comingSoonEl.innerHTML = '<p>' + sport.comingSoon + '</p>';
      comingSoonEl.style.display = '';
    } else {
      comingSoonEl.style.display = 'none';
    }
  }

  // ---- Fixture heading ----
  var fixtureEl = document.getElementById('fixture-heading');
  if (fixtureEl && sport.liveMatch) {
    fixtureEl.innerHTML = sport.liveMatch.home + ' <span class="vs">vs</span> ' + sport.liveMatch.away;
  }

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

  // ---- Match info rows ----
  var competitionEl = document.getElementById('info-competition');
  var venueEl = document.getElementById('info-venue');
  if (competitionEl) competitionEl.textContent = sport.liveMatch ? sport.liveMatch.competition : '—';
  if (venueEl) venueEl.textContent = sport.liveMatch ? sport.liveMatch.venue : '—';

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
