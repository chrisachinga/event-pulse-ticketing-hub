
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Ticket, Download, Mail } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';
import { generateTicketNumber } from '@/lib/utils';

// Mock ticket data
const ticketData = {
  id: "123456",
  eventId: "1",
  eventName: "Tech Conference 2025",
  ticketNumber: generateTicketNumber(),
  ticketType: "General Admission",
  purchaseDate: "2025-04-14T10:30:00",
  eventDate: "2025-06-15T09:00:00",
  eventLocation: "Tech Hub Center",
  attendeeName: "John Doe",
  attendeeEmail: "john.doe@example.com",
  price: 1000,
  status: "confirmed" // could be confirmed, used, expired
};

const TicketDetails = () => {
  const { id } = useParams();
  // In a real app, would fetch ticket details based on id

  const handleDownloadTicket = () => {
    // In a real application, this would generate a PDF ticket for download
    console.log("Downloading ticket...");
    // For demonstration, redirect to the ticket download page
    window.open(`/tickets/${ticketData.id}/download`, '_blank');
  };
  
  const handleEmailTicket = () => {
    // In a real application, this would send the ticket to the user's email
    console.log("Sending ticket to email...");
    alert("Ticket sent to your email!");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Ticket Details</h1>
        
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-black">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{ticketData.eventName}</h2>
                  <p className="text-gray-600">{ticketData.ticketType}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Ticket #{ticketData.ticketNumber}</p>
                  <p className={`text-sm ${
                    ticketData.status === 'confirmed' ? 'text-green-600' : 
                    ticketData.status === 'used' ? 'text-gray-600' : 'text-red-600'
                  }`}>
                    {ticketData.status === 'confirmed' ? 'Confirmed' : 
                     ticketData.status === 'used' ? 'Used' : 'Expired'}
                  </p>
                </div>
              </div>
              
              <hr className="my-6 border-dashed border-gray-300" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">EVENT DETAILS</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span>{formatDate(ticketData.eventDate)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span>{formatTime(ticketData.eventDate)}</span>
                    </div>
                    <div className="flex gap-2">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span>{ticketData.eventLocation}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">ATTENDEE INFORMATION</h3>
                  <div className="mt-2">
                    <p className="font-medium">{ticketData.attendeeName}</p>
                    <p className="text-gray-600">{ticketData.attendeeEmail}</p>
                  </div>
                </div>
              </div>
              
              <hr className="my-6 border-dashed border-gray-300" />
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">PURCHASE DETAILS</h3>
                  <p className="mt-1">Purchase Date: {formatDate(ticketData.purchaseDate)}</p>
                  <p>Amount Paid: {ticketData.price} KES</p>
                </div>
                
                <div>
                  <div className="bg-black text-white rounded-lg py-3 px-4 inline-flex items-center">
                    <Ticket className="h-6 w-6 mr-2" />
                    <span className="font-mono font-bold">{ticketData.ticketNumber}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex gap-3 flex-wrap">
                <Button onClick={handleDownloadTicket} className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download Ticket
                </Button>
                <Button variant="outline" onClick={handleEmailTicket} className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default TicketDetails;
