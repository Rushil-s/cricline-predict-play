
import { Match } from "@/types";
import { supabase } from "@/integrations/supabase/client";

// Helper function to ensure status matches the expected union type
const formatMatch = (match: any): Match => {
  // Map database status to one of the expected union values
  let formattedStatus: "upcoming" | "live" | "completed" = "upcoming";
  
  if (match.status) {
    const status = match.status.toLowerCase();
    if (status.includes('live')) {
      formattedStatus = "live";
    } else if (status.includes('complete') || status.includes('finished')) {
      formattedStatus = "completed";
    } else {
      formattedStatus = "upcoming";
    }
  }
  
  return {
    ...match,
    status: formattedStatus
  } as Match;
};

export const matchService = {
  getAllMatches: async (): Promise<Match[]> => {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select('*');
        
      if (error) {
        console.error('Error fetching matches:', error);
        throw error;
      }
      
      return (data || []).map(formatMatch);
    } catch (error) {
      console.error('Error in getAllMatches:', error);
      return [];
    }
  },
  
  getUpcomingMatches: async (): Promise<Match[]> => {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .ilike('status', '%upcoming%')
        .order('date', { ascending: true });
        
      if (error) {
        console.error('Error fetching upcoming matches:', error);
        throw error;
      }
      
      return (data || []).map(formatMatch);
    } catch (error) {
      console.error('Error in getUpcomingMatches:', error);
      return [];
    }
  },
  
  getLiveMatches: async (): Promise<Match[]> => {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .ilike('status', '%live%');
        
      if (error) {
        console.error('Error fetching live matches:', error);
        throw error;
      }
      
      return (data || []).map(formatMatch);
    } catch (error) {
      console.error('Error in getLiveMatches:', error);
      return [];
    }
  },
  
  getMatchDetails: async (matchId: string): Promise<Match> => {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .eq('id', matchId)
        .single();
        
      if (error) {
        console.error('Error fetching match details:', error);
        throw error;
      }
      
      return formatMatch(data);
    } catch (error) {
      console.error('Error in getMatchDetails:', error);
      throw error;
    }
  },
  
  getMatchesBySeriesId: async (seriesId: string): Promise<Match[]> => {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .eq('series_id', seriesId)
        .order('date', { ascending: true });
        
      if (error) {
        console.error('Error fetching matches by series:', error);
        throw error;
      }
      
      return (data || []).map(formatMatch);
    } catch (error) {
      console.error('Error in getMatchesBySeriesId:', error);
      return [];
    }
  },

  // Adding missing methods that are used in Index.tsx and FantasyTeamCreate.tsx
  getCurrentMatches: async (): Promise<Match[]> => {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .ilike('status', '%live%');
        
      if (error) {
        console.error('Error fetching current matches:', error);
        throw error;
      }
      
      return (data || []).map(formatMatch);
    } catch (error) {
      console.error('Error in getCurrentMatches:', error);
      return [];
    }
  },
  
  getMatchInfo: async (matchId: string, isLive: boolean = false): Promise<Match> => {
    // This is similar to getMatchDetails but kept separately for compatibility
    return matchService.getMatchDetails(matchId);
  },
  
  // Mock data for fallback
  getMockMatches: async (): Promise<Match[]> => {
    return [
      {
        id: "m1",
        series_id: "s1",
        name: "India vs Australia - 1st Test",
        status: "live",
        match_type: "Test",
        venue: "Melbourne Cricket Ground",
        date: new Date().toISOString(),
        team_a: "India",
        team_b: "Australia",
        score: { team_a: "245/6", team_b: "267" },
        fantasy_enabled: true
      },
      {
        id: "m2",
        series_id: "s1",
        name: "England vs New Zealand - 3rd ODI",
        status: "upcoming",
        match_type: "ODI",
        venue: "Lord's, London",
        date: new Date(Date.now() + 86400000).toISOString(),
        team_a: "England",
        team_b: "New Zealand",
        fantasy_enabled: true
      },
      {
        id: "m3",
        series_id: "s2",
        name: "South Africa vs Pakistan - 2nd T20",
        status: "completed",
        match_type: "T20",
        venue: "Johannesburg",
        date: new Date(Date.now() - 86400000).toISOString(),
        team_a: "South Africa",
        team_b: "Pakistan",
        score: { team_a: "189/5", team_b: "176/8" },
        fantasy_enabled: false
      }
    ];
  }
};
