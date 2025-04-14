
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, Search, Plus, Edit, Trash2, ChevronDown, Users, 
  Activity, DollarSign, CheckSquare, FileText
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

// Mock event data
const mockEvents = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    date: '2025-06-15T09:00:00',
    location: 'Tech Hub Center',
    ticketsSold: 342,
    revenue: 514000,
    checkIns: 305,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Music Festival',
    date: '2025-05-20T18:00:00',
    location: 'Central Park',
    ticketsSold: 1250,
    revenue: 2500000,
    checkIns: 1180,
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Developer Meetup',
    date: '2025-04-30T17:30:00',
    location: 'Co-working Space',
    ticketsSold: 85,
    revenue: 0, // Free event
    checkIns: 62,
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Design Awards 2024',
    date: '2024-12-15T19:00:00',
    location: 'Art Gallery',
    ticketsSold: 220,
    revenue: 330000,
    checkIns: 198,
    status: 'past'
  }
];

const EventManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Filter events based on search term and status filter
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Event Management</h1>
            <p className="text-gray-600">Manage and monitor your events</p>
          </div>
          <Button className="mt-4 sm:mt-0" asChild>
            <a href="/admin/events/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </a>
          </Button>
        </div>
        
        {/* Filters and Search */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="relative sm:col-span-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search events..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="sm:col-span-3">
            <div className="relative">
              <select 
                className="w-full h-10 pl-3 pr-10 border rounded-md appearance-none bg-white"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Events</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="past">Past</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
            </div>
          </div>
          
          <div className="relative sm:col-span-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="date" 
                className="pl-10"
                placeholder="Filter by date"
              />
            </div>
          </div>
        </div>
        
        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 p-6">
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {event.ticketsSold} tickets sold
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/admin/events/${event.id}/edit`}>
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/admin/events/${event.id}/tickets`}>
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            Tickets
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/admin/events/${event.id}/check-in`}>
                            <CheckSquare className="h-3.5 w-3.5 mr-1" />
                            Check-in
                          </a>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-4 bg-gray-50 p-6 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-200">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="flex justify-center">
                            <Users className="h-5 w-5 text-gray-400" />
                          </div>
                          <p className="font-bold mt-1">{event.ticketsSold}</p>
                          <p className="text-xs text-gray-500">Tickets</p>
                        </div>
                        
                        <div>
                          <div className="flex justify-center">
                            <DollarSign className="h-5 w-5 text-gray-400" />
                          </div>
                          <p className="font-bold mt-1">{event.revenue.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Revenue</p>
                        </div>
                        
                        <div>
                          <div className="flex justify-center">
                            <CheckSquare className="h-5 w-5 text-gray-400" />
                          </div>
                          <p className="font-bold mt-1">{event.checkIns}</p>
                          <p className="text-xs text-gray-500">Check-ins</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-center">
                        <Button asChild>
                          <a href={`/admin/events/${event.id}/dashboard`}>
                            <Activity className="h-4 w-4 mr-1" />
                            Analytics
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No events found matching your filters</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EventManagement;
