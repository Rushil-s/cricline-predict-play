
// This file is kept for backward compatibility but no longer handles direct API calls
// All data is now fetched from Supabase database

export const fetchFromApi = async <T>(
  endpoint: string, 
  params: Record<string, any> = {}, 
  options: { ttlMinutes?: number } = {}
): Promise<T> => {
  console.warn('fetchFromApi is deprecated. Use Supabase services directly instead.');
  throw new Error('Direct API calls are disabled. Use Supabase services instead.');
};
