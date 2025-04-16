
import { Match } from "@/types";
import { fetchFromApi } from "./apiClient";

export const matchService = {
  // Limited polling (cache for 15 minutes)
  getAllMatches: () => fetchFromApi<Match[]>("/matches", { offset: 0 }, { ttlMinutes: 15 }),
  
  // Higher frequency updates for active matches (cache for 2 minutes)
  getCurrentMatches: () => fetchFromApi<Match[]>("/currentMatches", { offset: 0 }, { ttlMinutes: 2 }),
  
  // Match info could be different based on whether it's a live match or not
  getMatchInfo: (matchId: string, isLiveMatch: boolean = false) => fetchFromApi<Match>(
    "/match_info", 
    { id: matchId }, 
    { ttlMinutes: isLiveMatch ? 2 : 60 } // Live matches cache for 2 minutes, others for 1 hour
  ),
  
  // Fallback method for demo/development
  getMockMatches: (): Promise<Match[]> => {
    const mockMatches: Match[] = [
      {
        id: "1",
        series_id: "ipl-2023",
        name: "Mumbai Indians vs Chennai Super Kings",
        status: "live",
        match_type: "T20",
        venue: "Wankhede Stadium, Mumbai",
        date: new Date().toISOString(),
        team_a: "Mumbai Indians",
        team_b: "Chennai Super Kings",
        score: {
          team_a: "120/4 (15.2 ov)",
          team_b: "Yet to bat"
        },
        fantasy_enabled: true
      },
      {
        id: "2",
        series_id: "ipl-2023",
        name: "Royal Challengers Bangalore vs Kolkata Knight Riders",
        status: "upcoming",
        match_type: "T20",
        venue: "M. Chinnaswamy Stadium, Bangalore",
        date: new Date(Date.now() + 86400000).toISOString(),
        team_a: "Royal Challengers",
        team_b: "Kolkata Knight Riders",
        fantasy_enabled: true
      },
      {
        id: "3",
        series_id: "ipl-2023",
        name: "Delhi Capitals vs Rajasthan Royals",
        status: "upcoming",
        match_type: "T20",
        venue: "Arun Jaitley Stadium, Delhi",
        date: new Date(Date.now() + 172800000).toISOString(),
        team_a: "Delhi Capitals",
        team_b: "Rajasthan Royals",
        fantasy_enabled: true
      },
      {
        id: "4",
        series_id: "wc-2023",
        name: "India vs Australia",
        status: "upcoming",
        match_type: "ODI",
        venue: "Melbourne Cricket Ground, Australia",
        date: new Date(Date.now() + 259200000).toISOString(),
        team_a: "India",
        team_b: "Australia",
        fantasy_enabled: true
      }
    ];
    
    return Promise.resolve(mockMatches);
  }
};
