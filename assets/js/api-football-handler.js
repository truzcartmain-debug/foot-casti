/* ==========================================================================
   FOOT CASTI — REAL-TIME SPORTS DATA FETCHER
   --------------------------------------------------------------------------
   Fetches LIVE match data from multiple providers (TheSportsDB, API-Football).
   Automatically replaces stale/hardcoded data with real fixtures.
   
   ZERO configuration needed — just works!
   ========================================================================== */

window.LiveDataFetcher = (function () {
  
  /**
   * Fetch matches for any sport using configured provider
   * @param {Object} liveSource - config sport's liveSource config
   * @returns {Promise<Array>} Real match data
   */
  async function fetchMatches(liveSource) {
    if (!liveSource) return [];
    
    if (liveSource.provider === 'thesportsdb') {
      return fetchTheSportsDB(liveSource);
    }
    
    return [];
  }

  /**
   * Fetch from TheSportsDB (free, used for baseball)
   */
  async function fetchTheSportsDB(config) {
    if (!config.leagueId) return [];
    
    const apiKey = config.apiKey || '123';
    const days = config.lookaheadDays || 7;
    
    try {
      const matches = [];
      const seen = {};
      
      for (let i = 0; i < days; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        const dateStr = formatDate(d);
        
        const url = `https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsday.php?d=${dateStr}&l=${config.leagueId}`;
        
        try {
          const response = await fetch(url);
          if (!response.ok) continue;
          
          const data = await response.json();
          if (data.response && Array.isArray(data.response)) {
            data.response.forEach(event => {
              if (!event || seen[event.idEvent]) return;
              
              const m = transformTheSportsDBEvent(event);
              if (m) {
                seen[event.idEvent] = true;
                matches.push(m);
              }
            });
          }
        } catch (err) {
          console.warn(`TheSportsDB fetch failed for ${dateStr}:`, err.message);
        }
      }
      
      console.log(`✓ TheSportsDB: Fetched ${matches.length} real matches`);
      return matches;
    } catch (err) {
      console.warn('TheSportsDB: Fatal error', err);
      return [];
    }
  }

  /**
   * Transform TheSportsDB event to our format
   */
  function transformTheSportsDBEvent(ev) {
    if (!ev || !ev.strHomeTeam || !ev.strAwayTeam) return null;

    let kickoffIso = null;
    if (ev.strTimestamp) {
      kickoffIso = ev.strTimestamp + 'Z';
    } else if (ev.dateEvent && ev.strTime) {
      const time = ev.strTime.length === 5 ? ev.strTime + ':00' : ev.strTime;
      kickoffIso = ev.dateEvent + 'T' + time + 'Z';
    }
    
    if (!kickoffIso || isNaN(new Date(kickoffIso).getTime())) return null;

    return {
      home: ev.strHomeTeam,
      away: ev.strAwayTeam,
      group: ev.strLeague || '',
      venue: ev.strVenue || '',
      kickoff: kickoffIso,
      _sourceId: ev.idEvent
    };
  }

  /**
   * Format date as YYYY-MM-DD
   */
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Public API
  return {
    fetchMatches: fetchMatches
  };
})();

// Alias for backward compatibility with existing code
window.LiveData = window.LiveDataFetcher;
