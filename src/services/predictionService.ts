
import { supabase } from "@/integrations/supabase/client";

interface Prediction {
  id: string;
  user_id: string;
  match_id: string;
  question: string;
  option_selected: string;
  is_correct: boolean | null;
  points_wagered: number;
  points_won: number;
  created_at: string;
}

export const predictionService = {
  // Get all predictions for a match
  getMatchPredictions: async (matchId: string): Promise<Prediction[]> => {
    try {
      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('match_id', matchId);
        
      if (error) {
        console.error('Error fetching match predictions:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in getMatchPredictions:', error);
      return [];
    }
  },
  
  // Get user predictions
  getUserPredictions: async (userId: string): Promise<Prediction[]> => {
    try {
      const { data, error } = await supabase
        .from('predictions')
        .select(`
          *,
          matches:match_id(name, team_a, team_b)
        `)
        .eq('user_id', userId);
        
      if (error) {
        console.error('Error fetching user predictions:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in getUserPredictions:', error);
      return [];
    }
  },
  
  // Make a prediction
  submitPrediction: async (
    userId: string,
    matchId: string,
    question: string,
    option: string,
    points: number
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('predictions')
        .insert({
          user_id: userId,
          match_id: matchId,
          question: question,
          option_selected: option,
          points_wagered: points
        });
        
      if (error) {
        console.error('Error submitting prediction:', error);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('Error in submitPrediction:', error);
      return false;
    }
  }
};
