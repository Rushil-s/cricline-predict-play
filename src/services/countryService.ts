
import { Country } from "@/types";
import { fetchFromApi } from "./apiClient";

export const countryService = {
  // Countries and flags change very rarely - cache for a week
  getAllCountries: () => fetchFromApi<Country[]>("/countries", { offset: 0 }, { ttlMinutes: 10080 }), // 7 days in minutes
};
