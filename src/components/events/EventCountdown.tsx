
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface EventCountdownProps {
  eventDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EventCountdown = ({ eventDate }: EventCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(eventDate).getTime() - Date.now();
      
      if (difference <= 0) {
        setIsExpired(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      return {
        days,
        hours,
        minutes,
        seconds
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Cleanup on component unmount
    return () => clearInterval(timer);
  }, [eventDate]);
  
  const formatTimeUnit = (value: number) => {
    return value < 10 ? `0${value}` : value.toString();
  };
  
  return (
    <Card className="p-4 border-2 border-primary mb-6">
      {isExpired ? (
        <div className="text-center p-2">
          <p className="text-lg font-bold text-secondary-foreground">This event has already taken place</p>
        </div>
      ) : (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-center">Event begins in:</h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-md p-3">
                <span className="text-2xl font-bold">{formatTimeUnit(timeLeft.days)}</span>
              </div>
              <span className="text-sm mt-1">Days</span>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-md p-3">
                <span className="text-2xl font-bold">{formatTimeUnit(timeLeft.hours)}</span>
              </div>
              <span className="text-sm mt-1">Hours</span>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-md p-3">
                <span className="text-2xl font-bold">{formatTimeUnit(timeLeft.minutes)}</span>
              </div>
              <span className="text-sm mt-1">Minutes</span>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-primary/10 rounded-md p-3">
                <span className="text-2xl font-bold">{formatTimeUnit(timeLeft.seconds)}</span>
              </div>
              <span className="text-sm mt-1">Seconds</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default EventCountdown;
