
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import RatingDisplay from '@/components/ratings/RatingDisplay';

export interface OrganizerCardProps {
  id: string;
  name: string;
  imageUrl: string;
  type: 'artist' | 'organization';
  location: string;
  foundedYear: string;
  rating: number;
  ratingCount: number;
  totalEvents: number;
  verified?: boolean;
  bio?: string;
  email?: string;
  phone?: string;
  website?: string;
}

const OrganizerCard = ({
  id,
  name,
  imageUrl,
  type,
  location,
  foundedYear,
  rating,
  ratingCount,
  totalEvents,
  verified = false
}: OrganizerCardProps) => {
  return (
    <Link to={`/organizers/${id}`}>
      <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h3 className="font-semibold">{name}</h3>
              {verified && (
                <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200">
                  Verified
                </Badge>
              )}
            </div>
            
            <Badge className="capitalize">
              {type}
            </Badge>
            
            <div className="flex items-center justify-center text-xs text-gray-600">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{location}</span>
            </div>
            
            <div className="flex items-center justify-center text-xs text-gray-600">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Since {foundedYear}</span>
            </div>
            
            <div className="flex items-center justify-center">
              <RatingDisplay rating={rating} size="sm" />
              <span className="text-xs text-gray-600 ml-1">({ratingCount})</span>
            </div>
            
            <div className="text-xs text-gray-600">
              {totalEvents} Events
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default OrganizerCard;
