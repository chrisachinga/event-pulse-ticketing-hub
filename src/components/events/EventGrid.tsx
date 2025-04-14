
import React from 'react';
import EventCard, { EventCardProps } from './EventCard';

interface EventGridProps {
  events: EventCardProps[];
  title?: string;
  subtitle?: string;
}

const EventGrid = ({ events, title, subtitle }: EventGridProps) => {
  return (
    <section className="py-8">
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && <h2 className="text-3xl font-bold mb-2">{title}</h2>}
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </section>
  );
};

export default EventGrid;
