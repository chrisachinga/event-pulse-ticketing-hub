
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingDisplayProps {
  rating: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const RatingDisplay = ({ rating, className, size = 'md' }: RatingDisplayProps) => {
  const starSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  
  const starSize = starSizes[size];

  return (
    <div className={cn("flex items-center", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            starSize,
            "mr-0.5",
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : star <= rating + 0.5
              ? "fill-yellow-400/50 text-yellow-400"
              : "fill-none text-gray-300"
          )}
        />
      ))}
    </div>
  );
};

export default RatingDisplay;
