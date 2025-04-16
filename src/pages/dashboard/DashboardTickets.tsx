
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockTickets = [
  {
    id: '1',
    eventName: 'Tech Conference 2025',
    purchaseDate: '2025-03-15',
    price: '5000',
    status: 'active'
  },
  {
    id: '2',
    eventName: 'Music Festival',
    purchaseDate: '2025-02-28',
    price: '3500',
    status: 'active'
  },
  {
    id: '3',
    eventName: 'Business Summit',
    purchaseDate: '2025-01-10',
    price: '7500',
    status: 'used'
  }
];

const DashboardTickets = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Tickets</h1>
            <p className="text-gray-500">View and manage your tickets</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search tickets..." className="pl-10" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Tickets</CardTitle>
            <CardDescription>Your purchased tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTickets.map((ticket) => (
                <div key={ticket.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{ticket.eventName}</h3>
                    <p className="text-sm text-gray-500">
                      Purchased on {new Date(ticket.purchaseDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: {ticket.price} KES
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/tickets/${ticket.id}`}>View</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/tickets/${ticket.id}/download`}>Download</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardTickets;
