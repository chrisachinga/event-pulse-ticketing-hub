
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  username: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    username: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing auth in session storage
    const storedAuth = sessionStorage.getItem('auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setAuthState(parsedAuth);
      } catch (error) {
        console.error('Error parsing auth state', error);
        sessionStorage.removeItem('auth');
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Simulating API call
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Admin login
      const newState = {
        isAuthenticated: true,
        isAdmin: true,
        username,
      };
      setAuthState(newState);
      sessionStorage.setItem('auth', JSON.stringify(newState));
      return true;
    } else if (username && password) {
      // Regular user login
      const newState = {
        isAuthenticated: true,
        isAdmin: false,
        username,
      };
      setAuthState(newState);
      sessionStorage.setItem('auth', JSON.stringify(newState));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      isAdmin: false,
      username: null,
    });
    sessionStorage.removeItem('auth');
    navigate('/login');
  };

  const requireAuth = (isAdmin: boolean = false) => {
    if (!authState.isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
      return false;
    }
    
    if (isAdmin && !authState.isAdmin) {
      navigate('/dashboard');
      return false;
    }
    
    return true;
  };

  return {
    ...authState,
    login,
    logout,
    requireAuth,
  };
};

export default useAuth;
