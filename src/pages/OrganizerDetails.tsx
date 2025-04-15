
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventGrid from '@/components/events/EventGrid';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MapPin, Star, LinkIcon, Mail, Phone } from 'lucide-react';
import { mockOrganizers, mockUpcomingEvents, mockPastEvents } from '@/data/mockData';
import RatingDisplay from '@/components/ratings/RatingDisplay';
import RatingInput from '@/components/ratings/RatingInput';

const OrganizerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState(0);
  
  // Find the organizer from mock data
  const organizer = mockOrganizers.find(org => org.id === id) || mockOrganizers[0];
  
  // Filter events by this organizer (in a real app, would come from API)
  const upcomingEvents = mockUpcomingEvents.slice(0, 3);
  const currentEvents = mockUpcomingEvents.slice(3, 5);
  const pastEvents = mockPastEvents.slice(0, 4);

  const handleRatingChange = (value: number) => {
    setRating(value);
    // In a real app, would submit to API
    console.log(`Rated ${organizer.name} with ${value} stars`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Organizer Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="w-32 h-32">
              <AvatarImage src={organizer.imageUrl} alt={organizer.name} />
              <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow text-center md:text-left">
              <div className="mb-2 flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-3xl font-bold">{organizer.name}</h1>
                {organizer.verified && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Verified</span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{organizer.bio}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm">{organizer.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm">Since {organizer.foundedYear}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  <span className="text-sm">{organizer.rating} ({organizer.ratingCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-500" />
                <span>{organizer.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-500" />
                <span>{organizer.phone}</span>
              </div>
              <div className="flex items-center">
                <LinkIcon className="h-5 w-5 mr-2 text-gray-500" />
                <a href={organizer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {organizer.website}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Rating Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2">Ratings & Reviews</h2>
                <RatingDisplay rating={organizer.rating} className="mb-2" />
                <p className="text-sm text-gray-600">{organizer.ratingCount} reviews</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <h3 className="text-sm font-medium mb-2">Rate this {organizer.type}:</h3>
                <RatingInput value={rating} onChange={handleRatingChange} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Events Tabs */}
        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            {upcomingEvents.length > 0 ? (
              <EventGrid events={upcomingEvents} />
            ) : (
              <p className="text-center text-gray-500 py-8">No upcoming events at this time.</p>
            )}
          </TabsContent>
          
          <TabsContent value="current" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Current Events</h2>
            {currentEvents.length > 0 ? (
              <EventGrid events={currentEvents} />
            ) : (
              <p className="text-center text-gray-500 py-8">No events currently running.</p>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Past Events</h2>
            {pastEvents.length > 0 ? (
              <EventGrid events={pastEvents} />
            ) : (
              <p className="text-center text-gray-500 py-8">No past events to display.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default OrganizerDetails;
