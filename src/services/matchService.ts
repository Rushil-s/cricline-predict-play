
import { Match } from "@/types";
import { supabase } from "@/integrations/supabase/client";

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
      
      return data || [];
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
        .eq('status', 'upcoming')
        .order('date', { ascending: true });
        
      if (error) {
        console.error('Error fetching upcoming matches:', error);
        throw error;
      }
      
      return data || [];
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
        .eq('status', 'live');
        
      if (error) {
        console.error('Error fetching live matches:', error);
        throw error;
      }
      
      return data || [];
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
      
      return data;
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
      
      return data || [];
    } catch (error) {
      console.error('Error in getMatchesBySeriesId:', error);
      return [];
    }
  }
};
