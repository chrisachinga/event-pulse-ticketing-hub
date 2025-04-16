
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { mockEvents } from '@/data/mockData';

const DashboardEvents = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Events</h1>
            <p className="text-gray-500">Manage your events</p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark">
            <Link to="/admin/events/create">Create New Event</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Events</CardTitle>
            <CardDescription>View and manage all your events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEvents.map((event) => (
                <div key={event.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded overflow-hidden">
                      <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/events/${event.id}`}>View</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/admin/events/${event.id}/edit`}>Edit</Link>
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

export default DashboardEvents;
