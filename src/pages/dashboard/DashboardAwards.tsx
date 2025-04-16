
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award, Clock } from 'lucide-react';

const mockAwards = [
  {
    id: '1',
    title: 'Best Music Festival 2024',
    category: 'Events',
    status: 'nominee'
  },
  {
    id: '2',
    title: 'Outstanding Event Organization',
    category: 'Organization',
    status: 'winner'
  },
  {
    id: '3',
    title: 'Customer Experience Award',
    category: 'Service',
    status: 'pending'
  }
];

const DashboardAwards = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Awards</h1>
            <p className="text-gray-500">View nominations and awards</p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark" asChild>
            <Link to="/awards">Browse All Awards</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Awards</CardTitle>
            <CardDescription>Awards and nominations related to your events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAwards.map((award) => (
                <div key={award.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{award.title}</h3>
                      <p className="text-sm text-gray-500">
                        Category: {award.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      award.status === 'winner' 
                        ? 'bg-green-100 text-green-800' 
                        : award.status === 'nominee' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {award.status.charAt(0).toUpperCase() + award.status.slice(1)}
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/awards/${award.id}`}>Details</Link>
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

export default DashboardAwards;
