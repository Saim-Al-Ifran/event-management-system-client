import React from 'react';
import { Typography, Select, Option } from "@material-tailwind/react";
import EventCard from '../../components/Events/EventCard';

// Sample data for events
const events = [
  {
    date: '7',
    month: 'Jun',
    year: '2023',
    title: 'Promotional Event',
    time: '4:00 PM',
    description: 'A special promotional event happening in Budapest.',
    imageUrl: 'https://www.project.yahoobaba.net/event-react/public/event/dmitriy-nushtaev-AHOUQBahd3I-unsplash.jpg',
    isExpired: true,
    category: 'Promotional',
  },
  {
    date: '5',
    month: 'Apr',
    year: '2023',
    title: 'Drinks Showcase',
    time: '4:00 PM',
    description: 'Join us in Shanghai for an exclusive drinks showcase.',
    imageUrl: 'https://www.project.yahoobaba.net/event-react/public/event/kobby-mendez-xBFTjrMIC0c-unsplash.jpg',
    isExpired: true,
    category: 'Food & Drinks',
  },
  // Add more events as needed
];

const EventPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      {/* Filter by Category */}
      <div className="flex flex-wrap mb-8">
        <div className="w-full md:w-1/4 px-2">
          <Typography variant="h6" className="font-bold text-gray-800 mb-4" {...(undefined as any)}>
            Category
          </Typography>
          <div className="space-y-2">
            {['Music', 'Festival', 'Food & Drinks', 'Learning', 'Promotional'].map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  className="form-checkbox h-5 w-5 text-[#3F51B5] border-gray-300 rounded focus:ring-0"
                />
                <label htmlFor={category} className="ml-2 text-gray-700">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div className="w-full md:w-3/4 mt-4 mb-2 px-2">
          <div className="flex justify-between items-center">
            <Typography variant="h6" className="text-2xl font-bold flex items-center mb-4" {...(undefined as any)}>
              <span className="inline-block w-1 h-8 mr-2 bg-[#5d72e7]"></span>
              Latest Events
            </Typography>
            <div className="flex items-center">
              <Typography variant="body1" className="mr-4" {...(undefined as any)}>Sort By</Typography>
              <Select label="Select Sort Order" {...(undefined as any)}>
                <Option value="Oldest">Oldest</Option>
                <Option value="Newest">Newest</Option>
              </Select>
            </div>
          </div>

          {/* Display Events */}
          <div className="grid grid-cols-1 gap-6 mt-[2rem]">
            {events.map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
