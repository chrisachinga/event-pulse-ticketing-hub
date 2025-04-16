
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, PenTool, Save } from 'lucide-react';

const mockEmailTemplates = [
  { id: '1', name: 'Welcome Email', subject: 'Welcome to our event!' },
  { id: '2', name: 'Event Reminder', subject: 'Your event is coming up soon!' },
  { id: '3', name: 'Feedback Request', subject: 'Please share your feedback' },
];

const mockSentEmails = [
  { id: '1', subject: 'Welcome to Tech Conference', recipients: 45, date: '2025-04-10', openRate: '68%' },
  { id: '2', subject: 'Your tickets for Music Festival', recipients: 120, date: '2025-04-02', openRate: '72%' },
  { id: '3', subject: 'Event feedback needed', recipients: 85, date: '2025-03-25', openRate: '53%' },
];

const DashboardEmail = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Email Marketing</h1>
          <p className="text-gray-500">Send emails to your event attendees</p>
        </div>

        <Tabs defaultValue="compose">
          <TabsList>
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compose" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Compose Email</CardTitle>
                <CardDescription>Create and send an email to your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipients">Recipients</Label>
                    <Input id="recipients" placeholder="Select recipients or segments" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter email subject" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Email Content</Label>
                    <Textarea 
                      id="content" 
                      placeholder="Write your email content here..." 
                      className="min-h-[200px]" 
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" type="button">
                      Save as Draft
                    </Button>
                    <Button type="submit">
                      <Send className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Manage your email templates</CardDescription>
                </div>
                <Button>
                  <PenTool className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEmailTemplates.map((template) => (
                    <div key={template.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-gray-500">{template.subject}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Use</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sent" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Sent Emails</CardTitle>
                <CardDescription>History of emails sent to your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSentEmails.map((email) => (
                    <div key={email.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{email.subject}</h3>
                        <p className="text-sm text-gray-500">
                          Sent to {email.recipients} recipients on {new Date(email.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Open rate: {email.openRate}
                        </p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">View Report</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardEmail;
