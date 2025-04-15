
import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrganizerCard from '@/components/organizers/OrganizerCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { mockOrganizers } from '@/data/mockOrganizers';

const TopRatedSection = () => {
  const navigate = useNavigate();
  
  // Get top 4 rated organizers
  const topRatedOrganizers = [...mockOrganizers]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Top Rated Organizations</h2>
          <Button variant="link" className="text-primary flex items-center" onClick={() => navigate('/organizers')}>
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topRatedOrganizers.map((organizer) => (
            <OrganizerCard key={organizer.id} {...organizer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedSection;
