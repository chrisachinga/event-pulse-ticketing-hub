
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Award, Info, ChevronDown, ChevronUp, CheckCircle,
  CreditCard, Lock, Unlock, ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data for the voting page
const eventData = {
  id: "2",
  title: "Design Awards 2025",
  date: "2025-07-22T18:00:00",
  imageUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1000",
  votingEnabled: true,
  categories: [
    {
      id: "1",
      name: "Best Website Design",
      description: "Recognizing excellence in website design aesthetics, usability, and innovation",
      nominees: [
        { id: "1", name: "Portfolio Hub", creator: "Digital Wizards", imageUrl: "https://placehold.co/300x200", votes: 234 },
        { id: "2", name: "EcoStore", creator: "Green Solutions", imageUrl: "https://placehold.co/300x200", votes: 187 },
        { id: "3", name: "TravelJournal", creator: "Nomad Designs", imageUrl: "https://placehold.co/300x200", votes: 312 },
        { id: "4", name: "FitLife", creator: "Health Apps Inc.", imageUrl: "https://placehold.co/300x200", votes: 156 }
      ]
    },
    {
      id: "2",
      name: "Best Mobile App Interface",
      description: "Celebrating mobile apps with exceptional user interface design and experience",
      nominees: [
        { id: "5", name: "MediTrack", creator: "Health Tech Solutions", imageUrl: "https://placehold.co/300x200", votes: 199 },
        { id: "6", name: "QuickShop", creator: "Retail Innovations", imageUrl: "https://placehold.co/300x200", votes: 243 },
        { id: "7", name: "EasyBudget", creator: "FinTech Group", imageUrl: "https://placehold.co/300x200", votes: 178 },
        { id: "8", name: "SocialHub", creator: "Connect Systems", imageUrl: "https://placehold.co/300x200", votes: 285 }
      ]
    },
    {
      id: "3",
      name: "Best UI Innovation",
      description: "Recognizing groundbreaking user interface innovations that push the industry forward",
      nominees: [
        { id: "9", name: "VoiceUI Framework", creator: "Sound Innovations", imageUrl: "https://placehold.co/300x200", votes: 267 },
        { id: "10", name: "AR Shopping Experience", creator: "Future Retail", imageUrl: "https://placehold.co/300x200", votes: 302 },
        { id: "11", name: "Adaptive Dashboard", creator: "DataViz Inc.", imageUrl: "https://placehold.co/300x200", votes: 189 },
        { id: "12", name: "Gesture Control System", creator: "Motion Tech", imageUrl: "https://placehold.co/300x200", votes: 232 }
      ]
    }
  ],
  votingPackages: [
    { id: "1", votes: 10, price: 50, popular: false },
    { id: "2", votes: 20, price: 100, popular: true },
    { id: "3", votes: 30, price: 150, popular: false },
    { id: "4", votes: 400, price: 2000, popular: false }
  ]
};

