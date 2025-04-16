
import { ApiResponse, Player, Series, Match, Country } from "@/types";

const API_BASE_URL = "https://api.cricapi.com/v1";
const API_KEY = "463184c6-bb14-4db5-8975-0a34be1087e9";

/**
 * Generic fetch wrapper with error handling
 */
async function fetchFromApi<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
  try {
    const queryParams = new URLSearchParams({
      apikey: API_KEY,
      ...params
    });
    
    const response = await fetch(`${API_BASE_URL}${endpoint}?${queryParams}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.status !== "success") {
      throw new Error(`API Error: ${result.status}`);
    }
    
    return result.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

/**
 * Cricket API Services
 */
export const cricketApi = {
  // Series Related Endpoints
  getAllSeries: () => fetchFromApi<Series[]>("/series", { offset: 0 }),
  searchSeries: (query: string) => fetchFromApi<Series[]>("/series", { search: query, offset: 0 }),
  getSeriesInfo: (seriesId: string) => fetchFromApi<Series>(`/series_info`, { id: seriesId }),
  
  // Match Related Endpoints
  getAllMatches: () => fetchFromApi<Match[]>("/matches", { offset: 0 }),
  getCurrentMatches: () => fetchFromApi<Match[]>("/matches_current", { offset: 0 }),
  getMatchInfo: (matchId: string) => fetchFromApi<Match>("/match_info", { id: matchId }),
  
  // Player Related Endpoints
  getAllPlayers: () => fetchFromApi<Player[]>("/players", { offset: 0 }),
  searchPlayers: (query: string) => fetchFromApi<Player[]>("/players", { search: query, offset: 0 }),
  getPlayerInfo: (playerId: string) => fetchFromApi<Player>("/player_info", { id: playerId }),
  
  // Country Related Endpoints
  getAllCountries: () => fetchFromApi<Country[]>("/countries", { offset: 0 }),
};

export default cricketApi;

