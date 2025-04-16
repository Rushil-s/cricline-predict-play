
import { Player } from "@/types";
import { fetchFromApi } from "./apiClient";

export const playerService = {
  getAllPlayers: () => fetchFromApi<Player[]>("/players", { offset: 0 }),
  searchPlayers: (query: string) => fetchFromApi<Player[]>("/players", { search: query, offset: 0 }),
  getPlayerInfo: (playerId: string) => fetchFromApi<Player>("/player_info", { id: playerId }),
};
