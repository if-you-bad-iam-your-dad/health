import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User } from '../types';
import { storage } from '../utils/storage';
import { clearAuthData } from '../utils/auth/logout';
import { DOCTOR_CREDENTIALS } from '../utils/validation/doctorValidation';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: 'admin' | 'patient') => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  age: number;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = storage.get<User>('user');
    return storedUser;
  });

  useEffect(() => {
    if (user) {
      storage.set('user', user);
    } else {
      storage.remove('user');
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string, role: 'admin' | 'patient' = 'patient') => {
    try {
      let mockUser: User;
      
      if (role === 'admin' && email === DOCTOR_CREDENTIALS.email) {
        mockUser = {
          id: 'doctor-1',
          name: DOCTOR_CREDENTIALS.name,
          email: DOCTOR_CREDENTIALS.email,
          age: 42,
          role: 'admin',
          language: 'en',
        };
      } else {
        mockUser = {
          id: 'patient-1',
          name: 'John Doe',
          email,
          age: 35,
          role: 'patient',
          language: 'en',
        };
      }
      
      setUser(mockUser);
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    clearAuthData();
  }, []);

  const register = useCallback(async (userData: RegisterData) => {
    try {
      const mockUser: User = {
        id: '1',
        name: userData.name,
        email: userData.email,
        age: userData.age,
        role: 'patient',
        language: 'en',
      };
      setUser(mockUser);
    } catch (error) {
      throw new Error('Registration failed');
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}