/* ==========================================================================
   FOOT CASTI — AUTOMATED SCHEDULE MANAGER
   --------------------------------------------------------------------------
   Manages live match schedules, real-time updates, and live events display.
   ========================================================================== */

(function () {
  const API = window.LiveSportsAPI;
  let allMatches = [];
  let liveMatches = [];
  let updateInterval = null;

  // ---- Utility Functions ----
  function getStatus(match) {
    if (match.status === 'live') return 'LIVE';
    if (match.status === 'finished') return 'FINISHED';
    const kickoff = new Date(match.kickoff);
    const now = new Date();
    const hoursUntil = (kickoff - now) / (1000 * 60 * 60);
    if (hoursUntil < 1) return 'STARTING SOON';
    if (hoursUntil < 24) return Math.floor(hoursUntil) + 'H LEFT';
    return 'UPCOMING';
  }

  function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  function getTeamInitials(name) {
    const words = name.trim().split(/\s+/);
    if (words.length === 1) return words[0].substring(0, 3).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  // ---- Live Matches Grid ----
  function renderLiveEvents() {
    const liveGrid = document.getElementById('live-events-grid');
    const liveCount = document.getElementById('live-events-count');
    const liveEmpty = document.getElementById('live-events-empty');
    
    if (!liveGrid) return;

    liveGrid.innerHTML = '';
    
    if (liveMatches.length === 0) {
      if (liveEmpty) liveEmpty.hidden = false;
      if (liveCount) liveCount.textContent = '';
      return;
    }

    if (liveEmpty) liveEmpty.hidden = true;
    if (liveCount) liveCount.textContent = `${liveMatches.length} LIVE NOW`;

    liveMatches.slice(0, 6).forEach((match, index) => {
      const card = document.createElement('div');
      card.className = 'live-event-card in-view';
      card.style.animationDelay = (index * 0.06) + 's';
      card.onclick = () => window.open(match.sportPage || '#', '_self');

      const scoreText = match.status === 'live' 
        ? `${match.score.home} - ${match.score.away}`
        : (match.status === 'finished' ? `${match.score.home} - ${match.score.away} (FT)` : 'vs');

      card.innerHTML = `
        <div class="live-event-top">
          <span class="live-event-tag"><span class="dot"></span> ${getStatus(match)}</span>
          <span class="live-event-sport">${match.sportIcon} ${match.sport}</span>
        </div>
        <div class="live-event-images">
          <img src="${match.homeImage}" alt="${match.home}" class="team-image">
          <span class="vs-text">VS</span>
          <img src="${match.awayImage}" alt="${match.away}" class="team-image">
        </div>
        <div class="live-event-names">
          <span class="team-name">${match.home}</span>
          <span class="score-text">${scoreText}</span>
          <span class="team-name">${match.away}</span>
        </div>
        <div class="live-event-meta">${match.league}</div>
        <div class="live-event-cta">Watch Live <span>→</span></div>
      `;

      liveGrid.appendChild(card);
    });
  }

  // ---- Full Schedule ----
  function renderSchedule() {
    const scheduleList = document.getElementById('schedule-list');
    const scheduleCount = document.getElementById('schedule-count');
    const scheduleEmpty = document.getElementById('schedule-empty');
    
    if (!scheduleList) return;

    scheduleList.innerHTML = '';
    
    if (allMatches.length === 0) {
      if (scheduleEmpty) scheduleEmpty.hidden = false;
      if (scheduleCount) scheduleCount.textContent = '';
      return;
    }

    if (scheduleEmpty) scheduleEmpty.hidden = true;
    if (scheduleCount) scheduleCount.textContent = `${allMatches.length} MATCHES`;

    allMatches.forEach((match) => {
      const row = document.createElement('div');
      row.className = 'match-row ' + (match.status === 'live' ? 'is-live' : '') + (match.status === 'finished' ? 'is-finished' : '') + ' in-view';

      const statusText = getStatus(match);
      const homeInitials = getTeamInitials(match.home);
      const awayInitials = getTeamInitials(match.away);

      const scoreText = match.status === 'live' 
        ? `${match.score.home} - ${match.score.away}`
        : (match.status === 'finished' ? `${match.score.home} - ${match.score.away}` : 'vs');

      row.innerHTML = `
        <div class="match-status">
          <span class="status-badge ${match.status}">${statusText}</span>
        </div>
        <div class="match-teams">
          <div class="team-image-container">
            <img src="${match.homeImage}" alt="${match.home}" class="match-team-image">
            <img src="${match.awayImage}" alt="${match.away}" class="match-team-image">
          </div>
          <div class="match-info">
            <div class="match-sport">${match.sportIcon} ${match.sport}</div>
            <div class="match-names">
              <span>${match.home}</span>
              <span class="score">${scoreText}</span>
              <span>${match.away}</span>
            </div>
            <div class="match-league">${match.league}</div>
            <div class="match-time">${formatDate(match.kickoff)} • ${formatTime(match.kickoff)}</div>
          </div>
        </div>
        <div class="match-action">
          <button class="btn-sm btn-watch">Watch</button>
        </div>
      `;

      row.querySelector('.btn-watch').onclick = () => window.open(match.sportPage || '#', '_self');
      scheduleList.appendChild(row);
    });
  }

  // ---- Top Events Section ----
  function renderTopEvents() {
    const topEventsContainer = document.getElementById('top-events-container');
    if (!topEventsContainer) return;

    const topEvents = allMatches.filter(m => m.status === 'live' || m.status === 'upcoming').slice(0, 3);

    topEventsContainer.innerHTML = '';

    topEvents.forEach((match) => {
      const eventCard = document.createElement('div');
      eventCard.className = 'top-event-card';

      const scoreText = match.status === 'live' 
        ? `${match.score.home} - ${match.score.away}`
        : 'UPCOMING';

      eventCard.innerHTML = `
        <div class="top-event-badge">${match.status === 'live' ? '🔴 LIVE' : '⏰ SOON'}</div>
        <div class="top-event-images">
          <img src="${match.homeImage}" alt="${match.home}">
          <div class="top-event-score">${scoreText}</div>
          <img src="${match.awayImage}" alt="${match.away}">
        </div>
        <div class="top-event-info">
          <h3>${match.home} vs ${match.away}</h3>
          <p>${match.sport} • ${match.league}</p>
          <p class="match-time-small">${formatTime(match.kickoff)}</p>
        </div>
      `;

      topEventsContainer.appendChild(eventCard);
    });
  }

  // ---- Update All Data ----
  function updateAllData() {
    API.fetchAllMatches().then(matches => {
      allMatches = matches.sort((a, b) => {
        if (a.status === 'live' && b.status !== 'live') return -1;
        if (a.status !== 'live' && b.status === 'live') return 1;
        return new Date(a.kickoff) - new Date(b.kickoff);
      });

      liveMatches = allMatches.filter(m => m.status === 'live');

      renderLiveEvents();
      renderSchedule();
      renderTopEvents();
    });
  }

  // ---- Initialize ----
  function init() {
    updateAllData();
    
    // Update every 30 seconds for real-time feel
    updateInterval = setInterval(updateAllData, 30000);
  }

  // ---- Expose public methods ----
  window.ScheduleManager = {
    init: init,
    update: updateAllData,
    getLiveMatches: () => liveMatches,
    getAllMatches: () => allMatches,
    destroy: () => clearInterval(updateInterval)
  };

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();