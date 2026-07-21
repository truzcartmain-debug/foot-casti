/* ==========================================================================
   FOOT CASTI — FOOTBALL BROADCAST PAGE LOGIC
   --------------------------------------------------------------------------
   Reads from SITE_CONFIG.sports.football (assets/js/config.js) to render
   the fixture name, server switcher, stream embed, and match info. Which
   match is shown (live vs. next upcoming) is computed automatically from
   kickoff times — see schedule-utils.js.
   ========================================================================== */

(function () {
  var cfg = window.SITE_CONFIG;
  var Sched = window.ScheduleUtils;
  var sport = cfg.sports.football;

  document.title = cfg.siteName + ' — Live';
  document.querySelectorAll('.js-site-name').forEach(function (el) {
    el.textContent = cfg.siteName;
  });

  var featured = Sched.getFeatured(sport.matches, sport.defaultDurationMinutes);

  // ---- "Coming soon" / status note above the player ----
  var noteEl = document.getElementById('coming-soon');
  if (noteEl) {
    if (!featured) {
      noteEl.innerHTML = '<p>📺 No matches scheduled right now.</p>';
    } else if (featured.status === 'upcoming') {
      var kickoff = new Date(featured.kickoff);
      var when = kickoff.toLocaleString(undefined, {
        weekday: 'long', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
      noteEl.innerHTML = '<p>📺 Stream starts ' + when + ' <span style="color:var(--muted);">(your local time)</span></p><p>Come back when the stream has started.⚽</p>';
    } else if (featured.status === 'finished') {
      noteEl.innerHTML = '<p>This match has ended. Check the home page for the next kickoff.⚽</p>';
    } else {
      noteEl.style.display = 'none';
    }
  }

  // ---- Fixture heading ----
  var fixtureEl = document.getElementById('fixture-heading');
  if (fixtureEl && featured) {
    fixtureEl.innerHTML = featured.home + ' <span class="vs">vs</span> ' + featured.away;
  }

  // ---- Stream embed + server switcher ----
  // sport.streamServers is an array of { label, embedUrl, embedCode }.
  // Clicking a server button renders that server's embed into #player-frame:
  // embedCode (a full custom snippet) wins if present, otherwise embedUrl
  // is used as a plain iframe src.
  var playerFrame = document.getElementById('player-frame');
  var switcherEl = document.getElementById('server-switcher');

  function renderServer(server) {
    if (!playerFrame) return;
    if (server.embedCode && server.embedCode.trim()) {
      playerFrame.innerHTML = server.embedCode;
    } else {
      playerFrame.innerHTML =
        '<iframe id="stream-iframe" src="' + (server.embedUrl || '') + '" ' +
        'title="Foot Casti Stream" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
        'allowfullscreen></iframe>';
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
  if (competitionEl) competitionEl.textContent = featured ? featured.group : '—';
  if (venueEl) venueEl.textContent = featured ? featured.venue : '—';

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

  // ---- "Watching now" is handled by the whos.amung.us widget script
  // embedded directly in broadcast.html — no JS needed here.
})();
