
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Award, Calendar, Clock, MapPin, ChevronDown, ChevronUp,
  Users, Star, Trophy, Ticket
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockAwardEvents } from '@/data/mockData';

// Mock categories and nominees for award details
const awardDetails = {
  id: '2',
  title: 'Annual Music Awards',
  date: '2025-07-22T18:30:00.000Z',
  location: 'Grand Arena, Mombasa',
  imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  description: 'Join us for the most prestigious music awards ceremony celebrating outstanding achievements in the music industry across East Africa.',
  organizer: 'Entertainment Productions Ltd.',
  categories: [
    {
      id: '1',
      name: 'Best New Artist',
      description: 'Recognizing outstanding achievement by a new artist who has made a significant impact.',
      nominees: [
        { id: '1', name: 'Sarah Kimani', image: 'https://placehold.co/100x100', votes: 245 },
        { id: '2', name: 'The Vibes', image: 'https://placehold.co/100x100', votes: 189 },
        { id: '3', name: 'John Mark', image: 'https://placehold.co/100x100', votes: 302 },
        { id: '4', name: 'Beats Collective', image: 'https://placehold.co/100x100', votes: 178 }
      ]
    },
    {
      id: '2',
      name: 'Album of the Year',
      description: 'Awarded to the artist and production team of a full album.',
      nominees: [
        { id: '5', name: 'Rhythms of Africa', image: 'https://placehold.co/100x100', votes: 356 },
        { id: '6', name: 'Urban Vibes', image: 'https://placehold.co/100x100', votes: 287 },
        { id: '7', name: 'Echoes', image: 'https://placehold.co/100x100', votes: 312 },
        { id: '8', name: 'Sunset Melodies', image: 'https://placehold.co/100x100', votes: 198 }
      ]
    },
    {
      id: '3',
      name: 'Song of the Year',
      description: 'Recognizing exceptional songwriting, production, and performance.',
      nominees: [
        { id: '9', name: 'Summer Dreams', image: 'https://placehold.co/100x100', votes: 412 },
        { id: '10', name: 'City Lights', image: 'https://placehold.co/100x100', votes: 289 },
        { id: '11', name: 'Memories', image: 'https://placehold.co/100x100', votes: 367 },
        { id: '12', name: 'Dancing in the Rain', image: 'https://placehold.co/100x100', votes: 245 }
      ]
    }
  ],
  judges: [
    { name: 'Michael Johnson', title: 'Music Producer', image: 'https://placehold.co/100x100' },
    { name: 'Sophia Ndege', title: 'Radio Presenter', image: 'https://placehold.co/100x100' },
    { name: 'Daniel Mwangi', title: 'Recording Artist', image: 'https://placehold.co/100x100' }
  ],
  schedule: [
    { time: '18:30', event: 'Red Carpet Arrivals' },
    { time: '19:00', event: 'Welcome Address' },
    { time: '19:15', event: 'First Award Category Presentations' },
    { time: '19:45', event: 'Musical Performance' },
    { time: '20:00', event: 'Second Award Category Presentations' },
    { time: '20:30', event: 'Special Recognition Award' },
    { time: '21:00', event: 'Final Award Category Presentations' },
    { time: '21:30', event: 'Closing Ceremony' }
  ],
  ticketTypes: [
    { type: 'Standard', price: 2000, available: true },
    { type: 'VIP', price: 5000, available: true },
    { type: 'VVIP', price: 10000, available: true }
  ]
};

