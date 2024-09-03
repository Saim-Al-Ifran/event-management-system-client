import React from 'react';
import { Button, Typography } from "@material-tailwind/react";
import EventCard from '../../../components/Events/EventCard';
import { Link } from 'react-router-dom';
 

// Sample event data
const events = [
    {
        date: '12',
        month: 'Aug',
        year: '2023',
        title: 'Summer Networking',
        time: '12 Aug, 2023 | 14:00 pm',
        description: 'An opportunity to meet and network with industry professionals.',
        imageUrl: 'https://media.licdn.com/dms/image/D4D12AQHLjwLZvcmaqw/article-cover_image-shrink_720_1280/0/1666941269384?e=2147483647&v=beta&t=ZDYZDeWIN_8UZ8jeRdUzBNMjgqzM1UePhq7PIum3AAw',
        isExpired: false,
      },
      {
        date: '25',
        month: 'Dec',
        year: '2023',
        title: 'Christmas Celebration',
        time: '25 Dec, 2023 | 18:00 pm',
        description: 'Join us for a festive evening of celebration and joy.',
        imageUrl: 'https://i.pinimg.com/originals/d0/12/8f/d0128fc7379b2e12248104ddf3b4ffa9.jpg',
        isExpired: false,
      },
];

const LatestEventSection: React.FC = () => {
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

export default LatestEventSection;
