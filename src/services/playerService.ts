
import { Player } from "@/types";
import { fetchFromApi } from "./apiClient";

export const playerService = {
  // Players list is very static - cache for 24 hours
  getAllPlayers: () => fetchFromApi<Player[]>("/players", { offset: 0 }, { ttlMinutes: 1440 }),
  
  // Search results can be cached for a moderate time
  searchPlayers: (query: string) => fetchFromApi<Player[]>(
    "/players", 
    { search: query, offset: 0 }, 
    { ttlMinutes: 60 }
  ),
  
  // Player details can be cached longer as they rarely change
  getPlayerInfo: (playerId: string) => fetchFromApi<Player>(
    "/player_info", 
    { id: playerId }, 
    { ttlMinutes: 1440 } // Cache for 24 hours
  ),
};
