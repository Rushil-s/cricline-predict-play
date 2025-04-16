
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
    "/players_info", 
    { id: playerId }, 
    { ttlMinutes: 1440 } // Cache for 24 hours
  ),
  
  // Fallback method for demo/development
  getMockPlayers: (): Promise<Player[]> => {
    const mockPlayers: Player[] = [
      {
        id: "p1",
        name: "Virat Kohli",
        country: "India",
        role: "Batsman",
        batting_style: "Right Handed",
        bowling_style: "Right-arm medium",
      },
      {
        id: "p2",
        name: "Jasprit Bumrah",
        country: "India",
        role: "Bowler",
        batting_style: "Right Handed",
        bowling_style: "Right-arm fast",
      },
      {
        id: "p3",
        name: "Kane Williamson",
        country: "New Zealand",
        role: "Batsman",
        batting_style: "Right Handed",
        bowling_style: "Right-arm off break",
      }
    ];
    
    return Promise.resolve(mockPlayers);
  }
};
