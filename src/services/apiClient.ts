
// This file is now only a placeholder as we've moved to using Supabase directly
// All API calls should be done through the service files which use Supabase

export const apiClient = {
  get: async () => {
    throw new Error("Direct API calls are no longer supported. Use Supabase services instead.");
  },
  post: async () => {
    throw new Error("Direct API calls are no longer supported. Use Supabase services instead.");
  },
  put: async () => {
    throw new Error("Direct API calls are no longer supported. Use Supabase services instead.");
  },
  delete: async () => {
    throw new Error("Direct API calls are no longer supported. Use Supabase services instead.");
  }
};
