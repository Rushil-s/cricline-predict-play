
import { Country } from "@/types";
import { fetchFromApi } from "./apiClient";

export const countryService = {
  getAllCountries: () => fetchFromApi<Country[]>("/countries", { offset: 0 }),
};
