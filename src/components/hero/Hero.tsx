
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Hero = () => {
  return (
    <div className="relative bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0zMGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00em0wIDYwYzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCA0LTEuOCA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Discover Amazing Events
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white drop-shadow-md">
            Find, attend, and organize events with our all-in-one ticketing platform
          </p>
          
          <div className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-2 bg-white p-2 rounded-lg shadow-lg">
              <div className="flex-grow w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Search for events"
                    className="pl-10 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e) => console.log('Searching for:', e.target.value)}
                    onKeyUp={(e) => console.log('KeyUp search for:', e.target.value)}
                  />
                </div>
              </div>
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary-dark">
                Find Events
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button variant="outline" className="border-white bg-black/50 text-white hover:bg-white/20">
              Tech Events
            </Button>
            <Button variant="outline" className="border-white bg-black/50 text-white hover:bg-white/20">
              Music
            </Button>
            <Button variant="outline" className="border-white bg-black/50 text-white hover:bg-white/20">
              Sports
            </Button>
            <Button variant="outline" className="border-white bg-black/50 text-white hover:bg-white/20">
              Award Shows
            </Button>
            <Button variant="outline" className="border-white bg-black/50 text-white hover:bg-white/20">
              Business
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