const AwardDetails = () => {
  const { id } = useParams();
  const [expandedSection, setExpandedSection] = useState<string | null>('categories');

  // In a real app, would fetch event details based on id
  const awardEvent = awardDetails; // Normally would filter from mockAwardEvents based on ID

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <img 
            src={awardEvent.imageUrl} 
            alt={awardEvent.title} 
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white p-6 max-w-4xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{awardEvent.title}</h1>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(awardEvent.date).toLocaleDateString('en-US', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{new Date(awardEvent.date).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true
                  })}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{awardEvent.location}</span>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <Link to={`/events/${awardEvent.id}/tickets`}>Get Tickets</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/20" asChild>
                  <Link to={`/vote/${awardEvent.id}`}>Vote Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About This Award</h2>
                <p className="text-gray-700 mb-4">{awardEvent.description}</p>
                <p className="text-gray-700">Organized by: {awardEvent.organizer}</p>
              </CardContent>
            </Card>
            
            {/* Categories Section */}
            <Card>
              <div 
                className="p-6 flex justify-between items-center cursor-pointer border-b"
                onClick={() => toggleSection('categories')}
              >
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 mr-3" />
                  <h2 className="text-2xl font-bold">Award Categories</h2>
                </div>
                {expandedSection === 'categories' ? <ChevronUp /> : <ChevronDown />}
              </div>
              
              {expandedSection === 'categories' && (
                <CardContent className="p-6">
                  <div className="space-y-8">
                    {awardEvent.categories.map((category) => (
                      <div key={category.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                        <p className="text-gray-600 mb-4">{category.description}</p>
                        
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Users className="h-4 w-4 mr-2" /> Nominees
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {category.nominees.map((nominee) => (
                            <div key={nominee.id} className="flex items-center p-3 border rounded-lg">
                              <img 
                                src={nominee.image} 
                                alt={nominee.name} 
                                className="w-12 h-12 rounded-full object-cover mr-4" 
                              />
                              <div>
                                <p className="font-medium">{nominee.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
            
            {/* Judges Section */}
            <Card>
              <div 
                className="p-6 flex justify-between items-center cursor-pointer border-b"
                onClick={() => toggleSection('judges')}
              >
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-3" />
                  <h2 className="text-2xl font-bold">Judges</h2>
                </div>
                {expandedSection === 'judges' ? <ChevronUp /> : <ChevronDown />}
              </div>
              
              {expandedSection === 'judges' && (
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {awardEvent.judges.map((judge, idx) => (
                      <div key={idx} className="text-center">
                        <img 
                          src={judge.image} 
                          alt={judge.name} 
                          className="w-24 h-24 rounded-full object-cover mx-auto mb-3" 
                        />
                        <p className="font-bold">{judge.name}</p>
                        <p className="text-gray-600 text-sm">{judge.title}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
            
            {/* Schedule Section */}
            <Card>
              <div 
                className="p-6 flex justify-between items-center cursor-pointer border-b"
                onClick={() => toggleSection('schedule')}
              >
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3" />
                  <h2 className="text-2xl font-bold">Event Schedule</h2>
                </div>
                {expandedSection === 'schedule' ? <ChevronUp /> : <ChevronDown />}
              </div>
              
              {expandedSection === 'schedule' && (
                <CardContent className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Activity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {awardEvent.schedule.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{item.time}</TableCell>
                          <TableCell>{item.event}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              )}
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Ticket className="h-5 w-5 mr-2" /> Ticket Information
                </h3>
                <div className="space-y-4">
                  {awardEvent.ticketTypes.map((ticket, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{ticket.type}</p>
                        <p className="text-gray-600">{ticket.price} KES</p>
                      </div>
                      <Button size="sm" disabled={!ticket.available}>
                        {ticket.available ? 'Buy Now' : 'Sold Out'}
                      </Button>
                    </div>
                  ))}
                  <Button className="w-full" asChild>
                    <Link to={`/events/${awardEvent.id}/tickets`}>View All Tickets</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Voting Information */}
            <Card className="bg-black text-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-bold">Cast Your Vote</h3>
                </div>
                <p className="mb-4">
                  Support your favorite nominees by voting in this award ceremony. Voting packages start at just 50 KES.
                </p>
                <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-black" asChild>
                  <Link to={`/vote/${awardEvent.id}`}>Vote Now</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Share Event */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Share Event</h3>
                <div className="flex justify-between">
                  <Button variant="outline" size="icon">
                    F
                  </Button>
                  <Button variant="outline" size="icon">
                    T
                  </Button>
                  <Button variant="outline" size="icon">
                    I
                  </Button>
                  <Button variant="outline" size="icon">
                    W
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AwardDetails;
