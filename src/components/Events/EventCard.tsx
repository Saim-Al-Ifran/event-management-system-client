import React from 'react';
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";

interface EventCardProps {
  date: string;
  month: string;
  year: string;
  title: string;
  time: string;
  description: string;
  imageUrl: string;
  isExpired: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  date,
  month,
  year,
  title,
  time,
  description,
  imageUrl,
  isExpired,
}) => {
  return (
    <Card className="flex flex-col md:flex-row items-center mb-6 shadow-lg" {...(undefined as any)}>
      <CardHeader color="blue" className="relative h-48 w-full md:w-1/4" {...(undefined as any)}>
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        <div className="absolute top-0 left-0 bg-[#3F51B5] text-white p-2 rounded-b">
          <p className="text-lg font-bold">{date}</p>
          <p className="text-sm">{month}</p>
          <p className="text-xs">{year}</p>
        </div>
      </CardHeader>
      <CardBody className="md:w-3/4 p-4" {...(undefined as any)}>
        <Typography variant="h5"  className="font-bold text-[#3F51B5]" {...(undefined as any)}>
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="mb-2" {...(undefined as any)}>
          {time}
        </Typography>
        <Typography variant="paragraph" className="mb-4" {...(undefined as any)}>
          {description}
        </Typography>
        <Button  variant="filled" className="mb-2 bg-[#3F51B5]" {...(undefined as any)}>
          READ MORE
        </Button>
        {isExpired && <Typography variant="small" color="red" className="text-sm" {...(undefined as any)}>Event has expired.</Typography>}
      </CardBody>
    </Card>
  );
};

export default EventCard;
