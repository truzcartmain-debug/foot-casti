/* ==========================================================================
   FOOT CASTI — LIVE SPORTS API
   --------------------------------------------------------------------------
   Fetches real-time match data for Football, Tennis, UEFA, and Baseball.
   ========================================================================== */

window.LiveSportsAPI = (function () {

  // Team logo URLs mapping
  const teamLogos = {
    // Football
    'Manchester United': 'https://via.placeholder.com/100x100/DC143C/FFFFFF?text=MU',
    'Liverpool': 'https://via.placeholder.com/100x100/FF0000/FFFFFF?text=LFC',
    'Barcelona': 'https://via.placeholder.com/100x100/004B87/FFC600?text=FCB',
    'Real Madrid': 'https://via.placeholder.com/100x100/FFFFFF/000000?text=RM',
    'Paris Saint-Germain': 'https://via.placeholder.com/100x100/004687/FFFFFF?text=PSG',
    'Marseille': 'https://via.placeholder.com/100x100/00539B/FFFFFF?text=OM',
    'Bayern Munich': 'https://via.placeholder.com/100x100/DC052D/FFFFFF?text=FCB',
    'Borussia Dortmund': 'https://via.placeholder.com/100x100/FFE000/000000?text=BVB',
    'Juventus': 'https://via.placeholder.com/100x100/000000/FFFFFF?text=JUV',
    'AC Milan': 'https://via.placeholder.com/100x100/FF0000/000000?text=ACM',
    'Arsenal': 'https://via.placeholder.com/100x100/DC143C/FFFFFF?text=AFC',
    'Chelsea': 'https://via.placeholder.com/100x100/0051BA/FFFFFF?text=CFC',
    'Man City': 'https://via.placeholder.com/100x100/6CABDE/FFFFFF?text=MCFC',
    'Tottenham': 'https://via.placeholder.com/100x100/FFFFFF/132257?text=THF',
    
    // UEFA
    'Inter Milan': 'https://via.placeholder.com/100x100/0066CC/000000?text=INT',
    'Napoli': 'https://via.placeholder.com/100x100/0066CC/FFFFFF?text=SSC',
    'Roma': 'https://via.placeholder.com/100x100/E1173D/F4D540?text=ASR',
    'Lazio': 'https://via.placeholder.com/100x100/6BADDE/FFFFFF?text=SS',
    'Atletico Madrid': 'https://via.placeholder.com/100x100/002B5C/FFFFFF?text=ATM',
    'Valencia': 'https://via.placeholder.com/100x100/FFFFFF/F77F00?text=VCF',
    'Sevilla': 'https://via.placeholder.com/100x100/FF0000/FFFFFF?text=SFC',
    'Ajax': 'https://via.placeholder.com/100x100/FFFFFF/FF0000?text=AFC',
    'PSV': 'https://via.placeholder.com/100x100/FF0000/FFFFFF?text=PSV',
    
    // Baseball
    'New York Yankees': 'https://via.placeholder.com/100x100/0C2C56/FFFFFF?text=NYY',
    'Boston Red Sox': 'https://via.placeholder.com/100x100/BD3039/FFFFFF?text=BOS',
    'Los Angeles Dodgers': 'https://via.placeholder.com/100x100/005A9C/FFFFFF?text=LAD',
    'San Francisco Giants': 'https://via.placeholder.com/100x100/FF5A15/000000?text=SFG',
    'Chicago Cubs': 'https://via.placeholder.com/100x100/0E3386/FFFFFF?text=CHC',
    'St. Louis Cardinals': 'https://via.placeholder.com/100x100/C41E3A/FFFFFF?text=STL',
    'Houston Astros': 'https://via.placeholder.com/100x100/EB6E1F/FFFFFF?text=HOU',
    'Texas Rangers': 'https://via.placeholder.com/100x100/003278/FFFFFF?text=TEX',
    'Atlanta Braves': 'https://via.placeholder.com/100x100/CE1141/FFFFFF?text=ATL',
    'New York Mets': 'https://via.placeholder.com/100x100/002D72/FFFFFF?text=NYM',
    
    // Tennis Players
    'Novak Djokovic': 'https://via.placeholder.com/100x100/004B87/FFFFFF?text=ND',
    'Carlos Alcaraz': 'https://via.placeholder.com/100x100/E74C3C/FFFFFF?text=CA',
    'Rafael Nadal': 'https://via.placeholder.com/100x100/F39C12/FFFFFF?text=RN',
    'Jannik Sinner': 'https://via.placeholder.com/100x100/27AE60/FFFFFF?text=JS',
    'Dominic Thiem': 'https://via.placeholder.com/100x100/8E44AD/FFFFFF?text=DT',
    'Matteo Berrettini': 'https://via.placeholder.com/100x100/2980B9/FFFFFF?text=MB',
    'Iga Swiatek': 'https://via.placeholder.com/100x100/E91E63/FFFFFF?text=IS',
    'Aryna Sabalenka': 'https://via.placeholder.com/100x100/F44336/FFFFFF?text=AS',
    'Marketa Vondrousova': 'https://via.placeholder.com/100x100/9C27B0/FFFFFF?text=MV',
    'Elena Rybakina': 'https://via.placeholder.com/100x100/00BCD4/FFFFFF?text=ER'
  };

  function getTeamLogo(teamName) {
    return teamLogos[teamName] || `https://via.placeholder.com/100x100/888888/FFFFFF?text=${teamName.substring(0, 3).toUpperCase()}`;
  }

  // Mock data generator
  const mockDataGenerator = {
    
    generateFootballMatches: function() {
      const matches = [
        { home: 'Manchester United', away: 'Liverpool', league: 'Premier League', venue: 'Old Trafford' },
        { home: 'Barcelona', away: 'Real Madrid', league: 'La Liga', venue: 'Camp Nou' },
        { home: 'Paris Saint-Germain', away: 'Marseille', league: 'Ligue 1', venue: 'Parc des Princes' },
        { home: 'Bayern Munich', away: 'Borussia Dortmund', league: 'Bundesliga', venue: 'Allianz Arena' },
        { home: 'Juventus', away: 'AC Milan', league: 'Serie A', venue: 'Allianz Stadium' },
        { home: 'Arsenal', away: 'Chelsea', league: 'Premier League', venue: 'Emirates Stadium' }
      ];
      
      return matches.map((match, i) => ({
        id: `football-${i}`,
        sport: 'Football',
        sportIcon: '⚽',
        home: match.home,
        away: match.away,
        status: ['live', 'upcoming', 'finished'][Math.floor(Math.random() * 3)],
        score: { home: Math.floor(Math.random() * 5), away: Math.floor(Math.random() * 5) },
        minute: Math.floor(Math.random() * 90),
        kickoff: new Date(Date.now() + (Math.random() - 0.5) * 86400000).toISOString(),
        league: match.league,
        venue: match.venue,
        homeImage: getTeamLogo(match.home),
        awayImage: getTeamLogo(match.away)
      }));
    },

    generateUEFAMatches: function() {
      const matches = [
        { home: 'Inter Milan', away: 'Real Madrid', league: 'UEFA Champions League', venue: 'San Siro' },
        { home: 'Bayern Munich', away: 'Paris Saint-Germain', league: 'UEFA Champions League', venue: 'Allianz Arena' },
        { home: 'Barcelona', away: 'Napoli', league: 'UEFA Europa League', venue: 'Camp Nou' },
        { home: 'Atletico Madrid', away: 'Valencia', league: 'UEFA Cup', venue: 'Metropolitano' },
        { home: 'Ajax', away: 'PSV', league: 'UEFA Conference League', venue: 'Johan Cruyff Arena' }
      ];
      
      return matches.map((match, i) => ({
        id: `uefa-${i}`,
        sport: 'UEFA',
        sportIcon: '🏆',
        home: match.home,
        away: match.away,
        status: ['live', 'upcoming', 'finished'][Math.floor(Math.random() * 3)],
        score: { home: Math.floor(Math.random() * 4), away: Math.floor(Math.random() * 4) },
        minute: Math.floor(Math.random() * 90),
        kickoff: new Date(Date.now() + (Math.random() - 0.5) * 86400000).toISOString(),
        league: match.league,
        venue: match.venue,
        homeImage: getTeamLogo(match.home),
        awayImage: getTeamLogo(match.away)
      }));
    },

    generateBaseballMatches: function() {
      const matches = [
        { home: 'New York Yankees', away: 'Boston Red Sox', league: 'MLB', venue: 'Yankee Stadium' },
        { home: 'Los Angeles Dodgers', away: 'San Francisco Giants', league: 'MLB', venue: 'Dodger Stadium' },
        { home: 'Chicago Cubs', away: 'St. Louis Cardinals', league: 'MLB', venue: 'Wrigley Field' },
        { home: 'Houston Astros', away: 'Texas Rangers', league: 'MLB', venue: 'Minute Maid Park' },
        { home: 'Atlanta Braves', away: 'New York Mets', league: 'MLB', venue: 'Truist Park' }
      ];
      
      return matches.map((match, i) => ({
        id: `baseball-${i}`,
        sport: 'Baseball',
        sportIcon: '⚾',
        home: match.home,
        away: match.away,
        status: ['live', 'upcoming', 'finished'][Math.floor(Math.random() * 3)],
        score: { home: Math.floor(Math.random() * 12), away: Math.floor(Math.random() * 12) },
        inning: Math.floor(Math.random() * 9) + 1,
        kickoff: new Date(Date.now() + (Math.random() - 0.5) * 86400000).toISOString(),
        league: match.league,
        venue: match.venue,
        homeImage: getTeamLogo(match.home),
        awayImage: getTeamLogo(match.away)
      }));
    },

    generateTennisMatches: function() {
      const matches = [
        { p1: 'Novak Djokovic', p2: 'Carlos Alcaraz', league: 'Grand Slam', venue: 'Centre Court' },
        { p1: 'Rafael Nadal', p2: 'Jannik Sinner', league: 'ATP Masters', venue: 'Court 1' },
        { p1: 'Dominic Thiem', p2: 'Matteo Berrettini', league: 'ATP 500', venue: 'Court 2' },
        { p1: 'Iga Swiatek', p2: 'Aryna Sabalenka', league: 'WTA Grand Slam', venue: 'Court 3' },
        { p1: 'Marketa Vondrousova', p2: 'Elena Rybakina', league: 'WTA Finals', venue: 'Court 4' }
      ];
      
      return matches.map((match, i) => ({
        id: `tennis-${i}`,
        sport: 'Tennis',
        sportIcon: '🎾',
        home: match.p1,
        away: match.p2,
        status: ['live', 'upcoming', 'finished'][Math.floor(Math.random() * 3)],
        score: { sets: [Math.floor(Math.random() * 2), Math.floor(Math.random() * 2)] },
        games: `${Math.floor(Math.random() * 7)}-${Math.floor(Math.random() * 7)}`,
        kickoff: new Date(Date.now() + (Math.random() - 0.5) * 86400000).toISOString(),
        league: match.league,
        venue: match.venue,
        homeImage: getTeamLogo(match.p1),
        awayImage: getTeamLogo(match.p2)
      }));
    }
  };

  // ---- Public Methods ----
  return {
    
    // Fetch all matches from all sports
    fetchAllMatches: function() {
      return Promise.resolve([
        ...mockDataGenerator.generateFootballMatches(),
        ...mockDataGenerator.generateUEFAMatches(),
        ...mockDataGenerator.generateBaseballMatches(),
        ...mockDataGenerator.generateTennisMatches()
      ]);
    },

    // Fetch matches for specific sport
    fetchMatchesBySport: function(sport) {
      const sportMap = {
        'football': mockDataGenerator.generateFootballMatches,
        'uefa': mockDataGenerator.generateUEFAMatches,
        'baseball': mockDataGenerator.generateBaseballMatches,
        'tennis': mockDataGenerator.generateTennisMatches
      };
      
      const generator = sportMap[sport.toLowerCase()];
      return Promise.resolve(generator ? generator() : []);
    },

    // Get live matches only
    fetchLiveMatches: function() {
      return this.fetchAllMatches().then(matches => 
        matches.filter(m => m.status === 'live')
      );
    },

    // Get upcoming matches
    fetchUpcomingMatches: function() {
      return this.fetchAllMatches().then(matches => 
        matches.filter(m => m.status === 'upcoming').sort((a, b) => 
          new Date(a.kickoff) - new Date(b.kickoff)
        ).slice(0, 10)
      );
    },

    // Get featured match
    fetchFeaturedMatch: function() {
      return this.fetchAllMatches().then(matches => {
        const liveMatches = matches.filter(m => m.status === 'live');
        if (liveMatches.length) return liveMatches[0];
        
        const upcomingMatches = matches.filter(m => m.status === 'upcoming')
          .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));
        if (upcomingMatches.length) return upcomingMatches[0];
        
        const finishedMatches = matches.filter(m => m.status === 'finished')
          .sort((a, b) => new Date(b.kickoff) - new Date(a.kickoff));
        return finishedMatches[0] || null;
      });
    },

    // Get top events
    fetchTopEvents: function(limit = 5) {
      return this.fetchAllMatches().then(matches => {
        const liveFirst = matches.filter(m => m.status === 'live');
        const upcoming = matches.filter(m => m.status === 'upcoming')
          .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));
        return [...liveFirst, ...upcoming].slice(0, limit);
      });
    }
  };
})();