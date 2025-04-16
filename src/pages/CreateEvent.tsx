
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to create an event",
        variant: "destructive",
      });
      navigate('/login', { state: { from: '/create-event' } });
    } else if (isAdmin) {
      navigate('/admin/events/create');
    } else {
      navigate('/admin/events/create'); // Regular users can also create events
    }
  }, [isAuthenticated, isAdmin, navigate, toast]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p>Redirecting to event creation page...</p>
      </div>
    </div>
  );
};

export default CreateEvent;
