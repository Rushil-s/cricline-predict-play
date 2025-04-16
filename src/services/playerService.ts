
import { Player } from "@/types";
import { supabase } from "@/integrations/supabase/client";

export const playerService = {
  getAllPlayers: async (): Promise<Player[]> => {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*');
        
      if (error) {
        console.error('Error fetching players:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in getAllPlayers:', error);
      return getMockPlayers();
    }
  },
  
  searchPlayers: async (query: string): Promise<Player[]> => {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .ilike('name', `%${query}%`);
        
      if (error) {
        console.error('Error searching players:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in searchPlayers:', error);
      return getMockPlayers();
    }
  },
  
  getPlayerInfo: async (playerId: string): Promise<Player> => {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('id', playerId)
        .single();
        
      if (error) {
        console.error('Error fetching player info:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error in getPlayerInfo:', error);
      return getMockPlayers()[0];
    }
  }
};

// Fallback method for development/testing
const getMockPlayers = (): Player[] => {
  return [
    {
      id: "p1",
      name: "Virat Kohli",
      country: "India",
      role: "Batsman",
      batting_style: "Right Handed",
      bowling_style: "Right-arm medium",
    },
    {
      id: "p2",
      name: "Jasprit Bumrah",
      country: "India",
      role: "Bowler",
      batting_style: "Right Handed",
      bowling_style: "Right-arm fast",
    },
    {
      id: "p3",
      name: "Kane Williamson",
      country: "New Zealand",
      role: "Batsman",
      batting_style: "Right Handed",
      bowling_style: "Right-arm off break",
    }
  ];
};
