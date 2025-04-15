
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import OrganizerCard from '@/components/organizers/OrganizerCard';
import { mockOrganizers } from '@/data/mockData';

const Organizers = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Event Organizers</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <Input 
              className="pl-10"
              placeholder="Search organizers or artists..."
            />
          </div>
        </div>
        
        {/* Organizer Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="organizers">Organizations</TabsTrigger>
            <TabsTrigger value="artists">Artists</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockOrganizers.map(organizer => (
                <OrganizerCard key={organizer.id} {...organizer} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="organizers" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockOrganizers.filter(org => org.type === 'organization').map(organizer => (
                <OrganizerCard key={organizer.id} {...organizer} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="artists" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockOrganizers.filter(org => org.type === 'artist').map(organizer => (
                <OrganizerCard key={organizer.id} {...organizer} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Organizers;
