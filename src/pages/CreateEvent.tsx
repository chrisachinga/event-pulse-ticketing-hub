
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const CreateEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to create an event",
        variant: "destructive",
      });
      navigate('/login', { state: { from: location.pathname } });
    } else {
      // Both admin and regular users can create events
      navigate('/dashboard/events');
      toast({
        title: "Create Event",
        description: "You can create your event from the dashboard",
      });
    }
  }, [isAuthenticated, isAdmin, navigate, toast, location]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p>Redirecting to event creation page...</p>
      </div>
    </div>
  );
};

export default CreateEvent;
