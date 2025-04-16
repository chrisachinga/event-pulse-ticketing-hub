
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCache } from '@/hooks/useCache'; // Using named import

// Test credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';
const USER_EMAIL = 'user@example.com';
const USER_PASSWORD = 'user123';

// Session timeout duration in milliseconds (6 hours)
const SESSION_DURATION = 6 * 60 * 60 * 1000;

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  email: string | null;
  sessionExpiry: number | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    email: null,
    sessionExpiry: null,
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get the required functions from useCache
  const { data, loading, error, refresh } = useCache(
    { key: 'auth_state', ttl: SESSION_DURATION },
    async () => Promise.resolve(null)
  );
  
  // Check for stored session on mount
  useEffect(() => {
    const checkSession = () => {
      const storedAuth = sessionStorage.getItem('auth');
      if (storedAuth) {
        try {
          const parsedAuth = JSON.parse(storedAuth);
          
          // Check if the session is expired
          if (parsedAuth.sessionExpiry && parsedAuth.sessionExpiry > Date.now()) {
            setAuthState(parsedAuth);
            
            // Set up auto-logout when session expires
            const timeUntilExpiry = parsedAuth.sessionExpiry - Date.now();
            if (timeUntilExpiry > 0) {
              const logoutTimer = setTimeout(() => {
                logout();
                toast({
                  title: "Session expired",
                  description: "Your session has expired. Please log in again.",
                  variant: "destructive",
                });
              }, timeUntilExpiry);
              
              // Clean up the timer on component unmount
              return () => clearTimeout(logoutTimer);
            }
          } else {
            // If expired, clear the session
            sessionStorage.removeItem('auth');
          }
        } catch (error) {
          console.error('Error parsing auth state', error);
          sessionStorage.removeItem('auth');
        }
      }
    };
    
    checkSession();
    
    // Set up event listener for user activity to extend session
    const activityEvents = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    
    const handleUserActivity = () => {
      extendSession();
    };
    
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });
    
    // Clean up event listeners
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, []);

  const login = (email: string, password: string): boolean => {
    const sessionExpiry = Date.now() + SESSION_DURATION;
    
    // Admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const newState = {
        isAuthenticated: true,
        isAdmin: true,
        email,
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
    else if (email === USER_EMAIL && password === USER_PASSWORD) {
      const newState = {
        isAuthenticated: true,
        isAdmin: false,
        email,
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
        description: "Invalid email or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      isAdmin: false,
      email: null,
      sessionExpiry: null,
    });
    sessionStorage.removeItem('auth');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    navigate('/login');
  };

  const requireAuth = (isAdminRequired: boolean = false) => {
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
    
    if (isAdminRequired && !authState.isAdmin) {
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
