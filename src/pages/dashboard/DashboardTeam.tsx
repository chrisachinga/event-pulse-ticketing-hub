
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Mail, Phone } from 'lucide-react';

const mockTeamMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+254 712 345 678',
    role: 'Event Manager',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+254 723 456 789',
    role: 'Marketing Specialist',
    avatar: null,
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '+254 734 567 890',
    role: 'Customer Support',
    avatar: null,
  },
];

const DashboardTeam = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-gray-500">Manage your team members</p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark">
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage team members and their roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTeamMembers.map((member) => (
                <div key={member.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar || undefined} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map(name => name[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Email</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                      <span className="sr-only">Call</span>
                    </Button>
                    <Button variant="outline" size="sm">Manage</Button>
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

export default DashboardTeam;
