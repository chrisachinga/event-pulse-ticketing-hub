
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { formatDate, formatTime } from '@/lib/utils';

// Mock data for the ticket purchase page
const eventData = {
  id: "1",
  title: "Tech Conference 2025",
  date: "2025-06-15T09:00:00",
  location: "Tech Hub Center",
  imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000",
  ticketTypes: [
    { id: "1", name: "General Admission", price: 1000, available: true },
    { id: "2", name: "VIP", price: 2500, available: true }
  ]
};

const TicketPurchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    voucherCode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Find the selected ticket
  const ticketType = eventData.ticketTypes.find(t => t.id === selectedTicket);
  const subtotal = ticketType ? ticketType.price * quantity : 0;
  // In a real app, this would apply a voucher discount
  const discount = 0;
  const total = subtotal - discount;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTicket(ticketId);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTicket) {
      toast.error("Please select a ticket type");
      return;
    }
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Ticket purchase successful!");
      // In a real app, would redirect to a ticket details page with the order ID
      navigate(`/tickets/123456`);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Purchase Tickets</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ticket Selection and Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                    <img src={eventData.imageUrl} alt={eventData.title} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{eventData.title}</h2>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>{formatDate(eventData.date)} at {formatTime(eventData.date)}</p>
                      <p>{eventData.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Ticket Types */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Select Ticket Type</h2>
                <div className="space-y-3">
                  {eventData.ticketTypes.map(ticket => (
                    <div 
                      key={ticket.id}
                      onClick={() => handleTicketSelect(ticket.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedTicket === ticket.id 
                          ? 'border-black bg-gray-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{ticket.name}</h3>
                          <p className="text-sm text-gray-600">Price per ticket</p>
                        </div>
                        <div className="font-semibold">{ticket.price} KES</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedTicket && (
                  <div className="mt-4">
                    <Label htmlFor="quantity" className="block mb-2">Quantity</Label>
                    <Input 
                      id="quantity"
                      type="number" 
                      min="1" 
                      max="10"
                      value={quantity} 
                      onChange={handleQuantityChange}
                      className="max-w-[100px]"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Attendee Information */}
            {selectedTicket && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Attendee Information</h2>
                  <form>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input 
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="voucherCode">Voucher Code (if any)</Label>
                        <Input 
                          id="voucherCode"
                          name="voucherCode"
                          value={formData.voucherCode}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {selectedTicket ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>{ticketType?.name} x {quantity}</span>
                        <span>{subtotal} KES</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>-{discount} KES</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between font-bold pt-2 border-t">
                        <span>Total</span>
                        <span>{total} KES</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-6" 
                      onClick={handlePurchase} 
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Complete Purchase'}
                    </Button>
                    
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500">Select a ticket type to see the order summary</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TicketPurchase;
