
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Calendar, Check, Image, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockEvents } from '@/data/mockData';

const CreateEditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;

  // Find event if in edit mode
  const existingEvent = isEditMode 
    ? mockEvents.find(event => event.id === id) 
    : null;

  const [formData, setFormData] = useState({
    title: existingEvent?.title || '',
    description: existingEvent?.description || '',
    date: existingEvent?.date || '',
    location: existingEvent?.location || '',
    category: existingEvent?.category || '',
    ticketPrice: existingEvent?.ticketPrice?.toString() || '',
    totalTickets: '100',
    imageUrl: existingEvent?.imageUrl || '',
    isAwardEvent: existingEvent?.isAwardEvent || false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real application, this would save to a database
    toast({
      title: isEditMode ? "Event Updated" : "Event Created",
      description: `${formData.title} has been ${isEditMode ? 'updated' : 'created'} successfully.`,
    });
    
    navigate('/admin/events');
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Event' : 'Create New Event'}</h1>
          <Button variant="outline" onClick={() => navigate('/admin/events')}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter event title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your event"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Event Date & Time</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="date"
                          name="date"
                          type="datetime-local"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Event location"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ticket Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ticketPrice">Ticket Price (KES)</Label>
                      <Input
                        id="ticketPrice"
                        name="ticketPrice"
                        type="number"
                        min="0"
                        value={formData.ticketPrice}
                        onChange={handleInputChange}
                        placeholder="0 for free events"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="totalTickets">Total Tickets</Label>
                      <Input
                        id="totalTickets"
                        name="totalTickets"
                        type="number"
                        min="1"
                        value={formData.totalTickets}
                        onChange={handleInputChange}
                        placeholder="Number of available tickets"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Event Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="tech">Tech Events</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="awards">Award Shows</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Event Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {formData.imageUrl ? (
                      <div className="relative">
                        <img 
                          src={formData.imageUrl} 
                          alt="Event preview" 
                          className="mx-auto max-h-32 object-contain"
                        />
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm"
                          className="mt-2"
                          onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                        >
                          <X className="mr-1 h-3 w-3" /> Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="py-4">
                        <Image className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Add an event image</p>
                        <Input
                          id="imageUrl"
                          name="imageUrl"
                          type="text"
                          value={formData.imageUrl}
                          onChange={handleInputChange}
                          placeholder="Enter image URL"
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Event Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      id="isAwardEvent"
                      checked={formData.isAwardEvent}
                      onChange={() => setFormData(prev => ({ 
                        ...prev, 
                        isAwardEvent: !prev.isAwardEvent 
                      }))}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="isAwardEvent">Award Event</Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button type="submit" className="flex items-center">
              <Save className="mr-2 h-4 w-4" />
              {isEditMode ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateEditEvent;
