
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Copy,
  Facebook,
  Twitter,
  Mail,
  Share2,
  MessageCircle,
  Link as LinkIcon,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EventSharingProps {
  eventId: string;
  eventName: string;
}

const EventSharing = ({ eventId, eventName }: EventSharingProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  const eventUrl = `${window.location.origin}/events/${eventId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(eventUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast({
          title: "Link Copied!",
          description: "Event link copied to clipboard",
        });
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        toast({
          title: "Copy failed",
          description: "Could not copy to clipboard",
          variant: "destructive"
        });
      });
  };

  const encodeEventData = () => {
    return encodeURIComponent(`Check out ${eventName} at ${eventUrl}`);
  };

  const shareTo = (platform: string) => {
    const encodedText = encodeEventData();
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(`Join me at ${eventName}`)}&body=${encodedText}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}`;
        break;
      default:
        return;
    }

    if (platform !== 'email') {
      window.open(shareUrl, '_blank');
    } else {
      window.location.href = shareUrl;
    }
    
    toast({
      title: "Sharing",
      description: `Opening ${platform} to share this event`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this event</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2 p-2 border rounded-md">
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 truncate text-sm">{eventUrl}</div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCopyLink}
            >
              <Copy className="h-4 w-4 mr-2" />
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20 hover:bg-blue-50"
              onClick={() => shareTo('facebook')}
            >
              <Facebook className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-xs">Facebook</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20 hover:bg-blue-50"
              onClick={() => shareTo('twitter')}
            >
              <Twitter className="h-8 w-8 text-blue-400 mb-2" />
              <span className="text-xs">Twitter</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20 hover:bg-green-50"
              onClick={() => shareTo('whatsapp')}
            >
              <MessageCircle className="h-8 w-8 text-green-500 mb-2" />
              <span className="text-xs">WhatsApp</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20 hover:bg-red-50"
              onClick={() => shareTo('email')}
            >
              <Mail className="h-8 w-8 text-red-500 mb-2" />
              <span className="text-xs">Email</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventSharing;
