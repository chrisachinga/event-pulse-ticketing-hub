
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/hero/Hero';
import EventGrid from '@/components/events/EventGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockFeaturedEvents, mockAwardEvents, mockUpcomingEvents } from '@/data/mockData';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        {/* Featured Events */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <Link to="/events">
              <Button variant="link" className="text-primary flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <EventGrid events={mockFeaturedEvents} />
        </div>
        
        {/* Award Events */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Award Events</h2>
            <Link to="/awards">
              <Button variant="link" className="text-primary flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <EventGrid events={mockAwardEvents} />
        </div>
        
        {/* Upcoming Events */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Link to="/events">
              <Button variant="link" className="text-primary flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <EventGrid events={mockUpcomingEvents.slice(0, 4)} />
        </div>
        
        {/* Call to Action */}
        <div className="bg-primary/10 rounded-xl p-8 text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Organize Your Own Event</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Create and manage your event with our comprehensive platform. From ticketing to check-ins, we've got you covered.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary-dark" asChild>
              <Link to="/create-event">Create Event</Link>
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
