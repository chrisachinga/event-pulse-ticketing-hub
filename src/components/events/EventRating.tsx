
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import RatingDisplay from '@/components/ratings/RatingDisplay';
import RatingInput from '@/components/ratings/RatingInput';

interface EventRatingProps {
  eventId: string;
  averageRating: number;
  totalRatings: number;
  userRating?: number;
}

const EventRating = ({ eventId, averageRating, totalRatings, userRating = 0 }: EventRatingProps) => {
  const [rating, setRating] = React.useState(userRating);
  const [comment, setComment] = React.useState('');
  const [showCommentForm, setShowCommentForm] = React.useState(false);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    console.log(`Submitted rating ${rating} and comment: "${comment}" for event ${eventId}`);
    // In a real app, would submit to API
    setComment('');
    setShowCommentForm(false);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Event Ratings</h3>
            <div className="flex items-center mb-1">
              <RatingDisplay rating={averageRating} />
              <span className="ml-2 text-sm text-gray-600">{averageRating.toFixed(1)}/5</span>
            </div>
            <p className="text-sm text-gray-500">{totalRatings} reviews</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <h4 className="text-sm font-medium mb-2">Rate this event:</h4>
            <div className="flex items-center gap-4">
              <RatingInput value={rating} onChange={handleRatingChange} />
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setShowCommentForm(!showCommentForm)}
              >
                <MessageSquare size={16} />
                <span>Add Review</span>
              </Button>
            </div>
            
            {showCommentForm && (
              <div className="mt-4 space-y-3">
                <Textarea 
                  placeholder="Share your experience at this event..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowCommentForm(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSubmit}>
                    Submit Review
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventRating;
