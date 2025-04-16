
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
  
  getPlayerById: async (playerId: string): Promise<Player | null> => {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('id', playerId)
        .single();
        
      if (error) {
        console.error('Error fetching player:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error in getPlayerById:', error);
      return null;
    }
  },
  
  getPlayersByTeam: async (teamName: string): Promise<Player[]> => {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('country', teamName);
        
      if (error) {
        console.error('Error fetching players by team:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in getPlayersByTeam:', error);
      return [];
    }
  },
  
  // Adding the searchPlayers method used in FantasyTeamCreate.tsx
  searchPlayers: async (searchTerm: string): Promise<Player[]> => {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .or(`country.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%`);
        
      if (error) {
        console.error('Error searching players:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in searchPlayers:', error);
      return getMockPlayersByTeam(searchTerm);
    }
  }
};

// Mock data helper functions for fallback
const getMockPlayers = (): Player[] => {
  return [
    { 
      id: "p1", 
      name: "Virat Kohli", 
      country: "India", 
      role: "Batsman", 
      batting_style: "Right Handed", 
      bowling_style: "Right Arm Medium" 
    },
    { 
      id: "p2", 
      name: "Steve Smith", 
      country: "Australia", 
      role: "Batsman", 
      batting_style: "Right Handed" 
    },
    { 
      id: "p3", 
      name: "Jasprit Bumrah", 
      country: "India", 
      role: "Bowler", 
      bowling_style: "Right Arm Fast" 
    },
    { 
      id: "p4", 
      name: "Ben Stokes", 
      country: "England", 
      role: "All-Rounder", 
      batting_style: "Left Handed", 
      bowling_style: "Right Arm Fast Medium" 
    },
    { 
      id: "p5", 
      name: "Jos Buttler", 
      country: "England", 
      role: "Wicket-Keeper", 
      batting_style: "Right Handed" 
    }
  ];
};

// Helper function to mock players by team
const getMockPlayersByTeam = (team: string): Player[] => {
  const allPlayers = getMockPlayers();
  const filteredPlayers = allPlayers.filter(player => 
    player.country.toLowerCase() === team.toLowerCase() ||
    player.name.toLowerCase().includes(team.toLowerCase())
  );
  
  // If no matches, return mock players for that team
  if (filteredPlayers.length === 0) {
    if (team.toLowerCase().includes('india')) {
      return [
        { id: "p1", name: "Virat Kohli", country: "India", role: "Batsman", batting_style: "Right Handed" },
        { id: "p3", name: "Jasprit Bumrah", country: "India", role: "Bowler", bowling_style: "Right Arm Fast" },
        { id: "p6", name: "Rohit Sharma", country: "India", role: "Batsman", batting_style: "Right Handed" },
        { id: "p7", name: "Ravindra Jadeja", country: "India", role: "All-Rounder", batting_style: "Left Handed", bowling_style: "Slow Left Arm Orthodox" }
      ];
    } else if (team.toLowerCase().includes('australia')) {
      return [
        { id: "p2", name: "Steve Smith", country: "Australia", role: "Batsman", batting_style: "Right Handed" },
        { id: "p8", name: "Pat Cummins", country: "Australia", role: "Bowler", bowling_style: "Right Arm Fast" },
        { id: "p9", name: "David Warner", country: "Australia", role: "Batsman", batting_style: "Left Handed" }
      ];
    }
  }
  
  return filteredPlayers;
};
