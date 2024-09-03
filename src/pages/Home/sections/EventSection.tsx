import React from 'react';
import { Button, Typography } from "@material-tailwind/react";
import EventCard from '../../../components/Events/EventCard';
import { Link } from 'react-router-dom';
 

// Sample event data
const events = [
  {
    date: '7',
    month: 'Jun',
    year: '2023',
    title: 'Promotional Event',
    time: '7 Jun, 2023 | 16:00 pm',
    description: 'A short description about the promotional event.',
    imageUrl: 'https://www.project.yahoobaba.net/event-react/public/event/dmitriy-nushtaev-AHOUQBahd3I-unsplash.jpg',
    isExpired: true,
  },
  {
    date: '5',
    month: 'Apr',
    year: '2023',
    title: 'Drinks Showcase',
    time: '5 Apr, 2023 | 16:00 pm',
    description: 'A short description about the drinks showcase.',
    imageUrl: 'https://www.project.yahoobaba.net/event-react/public/event/kobby-mendez-xBFTjrMIC0c-unsplash.jpg',
    isExpired: false,
  }, 
  // Add more events here
];

const EventsSection: React.FC = () => {
  return (
    <div className="container mx-auto my-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <Typography variant="h2" className="text-3xl font-bold flex items-center" {...(undefined as any)}>
            <span className="inline-block w-1 h-8 mr-2 bg-[#5d72e7]"></span>
            Latest Events
          </Typography>
          <Link to="/events">
          <Button
            variant="outlined"
            className="rounded-full border  text-[#3F51B5] border-[#3F51B5] hover:bg-[#3F51B5] hover:text-white transition duration-300"
            {...(undefined as any)}
         >
          SEE ALL EVENTS
         </Button>
          </Link>

        </div>
      <div>
        {events.slice(0, 5).map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
