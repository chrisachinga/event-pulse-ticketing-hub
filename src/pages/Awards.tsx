
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import EventCard from '@/components/events/EventCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Calendar, Trophy } from 'lucide-react';
import { mockAwardEvents } from '@/data/mockData';

const Awards = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-8 bg-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Award Events</h1>
              <div className="flex items-center justify-center">
                <Trophy className="h-5 w-5 mr-2" />
                <span>Celebrating excellence across industries</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="all">All Awards</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockAwardEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockAwardEvents.filter(event => new Date(event.date) > new Date()).map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockAwardEvents.filter(event => new Date(event.date) < new Date()).map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 mr-2 text-black" />
              <h2 className="text-xl font-bold">About Our Award Events</h2>
            </div>
            <p className="mb-4 text-gray-700">
              Our award events celebrate excellence across various industries, recognizing outstanding achievements and innovations. These prestigious ceremonies bring together the best talents and provide a platform for networking and celebration.
            </p>
            <p className="text-gray-700">
              From design and technology to music and film, our award shows spotlight the remarkable work that shapes our industries and inspires future generations.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 mr-2 text-black" />
              <h2 className="text-xl font-bold">Award Event Calendar</h2>
            </div>
            <ul className="space-y-4">
              {mockAwardEvents.map((event) => (
                <li key={event.id} className="pb-4 border-b last:border-b-0">
                  <p className="font-bold">{event.title}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                  <Button size="sm" variant="outline" className="mt-2" asChild>
                    <Link to={`/events/${event.id}`}>Details</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-black text-white p-8 rounded-lg text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Interested in Organizing an Award Event?</h2>
          <p className="mb-6 max-w-3xl mx-auto">
            We provide comprehensive solutions for award ceremonies, from nominee management to voting systems and event hosting.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Awards;
