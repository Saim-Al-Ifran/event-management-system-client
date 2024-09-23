import React from 'react';
import { Button, Typography } from "@material-tailwind/react";
import EventCard from '../../../components/Events/EventCard';
import { Link } from 'react-router-dom';
import { useGetAllEventsQuery } from '../../../features/Events/eventsApi';

// Skeleton component for loading state
const EventCardSkeleton: React.FC = () => (
  <div className="animate-pulse flex flex-col md:flex-row items-center mb-6">
    <div className="h-48 w-full md:w-1/4 bg-gray-300"></div>
    <div className="md:w-3/4 p-4">
      <div className="h-6 bg-gray-300 mb-2 w-1/3"></div>
      <div className="h-4 bg-gray-300 mb-2 w-1/4"></div>
      <div className="h-4 bg-gray-300 mb-4 w-full"></div>
      <div className="h-8 bg-gray-300 mb-2 w-1/4"></div>
    </div>
  </div>
);

// Helper function to format date parts
const formatDateParts = (dateString: string) => {
  const eventDate = new Date(dateString);
  const date = eventDate.getDate().toString().padStart(2, '0');
  const month = eventDate.toLocaleString('default', { month: 'short' });
  const year = eventDate.getFullYear();
  const time = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  return { date, month, year, time };
};

const UpcomingEventSection: React.FC = () => {
  const { data: EventData, isLoading } = useGetAllEventsQuery();

  return (
    <div className="container mx-auto my-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <Typography variant="h2" className="text-3xl font-bold flex items-center" {...(undefined as any)}>
          <span className="inline-block w-1 h-8 mr-2 bg-[#5d72e7]"></span>
          Upcoming Events
        </Typography>
        <Link to="/events">
          <Button
            variant="outlined"
            className="rounded-full border text-[#3F51B5] border-[#3F51B5] hover:bg-[#3F51B5] hover:text-white transition duration-300"
            {...(undefined as any)}
          >
            SEE ALL EVENTS
          </Button>
        </Link>
      </div>

      <div>
        {isLoading ? (
          Array(3).fill(0).map((_, index) => <EventCardSkeleton key={index} />) // Show skeletons while loading
        ) : EventData?.upcomingEvents && EventData.upcomingEvents.length > 0 ? (
          EventData.upcomingEvents.slice(0, 5).map((event: any, index: number) => {
            const { date, month, year, time } = formatDateParts(event.date);

            return (
              <EventCard
                key={index}
                date={date}
                month={month}
                year={year}
                time={`${date} ${month}, ${year} | ${time}`}
                title={event.title}
                description={event.description}
                imageUrl={event.image}
                isExpired={new Date(event.date) < new Date()}
                {...(undefined as any)}
              />
            );
          })
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <Typography variant="h6" {...(undefined as any)}>No upcoming events found</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEventSection;
