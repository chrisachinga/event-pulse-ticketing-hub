import { EventCardProps } from '@/components/events/EventCard';
import { OrganizerCardProps } from '@/components/organizers/OrganizerCard';

export const mockEvents: EventCardProps[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    date: '2025-08-15T09:00:00.000Z',
    location: 'Nairobi Conference Center',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ticketPrice: 1500,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Annual Music Awards',
    date: '2025-07-22T18:30:00.000Z',
    location: 'Grand Arena, Mombasa',
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isAwardEvent: true,
    ticketPrice: 2000,
    isFeatured: true
  },
  {
    id: '3',
    title: 'Community Hackathon',
    date: '2025-06-10T10:00:00.000Z',
    location: 'Innovation Hub',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ticketPrice: 0,
    isFeatured: false
  },
  {
    id: '4',
    title: 'Business Leadership Summit',
    date: '2025-09-05T08:00:00.000Z',
    location: 'Executive Convention Center',
    imageUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ticketPrice: 5000,
    isFeatured: false
  },
  {
    id: '5',
    title: 'Film & TV Awards Night',
    date: '2025-10-12T19:00:00.000Z',
    location: 'Royal Theater',
    imageUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isAwardEvent: true,
    ticketPrice: 3500,
    isFeatured: true
  },
  {
    id: '6',
    title: 'Digital Marketing Workshop',
    date: '2025-07-18T13:00:00.000Z',
    location: 'Learning Center',
    imageUrl: 'https://images.unsplash.com/photo-1551636898-47668aa61de2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ticketPrice: 1000,
    isFeatured: false
  },
  {
    id: '7',
    title: 'Startup Pitch Competition',
    date: '2025-08-28T15:00:00.000Z',
    location: 'Venture Hub',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ticketPrice: 500,
    isFeatured: false
  },
  {
    id: '8',
    title: 'Photography Awards',
    date: '2025-11-15T17:30:00.000Z',
    location: 'Art Gallery',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isAwardEvent: true,
    ticketPrice: 1200,
    isFeatured: false
  }
];

export const mockFeaturedEvents = mockEvents.filter(event => event.isFeatured);
export const mockAwardEvents = mockEvents.filter(event => event.isAwardEvent);
export const mockUpcomingEvents = [...mockEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

const today = new Date();
export const mockPastEvents = [...mockEvents]
  .filter(event => new Date(event.date) < today)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export { mockOrganizers } from './mockOrganizers';
