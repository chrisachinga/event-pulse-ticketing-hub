
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const RatingInput = ({ value, onChange, className, size = 'md' }: RatingInputProps) => {
  const [hoverValue, setHoverValue] = React.useState(0);
  
  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  const starSize = starSizes[size];

  return (
    <div className={cn("flex items-center", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            starSize,
            "mr-0.5 cursor-pointer transition-colors",
            (hoverValue || value) >= star
              ? "fill-yellow-400 text-yellow-400"
              : "fill-none text-gray-300 hover:text-yellow-200"
          )}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
        />
      ))}
    </div>
  );
};

export default RatingInput;
