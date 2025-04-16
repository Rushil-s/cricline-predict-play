
const API_BASE_URL = "https://api.cricapi.com/v1";
const API_KEY = "463184c6-bb14-4db5-8975-0a34be1087e9";

/**
 * Generic fetch wrapper with error handling
 */
export async function fetchFromApi<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
  try {
    const queryParams = new URLSearchParams({
      apikey: API_KEY,
      ...params
    });
    
    const response = await fetch(`${API_BASE_URL}${endpoint}?${queryParams}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.status !== "success") {
      throw new Error(`API Error: ${result.status}`);
    }
    
    return result.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
