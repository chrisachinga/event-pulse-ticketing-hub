
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCache } from '@/hooks/useCache'; // Changed from default import to named import

// Dummy admin credentials - hardcoded for now
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Regular user credentials
const USER_USERNAME = 'user';
const USER_PASSWORD = 'user123';

// Session timeout duration in milliseconds (6 hours)
const SESSION_DURATION = 6 * 60 * 60 * 1000;

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  username: string | null;
  sessionExpiry: number | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    username: null,
    sessionExpiry: null,
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get the required functions from useCache
  const { data, loading, error, refresh } = useCache(
    { key: 'auth_state', ttl: SESSION_DURATION },
    async () => Promise.resolve(null)
  );
  
  useEffect(() => {
    // Check for existing auth in session storage
    const storedAuth = sessionStorage.getItem('auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        
        // Check if the session is expired
        if (parsedAuth.sessionExpiry && parsedAuth.sessionExpiry > Date.now()) {
          setAuthState(parsedAuth);
        } else {
          // If expired, clear the session
          sessionStorage.removeItem('auth');
          console.log('Session expired, please log in again');
        }
      } catch (error) {
        console.error('Error parsing auth state', error);
        sessionStorage.removeItem('auth');
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const sessionExpiry = Date.now() + SESSION_DURATION;
    
    // Admin login
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const newState = {
        isAuthenticated: true,
        isAdmin: true,
        username,
        sessionExpiry,
      };
      setAuthState(newState);
      sessionStorage.setItem('auth', JSON.stringify(newState));
      
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
        sessionExpiry,
      };
      setAuthState(newState);
      sessionStorage.setItem('auth', JSON.stringify(newState));
      
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
      sessionExpiry: null,
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
    
    // Check if session is expired
    if (authState.sessionExpiry && authState.sessionExpiry < Date.now()) {
      logout();
      toast({
        title: "Session expired",
        description: "Your session has expired. Please log in again.",
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

  // Extend session when user is active
  const extendSession = () => {
    if (authState.isAuthenticated) {
      const newExpiry = Date.now() + SESSION_DURATION;
      const updatedState = {
        ...authState,
        sessionExpiry: newExpiry,
      };
      setAuthState(updatedState);
      sessionStorage.setItem('auth', JSON.stringify(updatedState));
    }
  };

  return {
    ...authState,
    login,
    logout,
    requireAuth,
    extendSession,
  };
};

export default useAuth;
