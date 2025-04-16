
import { Series } from "@/types";
import { fetchFromApi } from "./apiClient";

export const seriesService = {
  getAllSeries: () => fetchFromApi<Series[]>("/series", { offset: 0 }),
  searchSeries: (query: string) => fetchFromApi<Series[]>("/series", { search: query, offset: 0 }),
  getSeriesInfo: (seriesId: string) => fetchFromApi<Series>(`/series_info`, { id: seriesId }),
};
