// ============================================================
// Authentication Context + helpers
// Now uses the Python backend + Supabase for auth.
// Stores the Supabase access_token + refresh_token in localStorage.
// ============================================================

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const STORAGE_KEY = 'cognicook_user';
const TOKEN_KEY = 'cognicook_token';
const REFRESH_KEY = 'cognicook_refresh';

// ── Stored user shape ────────────────────────────────────────────
// We now store Supabase user info + tokens instead of plain password.

export interface StoredUser {
  id: string;
  name: string;
  email: string;
}

// ── Token helpers ────────────────────────────────────────────────

/** Get the Supabase access_token from localStorage */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/** Save tokens returned by Supabase login/signup */
export const saveTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
};

/** Remove tokens */
export const clearTokens = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

// ── User helpers ─────────────────────────────────────────────────

export const getStoredUser = (): StoredUser | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const saveUser = (user: StoredUser): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const clearUser = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Returns the stored user's first name, or null if not logged in.
 */
export const getUserName = (): string | null => {
  const user = getStoredUser();
  return user?.name?.split(' ')[0] || null;
};

// ── React Context for reactive auth state ────────────────────────

interface AuthContextType {
  isLoggedIn: boolean;
  userName: string | null;
  login: (user: StoredUser, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Check if we have both a user AND a token
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return getStoredUser() !== null && getAccessToken() !== null;
  });
  const [userName, setUserName] = useState<string | null>(() => getUserName());

  const login = (user: StoredUser, accessToken: string, refreshToken: string) => {
    // Save user info + Supabase tokens to localStorage
    saveUser(user);
    saveTokens(accessToken, refreshToken);
    setIsLoggedIn(true);
    setUserName(user.name?.split(' ')[0] || null);
  };

  const logout = () => {
    clearUser();
    clearTokens();
    setIsLoggedIn(false);
    setUserName(null);
  };

  // Sync across tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === TOKEN_KEY) {
        setIsLoggedIn(getStoredUser() !== null && getAccessToken() !== null);
        setUserName(getUserName());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}