
import { Match } from "@/types";
import { fetchFromApi } from "./apiClient";

export const matchService = {
  // Limited polling (cache for 15 minutes)
  getAllMatches: () => fetchFromApi<Match[]>("/matches", { offset: 0 }, { ttlMinutes: 15 }),
  
  // Higher frequency updates for active matches (cache for 2 minutes)
  getCurrentMatches: () => fetchFromApi<Match[]>("/matches_current", { offset: 0 }, { ttlMinutes: 2 }),
  
  // Match info could be different based on whether it's a live match or not
  getMatchInfo: (matchId: string, isLiveMatch: boolean = false) => fetchFromApi<Match>(
    "/match_info", 
    { id: matchId }, 
    { ttlMinutes: isLiveMatch ? 2 : 60 } // Live matches cache for 2 minutes, others for 1 hour
  ),
};
