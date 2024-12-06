/*
 handles all the auth/login for the app
 basic:
 - staff login: username = 'staff', password = 'vipstaff123'
 - seat login: seat number (1A, 1B) + password 'seat123'
 
 stores the logged in user in localStorage so you stay logged in on refresh
 
 fakes an API call with a timeout
 
 no security implemented yet
*/

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, UserRole } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  //load auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('vip-auth-user');
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true
      });
    }
  }, []);

  const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    //simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let isValid = false;
    let user: User | null = null;

    if (role === 'staff') {
      //validate staff credentials
      if (username === 'staff' && password === 'vipstaff123') {
        isValid = true;
        user = {
          id: 'staff-1',
          role: 'staff',
          username: 'staff'
        };
      }
    } else if (role === 'seat') {
      //for seats, the password is a simple PIN that the staff sets
      const validSeatFormat = /^[1-3][AB]$/.test(username); //1A, 1B, 2A, 2B, 3A, 3B
      if (validSeatFormat && password === 'seat123') { //template password
        isValid = true;
        user = {
          id: `seat-${username}`,
          role: 'seat',
          username: username
        };
      }
    }

    if (isValid && user) {
      setAuthState({
        user,
        isAuthenticated: true
      });
      localStorage.setItem('vip-auth-user', JSON.stringify(user));
      return true;
    }

    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false
    });
    localStorage.removeItem('vip-auth-user');
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};