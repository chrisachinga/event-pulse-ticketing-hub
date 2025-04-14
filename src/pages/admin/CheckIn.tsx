
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Search, UserX, RefreshCw, User, Users } from 'lucide-react';
import { toast } from 'sonner';

// Mock event data
const eventData = {
  id: "1",
  title: "Tech Conference 2025",
  date: "2025-06-15T09:00:00",
  totalAttendees: 342,
  checkedIn: 157
};

// Mock ticket data
const mockTickets = [
  { id: "1", ticketNumber: "EVT1234567", attendeeName: "John Doe", email: "john@example.com", ticketType: "General Admission", checkedIn: true, checkInTime: "2025-06-15T09:15:23" },
  { id: "2", ticketNumber: "EVT2345678", attendeeName: "Jane Smith", email: "jane@example.com", ticketType: "VIP", checkedIn: true, checkInTime: "2025-06-15T09:05:47" },
  { id: "3", ticketNumber: "EVT3456789", attendeeName: "Alex Johnson", email: "alex@example.com", ticketType: "General Admission", checkedIn: false, checkInTime: null },
  { id: "4", ticketNumber: "EVT4567890", attendeeName: "Sarah Williams", email: "sarah@example.com", ticketType: "Early Bird", checkedIn: true, checkInTime: "2025-06-15T09:30:12" },
];

const CheckIn = () => {
  const { id } = useParams();
  const [ticketNumber, setTicketNumber] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentCheckIns, setRecentCheckIns] = useState(mockTickets.filter(ticket => ticket.checkedIn));
  
  const handleTicketSearch = () => {
    if (!ticketNumber.trim()) {
      toast.error("Please enter a ticket number");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulating API call to validate ticket
    setTimeout(() => {
      const ticket = mockTickets.find(t => t.ticketNumber === ticketNumber);
      
      if (ticket) {
        setSearchResults(ticket);
        if (ticket.checkedIn) {
          toast.info(`${ticket.attendeeName} has already been checked in at ${new Date(ticket.checkInTime!).toLocaleTimeString()}`);
        }
      } else {
        setSearchResults(null);
        toast.error("Invalid ticket number");
      }
      
      setIsProcessing(false);
    }, 800);
  };
  
  const handleCheckIn = () => {
    if (!searchResults || searchResults.checkedIn) return;
    
    setIsProcessing(true);
    
    // Simulating API call to check in attendee
    setTimeout(() => {
      const updatedTicket = {
        ...searchResults,
        checkedIn: true,
        checkInTime: new Date().toISOString()
      };
      
      setSearchResults(updatedTicket);
      setRecentCheckIns(prev => [updatedTicket, ...prev].slice(0, 10));
      toast.success(`${updatedTicket.attendeeName} has been successfully checked in!`);
      setTicketNumber('');
      setTimeout(() => setSearchResults(null), 3000);
      setIsProcessing(false);
    }, 800);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTicketSearch();
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Check-In</h1>
          <p className="text-gray-600">Verify and check in attendees for {eventData.title}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold">Ticket Check-In</h2>
                  <p className="text-gray-600">Enter or scan the ticket number to check in an attendee</p>
                </div>
                
                <div className="flex gap-2 mb-6">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder="Enter ticket number" 
                      className="pl-10"
                      value={ticketNumber}
                      onChange={(e) => setTicketNumber(e.target.value)}
                      onKeyDown={handleKeyPress}
                      autoFocus
                    />
                  </div>
                  <Button onClick={handleTicketSearch} disabled={isProcessing}>
                    {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Verify"}
                  </Button>
                </div>
                
                {searchResults && (
                  <Card className={`border-2 ${searchResults.checkedIn ? 'border-gray-300 bg-gray-50' : 'border-black'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{searchResults.attendeeName}</h3>
                          <p className="text-gray-600 text-sm">{searchResults.email}</p>
                          <div className="mt-1">
                            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                              {searchResults.ticketType}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          {searchResults.checkedIn ? (
                            <div className="text-center">
                              <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                                <Check className="h-6 w-6 text-gray-600" />
                              </div>
                              <p className="text-xs mt-1 text-gray-500">Already checked in</p>
                              <p className="text-xs text-gray-500">
                                {new Date(searchResults.checkInTime).toLocaleTimeString()}
                              </p>
                            </div>
                          ) : (
                            <Button onClick={handleCheckIn} disabled={isProcessing} className="h-12 w-12 rounded-full p-0">
                              {isProcessing ? (
                                <RefreshCw className="h-5 w-5 animate-spin" />
                              ) : (
                                <Check className="h-5 w-5" />
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-3 text-sm">
                        <p className="font-mono bg-gray-100 p-2 rounded">
                          Ticket #: {searchResults.ticketNumber}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {!searchResults && ticketNumber && !isProcessing && (
                  <div className="text-center p-8 border border-dashed rounded-lg">
                    <UserX className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-600">No matching ticket found</p>
                    <p className="text-sm text-gray-500">Please check the ticket number and try again</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            {/* Attendance Stats */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Attendance Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="flex justify-center mb-2">
                      <Users className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold">{eventData.totalAttendees}</div>
                    <div className="text-xs text-gray-500">Total Attendees</div>
                  </div>
                  <div>
                    <div className="flex justify-center mb-2">
                      <User className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold">{eventData.checkedIn}</div>
                    <div className="text-xs text-gray-500">Checked In</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-black h-2.5 rounded-full" style={{ width: `${(eventData.checkedIn / eventData.totalAttendees) * 100}%` }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {Math.round((eventData.checkedIn / eventData.totalAttendees) * 100)}% checked in
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Check-ins */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Recent Check-ins</h3>
                {recentCheckIns.length > 0 ? (
                  <ul className="space-y-3">
                    {recentCheckIns.map(ticket => (
                      <li key={ticket.id} className="text-sm border-b border-gray-100 pb-2">
                        <div className="font-medium">{ticket.attendeeName}</div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 text-xs">{ticket.ticketType}</span>
                          <span className="text-gray-500 text-xs">
                            {new Date(ticket.checkInTime).toLocaleTimeString()}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-500 text-sm">
                    No check-ins yet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CheckIn;
