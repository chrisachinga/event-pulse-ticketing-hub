
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Bell, 
  Mail,
  Check,
  Trash,
  ChevronDown,
  Search,
  AlertCircle,
  Info,
  CheckCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock notifications
const mockNotifications = [
  {
    id: '1',
    title: 'New event registrations',
    message: '15 new registrations for Tech Conference 2025',
    type: 'info',
    read: false,
    date: '2025-04-15T10:30:00',
  },
  {
    id: '2',
    title: 'Event published',
    message: 'Music Festival has been published and is now visible to users',
    type: 'success',
    read: true,
    date: '2025-04-14T15:45:00',
  },
  {
    id: '3',
    title: 'Payment failed',
    message: 'Payment processing failed for Design Awards 2024',
    type: 'error',
    read: false,
    date: '2025-04-13T09:12:00',
  },
  {
    id: '4',
    title: 'Low ticket inventory',
    message: 'Only 15 tickets left for Developer Meetup',
    type: 'warning',
    read: false,
    date: '2025-04-12T18:23:00',
  },
  {
    id: '5',
    title: 'Check-in started',
    message: 'Check-in has started for Business Summit',
    type: 'info',
    read: true,
    date: '2025-04-11T14:30:00',
  },
  {
    id: '6',
    title: 'Event completed',
    message: 'Mobile App Launch Party has ended successfully',
    type: 'success',
    read: true,
    date: '2025-04-10T22:00:00',
  },
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter notifications based on active tab and search term
  const filteredNotifications = mockNotifications
    .filter(notification => {
      if (activeTab === 'all') return true;
      if (activeTab === 'unread') return !notification.read;
      return notification.type === activeTab;
    })
    .filter(notification => {
      if (!searchTerm) return true;
      return (
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-gray-500">View and manage your notifications</p>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <Button variant="outline">
              <Check className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search notifications..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full max-w-lg">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-primary" variant="secondary">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="success">Success</TabsTrigger>
            <TabsTrigger value="error">Alerts</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Notifications List */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`flex items-start p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50/30' : ''}`}
                  >
                    <div className="mr-4">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatDate(notification.date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <div className="ml-4 flex gap-2">
                      {!notification.read && (
                        <Button variant="ghost" size="sm" className="text-gray-500 h-8 w-8 p-0">
                          <span className="sr-only">Mark as read</span>
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="text-gray-500 h-8 w-8 p-0">
                        <span className="sr-only">Delete</span>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto" />
                  <h3 className="mt-2 text-gray-500">No notifications found</h3>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
