
import { supabase } from "@/integrations/supabase/client";
import { Player } from "@/types";

interface FantasyTeam {
  id: string;
  match_id: string;
  user_id: string;
  captain_id: string;
  vice_captain_id: string;
  created_at: string;
  players?: Player[];
}

export const fantasyService = {
  // Get user's fantasy teams
  getUserFantasyTeams: async (userId: string): Promise<FantasyTeam[]> => {
    try {
      const { data, error } = await supabase
        .from('fantasy_teams')
        .select('*')
        .eq('user_id', userId);
        
      if (error) {
        console.error('Error fetching fantasy teams:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in getUserFantasyTeams:', error);
      return [];
    }
  },
  
  // Get a specific fantasy team with its players
  getFantasyTeamWithPlayers: async (teamId: string): Promise<FantasyTeam | null> => {
    try {
      // Get team details
      const { data: team, error } = await supabase
        .from('fantasy_teams')
        .select('*')
        .eq('id', teamId)
        .single();
        
      if (error) {
        console.error('Error fetching fantasy team:', error);
        throw error;
      }
      
      if (!team) {
        return null;
      }
      
      // Get players in team
      const { data: playerLinks, error: playersError } = await supabase
        .from('fantasy_team_players')
        .select('player_id')
        .eq('fantasy_team_id', teamId);
        
      if (playersError) {
        console.error('Error fetching team players:', playersError);
        throw playersError;
      }
      
      // If there are players, fetch their details
      if (playerLinks?.length) {
        const playerIds = playerLinks.map(link => link.player_id);
        
        const { data: players, error: playerDetailsError } = await supabase
          .from('players')
          .select('*')
          .in('id', playerIds);
          
        if (playerDetailsError) {
          console.error('Error fetching player details:', playerDetailsError);
          throw playerDetailsError;
        }
        
        return {
          ...team,
          players: players || []
        };
      }
      
      return {
        ...team,
        players: []
      };
    } catch (error) {
      console.error('Error in getFantasyTeamWithPlayers:', error);
      return null;
    }
  },
  
  // Create a new fantasy team
  createFantasyTeam: async (
    userId: string,
    matchId: string,
    playerIds: string[],
    captainId: string,
    viceCaptainId: string
  ): Promise<string | null> => {
    try {
      // First, create the fantasy team
      const { data: team, error } = await supabase
        .from('fantasy_teams')
        .insert({
          user_id: userId,
          match_id: matchId,
          captain_id: captainId,
          vice_captain_id: viceCaptainId
        })
        .select()
        .single();
        
      if (error) {
        console.error('Error creating fantasy team:', error);
        throw error;
      }
      
      // Then add players to the team
      const playerLinks = playerIds.map(playerId => ({
        fantasy_team_id: team.id,
        player_id: playerId
      }));
      
      const { error: playersError } = await supabase
        .from('fantasy_team_players')
        .insert(playerLinks);
        
      if (playersError) {
        console.error('Error adding players to team:', playersError);
        throw playersError;
      }
      
      return team.id;
    } catch (error) {
      console.error('Error in createFantasyTeam:', error);
      return null;
    }
  },
  
  // Get fantasy scores for a match
  getFantasyScores: async (matchId: string): Promise<any[]> => {
    try {
      const { data, error } = await supabase
        .from('fantasy_scores')
        .select(`
          *,
          players:player_id(id, name, country, role)
        `)
        .eq('match_id', matchId);
        
      if (error) {
        console.error('Error fetching fantasy scores:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in getFantasyScores:', error);
      return [];
    }
  }
};
