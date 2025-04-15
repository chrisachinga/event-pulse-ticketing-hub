
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import useCache from '@/hooks/useCache';

// Dummy admin credentials - hardcoded for now
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Regular user credentials
const USER_USERNAME = 'user';
const USER_PASSWORD = 'user123';

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
  const { toast } = useToast();
  const { setCache } = useCache();
  
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
    // Admin login
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const newState = {
        isAuthenticated: true,
        isAdmin: true,
        username,
      };
      setAuthState(newState);
      sessionStorage.setItem('auth', JSON.stringify(newState));
      
      // Cache user data for 48 hours
      setCache(`user_${username}`, { name: 'Admin User', role: 'admin' }, 48);
      
      toast({
        title: "Logged in as Admin",
        description: "Welcome back, Admin!",
      });
      return true;
    } 
    // Regular user login
    else if (username === USER_USERNAME && password === USER_PASSWORD) {
      const newState = {
        isAuthenticated: true,
        isAdmin: false,
        username,
      };
      setAuthState(newState);
      sessionStorage.setItem('auth', JSON.stringify(newState));
      
      // Cache user data for 48 hours
      setCache(`user_${username}`, { name: 'Regular User', role: 'user' }, 48);
      
      toast({
        title: "Logged in",
        description: "Welcome back!",
      });
      return true;
    }
    // Invalid credentials
    else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      isAdmin: false,
      username: null,
    });
    sessionStorage.removeItem('auth');
    navigate('/login');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const requireAuth = (isAdmin: boolean = false) => {
    if (!authState.isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
      toast({
        title: "Authentication required",
        description: "Please login to continue",
        variant: "destructive",
      });
      return false;
    }
    
    if (isAdmin && !authState.isAdmin) {
      navigate('/dashboard');
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
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
