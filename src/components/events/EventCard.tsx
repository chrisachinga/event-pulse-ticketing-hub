
import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  isAwardEvent?: boolean;
  ticketPrice?: number;
  isFeatured?: boolean;
}

const EventCard = ({
  id,
  title,
  date,
  location,
  imageUrl,
  isAwardEvent = false,
  ticketPrice,
  isFeatured = false,
}: EventCardProps) => {
  return (
    <Link to={`/events/${id}`} className="group">
      <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 ${isFeatured ? 'border-2 border-primary' : ''}`}>
        <div className="relative">
          <img
            src={imageUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500&auto=format&fit=crop"}
            alt={title}
            className="w-full h-48 object-cover"
          />
          {isFeatured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-primary">Featured</Badge>
            </div>
          )}
          {isAwardEvent && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-warning">Awards</Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span>{formatDate(date)}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span className="line-clamp-1">{location}</span>
            </div>
            <div className="flex items-center justify-between mt-4">
              {ticketPrice !== undefined ? (
                <span className="font-medium">
                  {ticketPrice === 0 ? (
                    <span className="text-success font-semibold">Free</span>
                  ) : (
                    `${ticketPrice} KES`
                  )}
                </span>
              ) : (
                <span>&nbsp;</span>
              )}
              <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                View Details
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
