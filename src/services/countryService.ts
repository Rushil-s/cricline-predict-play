
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
        generic_flag: "https://example.com/flags/india.png",
        fanart_flag: "https://example.com/flags/india-fanart.png"
      },
      {
        id: "c2",
        name: "Australia",
        generic_flag: "https://example.com/flags/australia.png",
        fanart_flag: "https://example.com/flags/australia-fanart.png"
      },
      {
        id: "c3",
        name: "England",
        generic_flag: "https://example.com/flags/england.png",
        fanart_flag: "https://example.com/flags/england-fanart.png"
      },
      {
        id: "c4",
        name: "New Zealand",
        generic_flag: "https://example.com/flags/newzealand.png",
        fanart_flag: "https://example.com/flags/newzealand-fanart.png"
      },
      {
        id: "c5",
        name: "Pakistan",
        generic_flag: "https://example.com/flags/pakistan.png",
        fanart_flag: "https://example.com/flags/pakistan-fanart.png"
      }
    ];
    
    return Promise.resolve(mockCountries);
  }
};