const VotingPage = () => {
  const { id } = useParams();
  // In a real app, would fetch event details based on id
  
  const [expandedCategory, setExpandedCategory] = useState<string | null>("1");
  const [selectedVotes, setSelectedVotes] = useState<Record<string, string | null>>({});
  const [remainingVotes, setRemainingVotes] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };
  
  const selectNominee = (categoryId: string, nomineeId: string) => {
    if (remainingVotes > 0) {
      setSelectedVotes({
        ...selectedVotes,
        [categoryId]: nomineeId
      });
      setRemainingVotes(remainingVotes - 1);
    } else {
      toast.error("You've used all your votes! Purchase more to continue voting.");
    }
  };
  
  const selectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    const votingPackage = eventData.votingPackages.find(p => p.id === packageId);
    if (votingPackage) {
      setRemainingVotes(votingPackage.votes);
      setIsPaymentModalOpen(true);
    }
  };
  
  const handlePurchaseVotes = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      toast.success(`Successfully purchased ${
        eventData.votingPackages.find(p => p.id === selectedPackage)?.votes
      } votes!`);
    }, 2000);
  };
  
  const submitVotes = () => {
    setIsProcessing(true);
    
    // Simulate vote submission
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Your votes have been submitted successfully!");
      
      // Redirect to results page
      // navigate(`/results/${id}`);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-8">
          <img 
            src={eventData.imageUrl} 
            alt={eventData.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{eventData.title}</h1>
              <div className="flex items-center justify-center">
                <Award className="h-5 w-5 mr-2" />
                <span>Vote for your favorites</span>
              </div>
            </div>
          </div>
        </div>
        
        {remainingVotes > 0 ? (
          <div className="bg-black text-white p-4 rounded-lg mb-8 flex justify-between items-center">
            <div className="flex items-center">
              <Info className="h-5 w-5 mr-2" />
              <span>You have <strong>{remainingVotes}</strong> votes remaining</span>
            </div>
            <Button variant="outline" className="text-white border-white hover:bg-white/20" onClick={() => setIsPaymentModalOpen(true)}>
              Get More Votes
            </Button>
          </div>
        ) : (
          <div className="bg-gray-100 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Ready to Vote?</h2>
            <p className="mb-4">Purchase a voting package to start voting for your favorite nominees.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {eventData.votingPackages.map(pkg => (
                <Card key={pkg.id} className={`overflow-hidden ${pkg.popular ? 'border-2 border-black' : ''}`}>
                  <CardContent className="p-4">
                    {pkg.popular && (
                      <div className="bg-black text-white text-xs font-bold py-1 px-2 absolute top-0 right-0">
                        POPULAR
                      </div>
                    )}
                    <div className="text-center">
                      <h3 className="font-bold text-lg">{pkg.votes} Votes</h3>
                      <p className="text-xl font-bold my-2">{pkg.price} KES</p>
                      <Button 
                        className="w-full" 
                        onClick={() => selectPackage(pkg.id)}
                      >
                        Select
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Voting Categories */}
        <div className="space-y-6">
          {eventData.categories.map(category => (
            <Card key={category.id} className={expandedCategory === category.id ? 'border-black' : ''}>
              <div 
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleCategory(category.id)}
              >
                <div>
                  <h2 className="text-xl font-bold">{category.name}</h2>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
                <div className={`transition-transform ${expandedCategory === category.id ? 'rotate-180' : ''}`}>
                  <ChevronDown className="h-6 w-6" />
                </div>
              </div>
              
              {expandedCategory === category.id && (
                <CardContent className="pt-0">
                  <hr className="my-2" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {category.nominees.map(nominee => {
                      const isSelected = selectedVotes[category.id] === nominee.id;
                      
                      return (
                        <div 
                          key={nominee.id}
                          className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                            isSelected ? 'border-black ring-2 ring-black' : 'hover:border-gray-400'
                          }`}
                          onClick={() => remainingVotes > 0 && selectNominee(category.id, nominee.id)}
                        >
                          <div className="relative">
                            <img 
                              src={nominee.imageUrl} 
                              alt={nominee.name} 
                              className="w-full h-40 object-cover"
                            />
                            {isSelected && (
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <CheckCircle className="h-12 w-12 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <h3 className="font-bold">{nominee.name}</h3>
                            <p className="text-sm text-gray-600">By {nominee.creator}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
        
        {/* Submit Votes Button */}
        {Object.keys(selectedVotes).length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={submitVotes} 
              disabled={isProcessing}
              className="px-8"
            >
              {isProcessing ? 'Processing...' : 'Submit Votes'}
              {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        )}
        
        {/* Payment Modal (In a real app, would be a proper modal component) */}
        {isPaymentModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Purchase Votes</h3>
                  <button onClick={() => setIsPaymentModalOpen(false)} className="text-gray-500">
                    &times;
                  </button>
                </div>
                
                <div className="mb-6">
                  <p className="font-medium">Selected Package:</p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-2">
                    <div className="flex justify-between">
                      <span>
                        {eventData.votingPackages.find(p => p.id === selectedPackage)?.votes} Votes
                      </span>
                      <span className="font-bold">
                        {eventData.votingPackages.find(p => p.id === selectedPackage)?.price} KES
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="font-medium mb-2">Payment Method:</p>
                  <div className="border rounded-lg p-3 flex items-center">
                    <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                    <span>PayStack</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handlePurchaseVotes} 
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Complete Purchase'}
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By completing this purchase, you agree to our Terms of Service.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default VotingPage;
