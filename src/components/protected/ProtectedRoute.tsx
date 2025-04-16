
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ 
  children,
  requireAdmin = false 
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, sessionExpiry } = useAuth();
  const { toast } = useToast();
  
  // Check for session expiration
  const isSessionExpired = sessionExpiry ? sessionExpiry < Date.now() : false;
  
  useEffect(() => {
    // Display message when redirecting due to session expiry
    if (isSessionExpired) {
      toast({
        title: "Session expired",
        description: "Your session has expired. Please log in again.",
        variant: "destructive",
      });
    }
  }, [isSessionExpired, toast]);
  
  if (isSessionExpired || !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  if (requireAdmin && !isAdmin) {
    toast({
      title: "Access denied",
      description: "You don't have permission to access this page",
      variant: "destructive",
    });
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
