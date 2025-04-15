
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Mail,
  Send,
  Users,
  User,
  Check,
  BarChart,
  Settings,
  FileText
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { mockEvents } from '@/data/mockData';

// Mock email templates
const mockTemplates = [
  { id: '1', name: 'Event Reminder', subject: 'Reminder: Your upcoming event is approaching!' },
  { id: '2', name: 'Thank You', subject: 'Thank you for attending our event' },
  { id: '3', name: 'Ticket Confirmation', subject: 'Your ticket confirmation' },
  { id: '4', name: 'Event Cancellation', subject: 'Important notice: Event cancelled' },
  { id: '5', name: 'Event Update', subject: 'Updates regarding your upcoming event' },
];

// Mock recipient segments
const mockSegments = [
  { id: '1', name: 'All Attendees', count: 342 },
  { id: '2', name: 'VIP Ticket Holders', count: 46 },
  { id: '3', name: 'Early Birds', count: 120 },
  { id: '4', name: 'Standard Ticket', count: 176 },
  { id: '5', name: 'Not Checked In', count: 37 },
];

// Mock sent messages
const mockSentMessages = [
  { 
    id: '1', 
    subject: 'Your tickets for Tech Conference 2025',
    recipients: 'All Attendees',
    sentDate: '2025-04-12T14:30:00',
    openRate: 76,
    clickRate: 42
  },
  { 
    id: '2', 
    subject: 'Important updates about Tech Conference 2025',
    recipients: 'VIP Ticket Holders',
    sentDate: '2025-04-05T09:15:00',
    openRate: 92,
    clickRate: 64
  },
  { 
    id: '3', 
    subject: 'Reminder: Tech Conference 2025 is tomorrow',
    recipients: 'Not Checked In',
    sentDate: '2025-03-28T18:45:00',
    openRate: 68,
    clickRate: 38
  },
];

const MessageCenter = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const event = id ? mockEvents.find(event => event.id === id) : null;
  
  const [messageForm, setMessageForm] = useState({
    subject: '',
    recipients: '',
    content: '',
    template: ''
  });

  const handleTemplateSelect = (templateId: string) => {
    const template = mockTemplates.find(t => t.id === templateId);
    if (template) {
      setMessageForm(prev => ({
        ...prev,
        subject: template.subject,
        template: templateId
      }));
    }
  };

  const handleSendMessage = () => {
    // In a real app, this would send the message to the selected recipients
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${messageForm.recipients}`,
      duration: 5000,
    });
    
    setMessageForm({
      subject: '',
      recipients: '',
      content: '',
      template: ''
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Message Center</h1>
            <p className="text-gray-500">
              {event ? `Send messages to attendees of ${event.title}` : 'Send messages to event attendees'}
            </p>
          </div>
        </div>

        <Tabs defaultValue="compose" className="space-y-6">
          <TabsList>
            <TabsTrigger value="compose">
              <Mail className="h-4 w-4 mr-2" />
              Compose Message
            </TabsTrigger>
            <TabsTrigger value="sent">
              <Send className="h-4 w-4 mr-2" />
              Sent Messages
            </TabsTrigger>
            <TabsTrigger value="templates">
              <FileText className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="compose" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Compose New Message</CardTitle>
                    <CardDescription>
                      Create a message to send to your event attendees
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={messageForm.subject}
                        onChange={(e) => setMessageForm(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Enter message subject"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="template">Use Template</Label>
                      <Select 
                        value={messageForm.template} 
                        onValueChange={handleTemplateSelect}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockTemplates.map(template => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="recipients">Recipients</Label>
                      <Select 
                        value={messageForm.recipients} 
                        onValueChange={(val) => setMessageForm(prev => ({ ...prev, recipients: val }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select recipient group" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockSegments.map(segment => (
                            <SelectItem key={segment.id} value={segment.name}>
                              {segment.name} ({segment.count} attendees)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Message</Label>
                      <Textarea
                        id="content"
                        value={messageForm.content}
                        onChange={(e) => setMessageForm(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Type your message here..."
                        rows={10}
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <Button onClick={handleSendMessage} disabled={!messageForm.recipients || !messageForm.subject || !messageForm.content}>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Recipient Groups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockSegments.map(segment => (
                        <div key={segment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-gray-400 mr-2" />
                            <span>{segment.name}</span>
                          </div>
                          <Badge variant="secondary">{segment.count}</Badge>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="mt-4 w-full">
                      <User className="mr-2 h-4 w-4" />
                      Create New Group
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sent">
            <Card>
              <CardHeader>
                <CardTitle>Sent Messages</CardTitle>
                <CardDescription>
                  History of messages sent to event attendees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSentMessages.map(message => (
                    <Card key={message.id} className="hover:bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">{message.subject}</h3>
                          <span className="text-xs text-gray-500">
                            {new Date(message.sentDate).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{message.recipients}</span>
                        </div>
                        
                        <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center">
                            <div className="flex items-center mr-4">
                              <Mail className="h-4 w-4 text-blue-500 mr-1" />
                              <span className="text-sm font-medium">{message.openRate}% opened</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-sm font-medium">{message.clickRate}% clicked</span>
                            </div>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">
                              <BarChart className="h-4 w-4 mr-1" />
                              View Stats
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>
                  Manage your email templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTemplates.map(template => (
                    <div key={template.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-gray-500">{template.subject}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="mt-6">
                  <FileText className="mr-2 h-4 w-4" />
                  Create New Template
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MessageCenter;
