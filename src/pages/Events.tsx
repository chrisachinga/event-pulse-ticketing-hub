
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import EventGrid from '@/components/events/EventGrid';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockFeaturedEvents, mockUpcomingEvents, mockPastEvents } from '@/data/mockData';

const Events = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Events</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <Input 
              className="pl-10"
              placeholder="Search events by name, location, or date..."
            />
          </div>
        </div>
        
        {/* Event Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <EventGrid events={[...mockFeaturedEvents, ...mockUpcomingEvents]} />
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-6">
            <EventGrid events={mockUpcomingEvents} />
          </TabsContent>
          
          <TabsContent value="past" className="mt-6">
            <EventGrid events={mockPastEvents} />
          </TabsContent>
        </Tabs>
        
        {/* Featured Events Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Featured Events</h2>
            <Button variant="link" asChild>
              <Link to="/featured">View All</Link>
            </Button>
          </div>
          <EventGrid events={mockFeaturedEvents.slice(0, 4)} />
        </div>
        
        {/* Award Events Promo */}
        <div className="bg-primary/10 rounded-lg p-6 mb-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Discover Award Events</h2>
          <p className="mb-4 max-w-2xl mx-auto">Celebrate excellence at our prestigious award ceremonies recognizing outstanding achievements across industries.</p>
          <Button asChild>
            <Link to="/awards">Browse Award Events</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Events;
