import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (userData: Omit<User, 'id'> & { password: string }) => boolean;
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

  useEffect(() => {
    const storedUser = localStorage.getItem('college_helper_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    // Mock authentication - in real app, this would call an API
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        course: 'Computer Science',
        year: '3',
        semester: '6'
      };
      setUser(mockUser);
      localStorage.setItem('college_helper_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const signup = (userData: Omit<User, 'id'> & { password: string }): boolean => {
    // Mock signup - in real app, this would call an API
    if (userData.email && userData.password) {
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        course: userData.course,
        year: userData.year,
        semester: userData.semester
      };
      setUser(newUser);
      localStorage.setItem('college_helper_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('college_helper_user');
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