
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
};
