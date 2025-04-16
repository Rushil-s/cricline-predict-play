
import { ApiResponse, Player, Series, Match, Country } from "@/types";

const API_BASE_URL = "https://cricketdata.org";
const API_KEY = "e43d7256-87da-4703-977c-20731f3ff829";

/**
 * Generic fetch wrapper with error handling
 */
async function fetchFromApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Api-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const result: ApiResponse<T> = await response.json();
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
  // Player Related Endpoints
  getAllPlayers: () => fetchFromApi<Player[]>("/api/v1/players/all-players"),
  getPlayerById: (playerId: string) => fetchFromApi<Player>(`/api/v1/players/${playerId}`),
  
  // Series Related Endpoints
  getAllSeries: () => fetchFromApi<Series[]>("/api/v1/series"),
  getSeriesById: (seriesId: string) => fetchFromApi<Series>(`/api/v1/series/${seriesId}`),
  getSeriesInfo: (seriesId: string) => fetchFromApi<any>(`/api/v1/series/${seriesId}/info`),
  
  // Match Related Endpoints
  getMatchById: (matchId: string) => fetchFromApi<Match>(`/api/v1/match/${matchId}`),
  getMatchInfo: (matchId: string) => fetchFromApi<any>(`/api/v1/match/${matchId}/info`),
  getMatchSquad: (matchId: string) => fetchFromApi<Player[]>(`/api/v1/match/${matchId}/squad`),
  getMatchScore: (matchId: string) => fetchFromApi<any>(`/api/v1/match/${matchId}/score`),
  
  // Country Related Endpoints
  getAllCountries: () => fetchFromApi<Country[]>("/api/v1/countries"),
};

export default cricketApi;
