
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, userService } from "@/services/supabase";
import type { User } from "@/types";

interface AuthContext {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        setIsLoading(true);
        const session = await authService.getSession();
        
        if (session) {
          const authUser = await authService.getCurrentUser();
          
          if (authUser) {
            const userData = await userService.getUserProfile(authUser.id);
            setUser(userData);
          }
        }
      } catch (err) {
        console.error("Session check error:", err);
        setError("Failed to retrieve user session");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { user: authUser } = await authService.signIn(email, password);
      
      if (authUser) {
        const userData = await userService.getUserProfile(authUser.id);
        setUser(userData);
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err?.message || "Failed to sign in");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await authService.signUp(email, password, username);
      // Note: We don't set the user here because they need to verify email first
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err?.message || "Failed to sign up");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await authService.signOut();
      setUser(null);
    } catch (err: any) {
      console.error("Sign out error:", err);
      setError(err?.message || "Failed to sign out");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
