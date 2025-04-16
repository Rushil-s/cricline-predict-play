
import { Series } from "@/types";
import { fetchFromApi } from "./apiClient";

export const seriesService = {
  getAllSeries: () => fetchFromApi<Series[]>("/series", { offset: 0 }, { ttlMinutes: 1440 }), // Cache for 24 hours
  searchSeries: (query: string) => fetchFromApi<Series[]>("/series", { search: query, offset: 0 }, { ttlMinutes: 1440 }), // Cache for 24 hours
  getSeriesInfo: (seriesId: string) => fetchFromApi<{info: Series, matchList: any[]}>(
    "/series_info", 
    { id: seriesId }, 
    { ttlMinutes: 360 } // Cache for 6 hours (2-3x per day refresh)
  ),
  
  // Fallback method for demo/development
  getMockSeries: (): Promise<Series[]> => {
    const mockSeries: Series[] = [
      {
        id: "ipl-2023",
        name: "Indian Premier League 2023",
        startDate: "2023-03-31",
        endDate: "2023-05-28",
        matches: 74,
        status: "ongoing"
      },
      {
        id: "wc-2023",
        name: "ICC Cricket World Cup 2023",
        startDate: "2023-10-05",
        endDate: "2023-11-19",
        matches: 48,
        status: "upcoming"
      }
    ];
    
    return Promise.resolve(mockSeries);
  }
};
