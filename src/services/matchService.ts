
import { Match } from "@/types";
import { fetchFromApi } from "./apiClient";

export const matchService = {
  getAllMatches: () => fetchFromApi<Match[]>("/matches", { offset: 0 }),
  getCurrentMatches: () => fetchFromApi<Match[]>("/matches_current", { offset: 0 }),
  getMatchInfo: (matchId: string) => fetchFromApi<Match>("/match_info", { id: matchId }),
};
