
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '@/lib/utils';

// Mock data - in a real app would come from API
const eventDetails = {
  id: "1",
  title: "Tech Conference 2025",
  description: "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.",
  date: "2025-06-15T09:00:00",
  endDate: "2025-06-15T17:00:00",
  location: "Tech Hub Center",
  address: "123 Innovation Ave, Silicon Valley, CA",
  imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000",
  isAwardEvent: true,
  ticketTypes: [
    { id: "1", name: "General Admission", price: 1000, available: true },
    { id: "2", name: "VIP", price: 2500, available: true },
    { id: "3", name: "Early Bird", price: 800, available: false }
  ],
  guests: ["John Doe - CEO of TechCorp", "Jane Smith - AI Specialist", "Mike Johnson - Web3 Expert"],
  program: [
    { time: "09:00 AM", description: "Registration and Breakfast" },
    { time: "10:00 AM", description: "Opening Keynote: Future of Technology" },
    { time: "12:00 PM", description: "Lunch Break" },
    { time: "01:00 PM", description: "Workshop Sessions" },
    { time: "05:00 PM", description: "Networking Event" }
  ]
};

const EventDetails = () => {
  const { id } = useParams();
  // In a real app, would fetch event details based on id

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Event Header */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <img 
            src={eventDetails.imageUrl} 
            alt={eventDetails.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold">{eventDetails.title}</h1>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{formatDate(eventDetails.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{formatTime(eventDetails.date)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{eventDetails.location}</span>
                </div>
                {eventDetails.isAwardEvent && (
                  <div className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    <span>Award Event</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-gray-700">{eventDetails.description}</p>
              </CardContent>
            </Card>
            
            {/* Guests */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Guest Speakers</h2>
                <div className="space-y-2">
                  {eventDetails.guests.map((guest, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <Users className="h-5 w-5 text-gray-500" />
                      <span>{guest}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Event Program */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Event Program</h2>
                <div className="space-y-4">
                  {eventDetails.program.map((item, index) => (
                    <div key={index} className="flex border-b border-gray-100 pb-3">
                      <div className="w-24 font-medium">{item.time}</div>
                      <div>{item.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Location */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <p className="mb-4">{eventDetails.address}</p>
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map placeholder - would integrate with OpenStreetMap/Leaflet</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Ticket Information */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Tickets</h2>
                <div className="space-y-4">
                  {eventDetails.ticketTypes.map((ticket) => (
                    <div 
                      key={ticket.id} 
                      className={`p-4 border rounded-lg ${ticket.available ? 'border-gray-200' : 'border-gray-100 bg-gray-50'}`}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{ticket.name}</span>
                        <span>{ticket.price} KES</span>
                      </div>
                      {!ticket.available && (
                        <p className="text-sm text-gray-500 mt-2">Not available</p>
                      )}
                    </div>
                  ))}
                  
                  <Button className="w-full" asChild disabled={!eventDetails.ticketTypes.some(t => t.available)}>
                    <Link to={`/events/${eventDetails.id}/tickets`}>
                      Purchase Tickets
                    </Link>
                  </Button>

                  {eventDetails.isAwardEvent && (
                    <Button variant="outline" className="w-full mt-2" asChild>
                      <Link to={`/vote/${eventDetails.id}`}>
                        Voting Page
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetails;
