
import { Series } from "@/types";
import { supabase } from "@/integrations/supabase/client";

export const seriesService = {
  getAllSeries: async (): Promise<Series[]> => {
    try {
      const { data, error } = await supabase
        .from('series')
        .select('*');
        
      if (error) {
        console.error('Error fetching series:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in getAllSeries:', error);
      return getMockSeries();
    }
  },
  
  searchSeries: async (query: string): Promise<Series[]> => {
    try {
      const { data, error } = await supabase
        .from('series')
        .select('*')
        .ilike('name', `%${query}%`);
        
      if (error) {
        console.error('Error searching series:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in searchSeries:', error);
      return getMockSeries();
    }
  },
  
  getSeriesInfo: async (seriesId: string): Promise<{info: Series, matchList: any[]}> => {
    try {
      // Get series info
      const { data: seriesData, error: seriesError } = await supabase
        .from('series')
        .select('*')
        .eq('id', seriesId)
        .single();
        
      if (seriesError) {
        throw seriesError;
      }
      
      // Get related matches
      const { data: matchesData, error: matchesError } = await supabase
        .from('matches')
        .select('*')
        .eq('series_id', seriesId);
        
      if (matchesError) {
        throw matchesError;
      }
      
      return {
        info: seriesData,
        matchList: matchesData || []
      };
    } catch (error) {
      console.error('Error in getSeriesInfo:', error);
      // Return mock data as fallback
      return {
        info: getMockSeries()[0],
        matchList: []
      };
    }
  }
};

// Fallback method for development/testing
const getMockSeries = (): Series[] => {
  return [
    {
      id: "ipl-2023",
      name: "Indian Premier League 2023",
      start_date: "2023-03-31",
      end_date: "2023-05-28",
      matches: 74,
      odi: 0,
      t20: 74,
      test: 0,
      squads: 10
    },
    {
      id: "wc-2023",
      name: "ICC Cricket World Cup 2023",
      start_date: "2023-10-05",
      end_date: "2023-11-19",
      matches: 48,
      odi: 48,
      t20: 0,
      test: 0,
      squads: 10
    }
  ];
};
