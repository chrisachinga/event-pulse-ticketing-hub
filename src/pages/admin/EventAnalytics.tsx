import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronDown, Ticket, DollarSign, Users, Clock, 
  UserCircle2, User
} from 'lucide-react';

const eventData = {
  id: "1",
  title: "Tech Conference 2025",
  date: "2025-06-15T09:00:00",
  location: "Tech Hub Center",
  stats: {
    totalTickets: 342,
    ticketsSold: 287,
    totalRevenue: 514000,
    checkedIn: 157
  },
  demographics: {
    gender: [
      { name: "Male", value: 160 },
      { name: "Female", value: 120 },
      { name: "Other", value: 7 }
    ],
    ticketTypes: [
      { name: "General Admission", value: 187 },
      { name: "VIP", value: 52 },
      { name: "Early Bird", value: 48 }
    ]
  },
  salesOverTime: [
    { date: "2025-03-01", tickets: 25, revenue: 50000 },
    { date: "2025-03-08", tickets: 42, revenue: 84000 },
    { date: "2025-03-15", tickets: 38, revenue: 76000 },
    { date: "2025-03-22", tickets: 65, revenue: 130000 },
    { date: "2025-03-29", tickets: 48, revenue: 96000 },
    { date: "2025-04-05", tickets: 69, revenue: 78000 }
  ],
  checkInData: {
    total: 157,
    timeline: [
      { time: "8:00 AM", count: 12 },
      { time: "9:00 AM", count: 32 },
      { time: "10:00 AM", count: 45 },
      { time: "11:00 AM", count: 28 },
      { time: "12:00 PM", count: 18 },
      { time: "1:00 PM", count: 22 }
    ]
  }
};

const EventAnalytics = () => {
  const { id } = useParams();
  
  const totalAttendees = eventData.demographics.gender.reduce((sum, item) => sum + item.value, 0);
  const malePercentage = Math.round((eventData.demographics.gender[0].value / totalAttendees) * 100);
  const femalePercentage = Math.round((eventData.demographics.gender[1].value / totalAttendees) * 100);
  const otherPercentage = 100 - malePercentage - femalePercentage;

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{eventData.title} - Analytics</h1>
            <p className="text-gray-600">Event performance and attendance metrics</p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Date range:</span>
              <div className="relative">
                <select className="h-9 pl-3 pr-10 border rounded-md appearance-none bg-white text-sm">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>All time</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">Tickets Sold</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {eventData.stats.ticketsSold}
                    <span className="text-sm text-gray-500 ml-1">/ {eventData.stats.totalTickets}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((eventData.stats.ticketsSold / eventData.stats.totalTickets) * 100)}% of total
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Ticket className="h-5 w-5 text-gray-600" />
                </div>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4">
                <div className="bg-black h-1.5 rounded-full" 
                  style={{ width: `${(eventData.stats.ticketsSold / eventData.stats.totalTickets) * 100}%` }} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {eventData.stats.totalRevenue.toLocaleString()} KES
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    ~{Math.round(eventData.stats.totalRevenue / eventData.stats.ticketsSold).toLocaleString()} KES per ticket
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">Check-ins</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {eventData.stats.checkedIn}
                    <span className="text-sm text-gray-500 ml-1">/ {eventData.stats.ticketsSold}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((eventData.stats.checkedIn / eventData.stats.ticketsSold) * 100)}% attendance rate
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4">
                <div className="bg-black h-1.5 rounded-full" 
                  style={{ width: `${(eventData.stats.checkedIn / eventData.stats.ticketsSold) * 100}%` }} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">Days Until Event</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {Math.ceil((new Date(eventData.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(eventData.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-6">Gender Demographics</h3>
              <div className="flex justify-around mb-4">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                    <UserCircle2 className="h-8 w-8 text-gray-600" />
                  </div>
                  <p className="font-bold mt-2">{malePercentage}%</p>
                  <p className="text-xs text-gray-500">Male</p>
                  <p className="text-xs">{eventData.demographics.gender[0].value} attendees</p>
                </div>
                
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                    <User className="h-8 w-8 text-gray-600" />
                  </div>
                  <p className="font-bold mt-2">{femalePercentage}%</p>
                  <p className="text-xs text-gray-500">Female</p>
                  <p className="text-xs">{eventData.demographics.gender[1].value} attendees</p>
                </div>
                
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8 text-gray-600" />
                  </div>
                  <p className="font-bold mt-2">{otherPercentage}%</p>
                  <p className="text-xs text-gray-500">Other</p>
                  <p className="text-xs">{eventData.demographics.gender[2].value} attendees</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Ticket Types</h3>
              <div className="space-y-4">
                {eventData.demographics.ticketTypes.map((type, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{type.name}</span>
                      <span className="font-medium">{type.value}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full">
                      <div 
                        className="bg-black h-2 rounded-full" 
                        style={{ 
                          width: `${(type.value / eventData.stats.ticketsSold) * 100}%` 
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Distribution of ticket types across all sales
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Check-in Timeline</h3>
              <div className="h-48 flex items-end justify-between">
                {eventData.checkInData.timeline.map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-4/5 bg-black rounded-t"
                      style={{ 
                        height: `${(item.count / Math.max(...eventData.checkInData.timeline.map(i => i.count))) * 100}%` 
                      }}
                    />
                    <span className="text-xs mt-1 text-gray-500">{item.time.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Number of check-ins by time of day
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-6">Sales Performance</h3>
            <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Sales chart would render here using recharts</p>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Weekly ticket sales and revenue over time
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EventAnalytics;
