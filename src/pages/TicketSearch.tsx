
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Search, Ticket, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TicketSearch = () => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    reference: '',
  });
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    if (!searchParams.name && !searchParams.reference) {
      toast({
        title: "Search Error",
        description: "Please enter a name or ticket reference",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);

    // Simulate API call with mock data
    setTimeout(() => {
      // Mock results
      const mockResults = [
        {
          id: '12345',
          eventId: '1',
          eventName: 'Tech Conference 2025',
          ticketNumber: 'TECH-2025-00123',
          purchaseDate: '2025-04-01T10:30:00',
          eventDate: '2025-06-15T09:00:00',
          attendeeName: 'John Doe',
          attendeeEmail: 'john.doe@example.com',
        },
        {
          id: '12346',
          eventId: '2',
          eventName: 'Music Festival 2025',
          ticketNumber: 'MUSIC-2025-00456',
          purchaseDate: '2025-04-02T15:45:00',
          eventDate: '2025-07-10T16:00:00',
          attendeeName: 'John Doe',
          attendeeEmail: 'john.doe@example.com',
        }
      ];

      // Filter based on search criteria
      const filteredResults = mockResults.filter(ticket => {
        const nameMatch = searchParams.name ? 
          ticket.attendeeName.toLowerCase().includes(searchParams.name.toLowerCase()) : 
          true;
        
        const refMatch = searchParams.reference ? 
          ticket.ticketNumber.toLowerCase().includes(searchParams.reference.toLowerCase()) : 
          true;
          
        return nameMatch && refMatch;
      });

      setSearchResults(filteredResults);
      setIsSearching(false);

      if (filteredResults.length === 0) {
        toast({
          title: "No tickets found",
          description: "We couldn't find any tickets matching your search criteria",
        });
      }
    }, 1000);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePrintTicket = (ticketId: string) => {
    navigate(`/tickets/${ticketId}/download`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Find Your Ticket</h1>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Attendee Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter the ticket holder's name"
                  value={searchParams.name}
                  onChange={handleInputChange}
                  onKeyUp={handleKeyUp}
                />
              </div>
              
              <div>
                <Label htmlFor="reference">Ticket Reference</Label>
                <Input
                  id="reference"
                  name="reference"
                  placeholder="Enter the ticket reference number"
                  value={searchParams.reference}
                  onChange={handleInputChange}
                  onKeyUp={handleKeyUp}
                />
              </div>
            </div>
            
            <Button 
              className="w-full mt-6 gap-2"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? 'Searching...' : (
                <>
                  <Search className="h-4 w-4" />
                  Search Tickets
                </>
              )}
            </Button>
          </div>
          
          {searchResults.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              <div className="space-y-4">
                {searchResults.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="bg-card border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Ticket className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{ticket.eventName}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Ticket: {ticket.ticketNumber}</p>
                      <p className="text-sm mt-1">Attendee: {ticket.attendeeName}</p>
                      <p className="text-sm text-muted-foreground">Event Date: {new Date(ticket.eventDate).toLocaleDateString()}</p>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => handlePrintTicket(ticket.id)}
                    >
                      <Printer className="h-4 w-4" />
                      Print Ticket
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-12">
            <Separator className="mb-6" />
            <div className="text-center text-muted-foreground">
              <h3 className="text-lg font-medium mb-2">Need Help?</h3>
              <p>If you're having trouble locating your tickets, please contact our support team at support@tickethub.com</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TicketSearch;
