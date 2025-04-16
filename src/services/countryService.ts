
import { Country } from "@/types";
import { fetchFromApi } from "./apiClient";

export const countryService = {
  // Countries and flags change very rarely - cache for a week
  getAllCountries: () => fetchFromApi<Country[]>("/countries", { offset: 0 }, { ttlMinutes: 10080 }), // 7 days in minutes
  
  // Fallback method for demo/development
  getMockCountries: (): Promise<Country[]> => {
    const mockCountries: Country[] = [
      {
        id: "c1",
        name: "India",
        flag: "https://example.com/flags/india.png"
      },
      {
        id: "c2",
        name: "Australia",
        flag: "https://example.com/flags/australia.png"
      },
      {
        id: "c3",
        name: "England",
        flag: "https://example.com/flags/england.png"
      },
      {
        id: "c4",
        name: "New Zealand",
        flag: "https://example.com/flags/newzealand.png"
      },
      {
        id: "c5",
        name: "Pakistan",
        flag: "https://example.com/flags/pakistan.png"
      }
    ];
    
    return Promise.resolve(mockCountries);
  }
};
