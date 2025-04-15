
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useParams } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';
import { 
  Send, 
  Filter, 
  Search, 
  Users, 
  Mail, 
  Clock, 
  CheckCircle,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge'; // Import the Badge component

// Mock data for messages
const mockMessages = [
  {
    id: '1',
    sender: 'System',
    avatar: 'S',
    content: 'All attendees have been notified about the venue change.',
    timestamp: '2023-09-15T10:30:00Z',
    isRead: true,
    isEmail: false,
    category: 'announcement'
  },
  {
    id: '2',
    sender: 'support@ticketapp.com',
    avatar: 'T',
    content: 'We\'ve processed your request for additional ticket allocation.',
    timestamp: '2023-09-14T15:45:00Z',
    isRead: true,
    isEmail: true,
    category: 'support'
  },
  {
    id: '3',
    sender: 'john.doe@example.com',
    avatar: 'J',
    content: 'Is there a vegetarian food option available at the event?',
    timestamp: '2023-09-14T12:20:00Z',
    isRead: false,
    isEmail: true,
    category: 'attendee'
  },
  {
    id: '4',
    sender: 'Another Organizer',
    avatar: 'A',
    content: 'Can we collaborate on the upcoming music festival?',
    timestamp: '2023-09-13T18:05:00Z',
    isRead: false,
    isEmail: false,
    category: 'organizer'
  },
  // Add more mock messages as needed
];

// Mock contacts for mass messaging
const mockContacts = [
  {
    id: '1',
    name: 'All Attendees',
    type: 'group',
    count: 120,
  },
  {
    id: '2',
    name: 'VIP Ticket Holders',
    type: 'group',
    count: 25,
  },
  {
    id: '3',
    name: 'Regular Ticket Holders',
    type: 'group',
    count: 95,
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john.smith@example.com',
    type: 'individual',
  },
  {
    id: '5',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    type: 'individual',
  },
  // Add more mock contacts as needed
];

// Mock templates for messaging
const mockTemplates = [
  {
    id: '1',
    name: 'Event Reminder',
    subject: 'Reminder: Your Event is Tomorrow!',
    content: 'Dear {name},\n\nThis is a friendly reminder that {event_name} is happening tomorrow at {time} in {venue}.\n\nWe look forward to seeing you there!\n\nBest regards,\nThe Organizer Team'
  },
  {
    id: '2',
    name: 'Venue Change Notice',
    subject: 'Important: Venue Change for {event_name}',
    content: 'Dear {name},\n\nWe would like to inform you that the venue for {event_name} has been changed to {new_venue}.\n\nWe apologize for any inconvenience caused.\n\nBest regards,\nThe Organizer Team'
  },
  {
    id: '3',
    name: 'Post-Event Thank You',
    subject: 'Thank You for Attending {event_name}',
    content: 'Dear {name},\n\nThank you for attending {event_name}. We hope you had a great time!\n\nWe would appreciate your feedback on the event. Please take a moment to fill out our survey: {survey_link}\n\nBest regards,\nThe Organizer Team'
  },
  // Add more mock templates as needed
];

const MessageCenter = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('inbox');
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // For compose tab
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Get message by id
  const getMessage = (messageId: string) => {
    return mockMessages.find(msg => msg.id === messageId) || null;
  };

  // Handle message selection
  const handleMessageClick = (messageId: string) => {
    setActiveMessage(messageId);
    const message = getMessage(messageId);
    // In a real app, mark message as read here
  };

  // Handle reply submission
  const handleReply = () => {
    if (!replyText.trim()) return;
    
    // In a real app, send reply here
    toast({
      title: 'Reply Sent',
      description: 'Your message has been sent successfully.',
    });
    
    setReplyText('');
  };

  // Handle send to contacts
  const handleSendMessage = () => {
    if (!composeSubject.trim() || !composeBody.trim() || selectedContacts.length === 0) {
      toast({
        title: 'Cannot Send',
        description: 'Please fill all fields and select recipients.',
        variant: 'destructive',
      });
      return;
    }
    
    // In a real app, send message to selected contacts here
    toast({
      title: 'Message Sent',
      description: `Message sent to ${selectedContacts.length} recipient(s).`,
    });
    
    // Reset fields
    setSelectedContacts([]);
    setComposeSubject('');
    setComposeBody('');
    setSelectedTemplate(null);
  };

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    const template = mockTemplates.find(t => t.id === templateId);
    if (template) {
      setComposeSubject(template.subject);
      setComposeBody(template.content);
      setSelectedTemplate(templateId);
    }
  };

  // Filter messages based on search term
  const filteredMessages = mockMessages.filter(msg => 
    msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle contact selection
  const handleContactToggle = (contactId: string) => {
    setSelectedContacts(prev => {
      if (prev.includes(contactId)) {
        return prev.filter(id => id !== contactId);
      } else {
        return [...prev, contactId];
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Message Center</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="inbox" className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Inbox
            </TabsTrigger>
            <TabsTrigger value="compose" className="flex items-center">
              <Send className="w-4 h-4 mr-2" />
              Compose
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
          </TabsList>
          
          {/* Inbox Tab */}
          <TabsContent value="inbox" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Messages</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    {filteredMessages.length > 0 ? (
                      filteredMessages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`p-4 border-b cursor-pointer transition-colors ${
                            activeMessage === message.id 
                              ? 'bg-primary/10' 
                              : 'hover:bg-gray-100'
                          } ${!message.isRead ? 'bg-blue-50' : ''}`}
                          onClick={() => handleMessageClick(message.id)}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8 text-xs">
                              <div>{message.avatar}</div>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className={`text-sm font-medium truncate ${!message.isRead ? 'font-bold' : ''}`}>
                                  {message.sender}
                                </p>
                                <span className="text-xs text-gray-500">
                                  {new Date(message.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 truncate">
                                {message.content}
                              </p>
                              <div className="flex items-center mt-1">
                                {message.isEmail ? (
                                  <Badge variant="outline" className="text-xs">Email</Badge>
                                ) : (
                                  <Badge variant="outline" className="text-xs">System</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No messages found
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                {activeMessage ? (
                  <>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {getMessage(activeMessage)?.sender}
                          </CardTitle>
                          <CardDescription>
                            {new Date(getMessage(activeMessage)?.timestamp || '').toLocaleString()}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="mb-8">
                        <p>{getMessage(activeMessage)?.content}</p>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Reply</h3>
                        <Textarea
                          placeholder="Write your reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={5}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 flex justify-end">
                      <Button onClick={handleReply} disabled={!replyText.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Send Reply
                      </Button>
                    </CardFooter>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center p-8 text-center text-gray-500">
                    <div>
                      <Mail className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p>Select a message to view its content</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
          
          {/* Compose Tab */}
          <TabsContent value="compose">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Recipients</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search contacts..."
                      className="pl-8"
                    />
                  </div>
                  
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {mockContacts.map(contact => (
                        <div
                          key={contact.id}
                          className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                            selectedContacts.includes(contact.id) 
                              ? 'bg-primary/20' 
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => handleContactToggle(contact.id)}
                        >
                          <div className="flex items-center">
                            {contact.type === 'group' ? (
                              <Users className="h-5 w-5 mr-2 text-gray-500" />
                            ) : (
                              <Avatar className="h-6 w-6 mr-2 text-xs">
                                <div>{contact.name.charAt(0)}</div>
                              </Avatar>
                            )}
                            <div>
                              <p className="text-sm font-medium">{contact.name}</p>
                              <p className="text-xs text-gray-500">
                                {contact.type === 'group' 
                                  ? `${contact.count} recipients` 
                                  : contact.email
                                }
                              </p>
                            </div>
                          </div>
                          {selectedContacts.includes(contact.id) && (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 border-t">
                  <div className="w-full text-sm text-gray-500">
                    {selectedContacts.length} recipient(s) selected
                  </div>
                </CardFooter>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Compose Message</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Message subject"
                      value={composeSubject}
                      onChange={(e) => setComposeSubject(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Write your message..."
                      value={composeBody}
                      onChange={(e) => setComposeBody(e.target.value)}
                      className="mt-1"
                      rows={12}
                    />
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <p>Available placeholders: {'{name}'}, {'{event_name}'}, {'{time}'}, {'{venue}'}, {'{date}'}</p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between border-t">
                  <Button variant="outline">
                    Save Draft
                  </Button>
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!composeSubject.trim() || !composeBody.trim() || selectedContacts.length === 0}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Templates Tab */}
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Saved Templates</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    {mockTemplates.map((template) => (
                      <div 
                        key={template.id} 
                        className={`p-4 border-b cursor-pointer transition-colors ${
                          selectedTemplate === template.id 
                            ? 'bg-primary/10' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <p className="font-medium mb-1">{template.name}</p>
                        <p className="text-xs text-gray-600 truncate">{template.subject}</p>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 border-t">
                  <Button className="w-full" variant="outline">
                    Create New Template
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="md:col-span-2">
                {selectedTemplate ? (
                  <>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">
                        {mockTemplates.find(t => t.id === selectedTemplate)?.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <Label htmlFor="template-subject">Subject</Label>
                        <Input
                          id="template-subject"
                          value={mockTemplates.find(t => t.id === selectedTemplate)?.subject || ''}
                          className="mt-1"
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="template-content">Content</Label>
                        <Textarea
                          id="template-content"
                          value={mockTemplates.find(t => t.id === selectedTemplate)?.content || ''}
                          className="mt-1"
                          rows={12}
                          readOnly
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 flex justify-end border-t">
                      <div className="space-x-2">
                        <Button variant="outline">
                          Edit
                        </Button>
                        <Button onClick={() => setActiveTab('compose')}>
                          Use This Template
                        </Button>
                      </div>
                    </CardFooter>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center p-8 text-center text-gray-500">
                    <div>
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p>Select a template to view its content</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MessageCenter;
