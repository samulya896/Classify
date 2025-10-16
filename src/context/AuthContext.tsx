import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiBaseUrl = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080';

  useEffect(() => {
    const storedUser = localStorage.getItem('college_helper_user');
    const storedToken = localStorage.getItem('college_helper_token');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Optionally, we could validate token here by calling backend /auth/me
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) return false;
      const data = await response.json();
      // expected: { token: string, user: User }
      if (!data?.token || !data?.user) return false;
      localStorage.setItem('college_helper_token', data.token);
      localStorage.setItem('college_helper_user', JSON.stringify(data.user));
      setUser(data.user as User);
      return true;
    } catch (_) {
      return false;
    }
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: (userData as any).name,
          email: (userData as any).email,
          password: (userData as any).password,
          course: (userData as any).course,
          year: (userData as any).year,
          semester: (userData as any).semester
        })
      });
      if (!response.ok) return false;
      const data = await response.json();
      // expected: { token: string, user: User }
      if (!data?.token || !data?.user) return false;
      localStorage.setItem('college_helper_token', data.token);
      localStorage.setItem('college_helper_user', JSON.stringify(data.user));
      setUser(data.user as User);
      return true;
    } catch (_) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('college_helper_user');
    localStorage.removeItem('college_helper_token');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('college_helper_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};