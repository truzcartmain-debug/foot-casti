/* ==========================================================================
   FOOT CASTI — BROADCAST PAGE LOGIC
   --------------------------------------------------------------------------
   Reads from SITE_CONFIG (assets/js/config.js) to render the fixture name,
   server switcher, stream embed, and match info.
   ========================================================================== */

(function () {
  var cfg = window.SITE_CONFIG;

  document.title = cfg.siteName + ' — Live';
  document.querySelectorAll('.js-site-name').forEach(function (el) {
    el.textContent = cfg.siteName;
  });

  // ---- Fixture heading ----
  var fixtureEl = document.getElementById('fixture-heading');
  if (fixtureEl) {
    fixtureEl.innerHTML = cfg.liveMatch.home + ' <span class="vs">vs</span> ' + cfg.liveMatch.away;
  }

  // ---- Stream embed + server switcher ----
  // cfg.streamServers is an array of { label, embedUrl, embedCode }.
  // Clicking a server button renders that server's embed into #player-frame:
  // embedCode (a full custom snippet) wins if present, otherwise embedUrl
  // is used as a plain iframe src.
  var playerFrame = document.getElementById('player-frame');
  var switcherEl = document.getElementById('server-switcher');

  function renderServer(server) {
  if (!playerFrame) return;

  // Show countdown before stream starts
  if (cfg.streamStart) {

    var startTime = new Date(cfg.streamStart).getTime();

    if (Date.now() < startTime) {

      playerFrame.innerHTML = `
        <div class="countdown-box">
          <h2>🔴 Stream Starts In</h2>
          <div id="countdown-timer">Loading...</div>
        </div>
      `;

      var timerEl = document.getElementById("countdown-timer");

      function updateCountdown() {

        var diff = startTime - Date.now();

        if (diff <= 0) {
          clearInterval(interval);
          renderServer(server);
          return;
        }

        var d = Math.floor(diff / (1000 * 60 * 60 * 24));
        var h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        var m = Math.floor((diff / (1000 * 60)) % 60);
        var s = Math.floor((diff / 1000) % 60);

        timerEl.innerHTML =
          d + "d " +
          h + "h " +
          m + "m " +
          s + "s";
      }

      updateCountdown();

      var interval = setInterval(updateCountdown, 1000);

      return;
    }
  }

  // Stream starts
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

  var servers = cfg.streamServers || [];
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
  if (competitionEl) competitionEl.textContent = cfg.liveMatch.competition;
  if (venueEl) venueEl.textContent = cfg.liveMatch.venue;

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
