
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consentGiven = localStorage.getItem('cookieConsent');
    
    // Show after a short delay if consent not given
    if (!consentGiven) {
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <Dialog open={showConsent} onOpenChange={setShowConsent}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cookie Policy</DialogTitle>
          <Button 
            variant="ghost" 
            className="absolute right-4 top-4 rounded-sm opacity-70" 
            onClick={() => setShowConsent(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="text-sm">
          <p className="mb-2">
            We use cookies to enhance your experience on our website. By continuing to browse our site, 
            you agree to our use of cookies.
          </p>
          <p>
            We collect data to analyze site usage, personalize content, and deliver targeted advertisements.
            You can control your cookie preferences at any time from your account settings.
          </p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
          <Button 
            variant="outline" 
            onClick={handleDecline}
          >
            Decline Optional Cookies
          </Button>
          <Button onClick={handleAccept}>Accept All</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookieConsent;
