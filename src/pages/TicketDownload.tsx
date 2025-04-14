
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate, formatTime, generateTicketNumber } from '@/lib/utils';

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
  eventAddress: "123 Innovation Ave, Silicon Valley, CA",
  attendeeName: "John Doe",
  attendeeEmail: "john.doe@example.com",
  price: 1000
};

const TicketDownload = () => {
  const { id } = useParams();
  // In a real app, would fetch ticket details based on id

  useEffect(() => {
    // In a real implementation, this component would trigger the ticket generation
    // and download automatically when mounted
    const timer = setTimeout(() => {
      window.print();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white p-8 print:p-0">
      <div className="max-w-4xl mx-auto mb-8 print:hidden">
        <h1 className="text-3xl font-bold">Your Ticket is Ready</h1>
        <p className="mt-2 text-gray-600">This page will automatically open the print dialog. You can also print or save as PDF manually.</p>
      </div>
      
      {/* Printable Ticket */}
      <div className="max-w-4xl mx-auto border-4 border-black print:border-2 p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Header */}
          <div className="md:col-span-3 flex justify-between items-start border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-2xl font-bold">EVENT TICKET</h1>
              <p className="text-lg">{ticketData.eventName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Ticket #</p>
              <p className="font-mono font-bold text-lg">{ticketData.ticketNumber}</p>
            </div>
          </div>
          
          {/* Event Details */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h2 className="font-bold uppercase text-sm">Event Details</h2>
              <p className="font-bold text-xl mt-1">{ticketData.eventName}</p>
              <p>{ticketData.ticketType}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold uppercase text-sm">Date & Time</h3>
                <p>{formatDate(ticketData.eventDate)}</p>
                <p>{formatTime(ticketData.eventDate)}</p>
              </div>
              
              <div>
                <h3 className="font-bold uppercase text-sm">Location</h3>
                <p>{ticketData.eventLocation}</p>
                <p className="text-sm">{ticketData.eventAddress}</p>
              </div>
            </div>
          </div>
          
          {/* QR Code Placeholder */}
          <div className="md:col-span-1">
            <div className="h-40 w-40 border-2 border-black flex items-center justify-center mx-auto">
              <p className="text-center text-sm">QR Code Placeholder</p>
            </div>
          </div>
          
          {/* Attendee Information */}
          <div className="md:col-span-3 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold uppercase text-sm">Attendee</h3>
                <p>{ticketData.attendeeName}</p>
                <p>{ticketData.attendeeEmail}</p>
              </div>
              
              <div>
                <h3 className="font-bold uppercase text-sm">Purchase Information</h3>
                <p>Date: {formatDate(ticketData.purchaseDate)}</p>
                <p>Price: {ticketData.price} KES</p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="md:col-span-3 border-t border-gray-200 pt-4 mt-6 text-center text-sm text-gray-500">
            <p>Please present this ticket (printed or on your device) at the event entrance.</p>
            <p className="mt-1">For any inquiries, please contact support@eventpulse.com</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-8 flex justify-center print:hidden">
        <button 
          onClick={() => window.print()} 
          className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800"
        >
          Print Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketDownload;
