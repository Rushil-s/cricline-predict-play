
const API_BASE_URL = "https://api.cricapi.com/v1";
const API_KEY = "463184c6-bb14-4db5-8975-0a34be1087e9";

// Simple cache implementation
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class ApiCache {
  private cache: Record<string, CacheItem<any>> = {};
  
  set<T>(key: string, data: T, ttlMinutes: number): void {
    const now = Date.now();
    this.cache[key] = {
      data,
      timestamp: now,
      expiresAt: now + (ttlMinutes * 60 * 1000)
    };
  }
  
  get<T>(key: string): T | null {
    const item = this.cache[key];
    if (!item) return null;
    
    const now = Date.now();
    if (now > item.expiresAt) {
      delete this.cache[key];
      return null;
    }
    
    return item.data as T;
  }
  
  clear(): void {
    this.cache = {};
  }
}

export const apiCache = new ApiCache();

/**
 * Generic fetch wrapper with error handling and caching
 */
export async function fetchFromApi<T>(
  endpoint: string, 
  params: Record<string, any> = {}, 
  cacheOptions?: { ttlMinutes: number }
): Promise<T> {
  try {
    // Create a cache key from the endpoint and params
    const cacheKey = `${endpoint}?${new URLSearchParams(params).toString()}`;
    
    // Check cache first if caching is enabled
    if (cacheOptions) {
      const cachedData = apiCache.get<T>(cacheKey);
      if (cachedData) {
        console.log(`Using cached data for ${endpoint}`);
        return cachedData;
      }
    }
    
    console.log(`Fetching fresh data from API: ${endpoint}`);
    
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
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    
    // Debug log what we got from the API
    console.log(`API response for ${endpoint}:`, result);
    
    if (result.status !== "success") {
      console.error(`API Error: ${result.status} - ${result.info || result.reason || 'Unknown error'}`);
      throw new Error(`API Error: ${result.status} - ${result.info?.message || result.reason || 'Unknown error'}`);
    }
    
    // Store in cache if caching is enabled
    if (cacheOptions) {
      apiCache.set(cacheKey, result.data, cacheOptions.ttlMinutes);
    }
    
    return result.data;
  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error);
    throw error;
  }
}
