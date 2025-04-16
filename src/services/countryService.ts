
import { Country } from "@/types";
import { supabase } from "@/integrations/supabase/client";

export const countryService = {
  getAllCountries: async (): Promise<Country[]> => {
    try {
      const { data, error } = await supabase
        .from('countries')
        .select('*');
        
      if (error) {
        console.error('Error fetching countries:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in getAllCountries:', error);
      return getMockCountries();
    }
  }
};

// Fallback method for development/testing
const getMockCountries = (): Country[] => {
  return [
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
};
