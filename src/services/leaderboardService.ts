
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardEntry {
  user_id: string;
  username?: string;
  total_fantasy_points: number;
  total_prediction_points: number;
  rank: number;
}

export const leaderboardService = {
  // Get global leaderboard
  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select(`
          *,
          users:user_id(username)
        `)
        .order('rank', { ascending: true });
        
      if (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
      }
      
      // Format the response to match expected structure
      return (data || []).map(entry => ({
        user_id: entry.user_id || '',
        username: entry.users?.username || 'Unknown Player',
        total_fantasy_points: entry.total_fantasy_points || 0,
        total_prediction_points: entry.total_prediction_points || 0,
        rank: entry.rank || 999
      }));
    } catch (error) {
      console.error('Error in getLeaderboard:', error);
      return [];
    }
  },
  
  // Get user's rank
  getUserRank: async (userId: string): Promise<LeaderboardEntry | null> => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select(`
          *,
          users:user_id(username)
        `)
        .eq('user_id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user rank:', error);
        throw error;
      }
      
      if (!data) {
        return null;
      }
      
      return {
        user_id: data.user_id || '',
        username: data.users?.username || 'Unknown Player',
        total_fantasy_points: data.total_fantasy_points || 0,
        total_prediction_points: data.total_prediction_points || 0,
        rank: data.rank || 999
      };
    } catch (error) {
      console.error('Error in getUserRank:', error);
      return null;
    }
  }
};
