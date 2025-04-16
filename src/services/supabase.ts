
import { createClient } from "@supabase/supabase-js";
import { User, FantasyTeam, Prediction, LeaderboardEntry, FantasyScore } from "@/types";
import { toast } from "sonner";

// Note: In a real application, these would be environment variables
// For this demo, we're temporarily hardcoding them
// This isn't a production-ready approach - it's just for demonstration
const SUPABASE_URL = "YOUR_SUPABASE_URL"; // Replace with actual Supabase URL when connected
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY"; // Replace with actual anon key when connected

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth Services
export const authService = {
  // User Registration
  signUp: async (email: string, password: string, username: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            cricpoints: 1000, // Starting points
            xp_level: 1,
          },
        },
      });
      
      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      toast.success("Registration successful! Please check your email for verification.");
      return data;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  },
  
  // User Login
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      toast.success("Login successful!");
      return data;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  },
  
  // User Logout
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      toast.success("You have been logged out.");
      return true;
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  },
  
  // Get Current Session
  getSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }
      
      return data.session;
    } catch (error) {
      console.error("Get session error:", error);
      throw error;
    }
  },
  
  // Get Current User
  getCurrentUser: async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        return null;
      }
      
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        throw error;
      }
      
      return data.user;
    } catch (error) {
      console.error("Get user error:", error);
      throw error;
    }
  },
};

// User Services
export const userService = {
  // Get User Profile
  getUserProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();
        
      if (error) {
        throw error;
      }
      
      return data as User;
    } catch (error) {
      console.error("Get user profile error:", error);
      throw error;
    }
  },
  
  // Update CricPoints
  updateCricPoints: async (userId: string, points: number) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ cricpoints: points })
        .eq("id", userId)
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      return data as User;
    } catch (error) {
      console.error("Update CricPoints error:", error);
      throw error;
    }
  },
  
  // Update XP Level
  updateXpLevel: async (userId: string, level: number) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ xp_level: level })
        .eq("id", userId)
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      return data as User;
    } catch (error) {
      console.error("Update XP Level error:", error);
      throw error;
    }
  },
};

// Fantasy Team Services
export const fantasyService = {
  // Create Fantasy Team
  createFantasyTeam: async (
    userId: string,
    matchId: string,
    captainId: string,
    viceCaptainId: string,
    playerIds: string[]
  ) => {
    try {
      // First create the team
      const { data: teamData, error: teamError } = await supabase
        .from("fantasy_teams")
        .insert({
          user_id: userId,
          match_id: matchId,
          captain_id: captainId,
          vice_captain_id: viceCaptainId,
        })
        .select()
        .single();
      
      if (teamError) {
        throw teamError;
      }
      
      // Then add the players to the team
      const teamPlayers = playerIds.map(playerId => ({
        fantasy_team_id: teamData.id,
        player_id: playerId,
      }));
      
      const { error: playersError } = await supabase
        .from("fantasy_team_players")
        .insert(teamPlayers);
      
      if (playersError) {
        throw playersError;
      }
      
      toast.success("Fantasy team created successfully!");
      return teamData as FantasyTeam;
    } catch (error) {
      console.error("Create fantasy team error:", error);
      toast.error("Failed to create fantasy team");
      throw error;
    }
  },
  
  // Get User's Fantasy Teams
  getUserFantasyTeams: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("fantasy_teams")
        .select("*")
        .eq("user_id", userId);
        
      if (error) {
        throw error;
      }
      
      return data as FantasyTeam[];
    } catch (error) {
      console.error("Get user fantasy teams error:", error);
      throw error;
    }
  },
  
  // Get Fantasy Team Details (with players)
  getFantasyTeamDetails: async (teamId: string) => {
    try {
      // Get the team first
      const { data: teamData, error: teamError } = await supabase
        .from("fantasy_teams")
        .select("*")
        .eq("id", teamId)
        .single();
      
      if (teamError) {
        throw teamError;
      }
      
      // Get the team players
      const { data: playerData, error: playerError } = await supabase
        .from("fantasy_team_players")
        .select("player_id")
        .eq("fantasy_team_id", teamId);
      
      if (playerError) {
        throw playerError;
      }
      
      // Get player details
      const playerIds = playerData.map(item => item.player_id);
      const { data: players, error: playersError } = await supabase
        .from("players")
        .select("*")
        .in("id", playerIds);
      
      if (playersError) {
        throw playersError;
      }
      
      return {
        ...teamData,
        players: players,
      } as FantasyTeam;
    } catch (error) {
      console.error("Get fantasy team details error:", error);
      throw error;
    }
  },
  
  // Get Fantasy Scores for a Match
  getFantasyScores: async (matchId: string) => {
    try {
      const { data, error } = await supabase
        .from("fantasy_scores")
        .select("*")
        .eq("match_id", matchId);
        
      if (error) {
        throw error;
      }
      
      return data as FantasyScore[];
    } catch (error) {
      console.error("Get fantasy scores error:", error);
      throw error;
    }
  },
};

// Prediction Services
export const predictionService = {
  // Create Prediction
  createPrediction: async (
    userId: string,
    matchId: string,
    question: string,
    selectedOption: string,
    pointsWagered: number
  ) => {
    try {
      // Verify user has enough points
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("cricpoints")
        .eq("id", userId)
        .single();
      
      if (userError) {
        throw userError;
      }
      
      if (userData.cricpoints < pointsWagered) {
        toast.error("Not enough CricPoints for this wager!");
        throw new Error("Insufficient CricPoints");
      }
      
      // Create the prediction
      const { data, error } = await supabase
        .from("predictions")
        .insert({
          user_id: userId,
          match_id: matchId,
          question,
          option_selected: selectedOption,
          points_wagered: pointsWagered,
          points_won: 0, // Will be updated when prediction is resolved
          is_correct: false, // Will be updated when prediction is resolved
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      // Deduct points from user
      await userService.updateCricPoints(
        userId,
        userData.cricpoints - pointsWagered
      );
      
      toast.success("Prediction placed successfully!");
      return data as Prediction;
    } catch (error) {
      console.error("Create prediction error:", error);
      toast.error("Failed to place prediction");
      throw error;
    }
  },
  
  // Get User's Predictions
  getUserPredictions: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .eq("user_id", userId);
        
      if (error) {
        throw error;
      }
      
      return data as Prediction[];
    } catch (error) {
      console.error("Get user predictions error:", error);
      throw error;
    }
  },
};

// Leaderboard Services
export const leaderboardService = {
  // Get Overall Leaderboard
  getOverallLeaderboard: async () => {
    try {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("*, users(username)")
        .order("rank", { ascending: true })
        .limit(100);
        
      if (error) {
        throw error;
      }
      
      // Format the data to include the username
      return data.map(item => ({
        ...item,
        username: item.users?.username,
      })) as LeaderboardEntry[];
    } catch (error) {
      console.error("Get overall leaderboard error:", error);
      throw error;
    }
  },
  
  // Get User's Rank
  getUserRank: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("*")
        .eq("user_id", userId)
        .single();
        
      if (error) {
        throw error;
      }
      
      return data as LeaderboardEntry;
    } catch (error) {
      console.error("Get user rank error:", error);
      throw error;
    }
  },
};

export { supabase };
