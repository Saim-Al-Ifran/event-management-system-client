import React from 'react';

interface EventCategoryProps {
  title: string;
  imageUrl: string;
}

const EventCategory: React.FC<EventCategoryProps> = ({ title, imageUrl }) => {
  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg cursor-pointer group">
      {/* Background image with hover scaling effect */}
      <img
        src={imageUrl}
        alt={title}
        className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-110"
      />
      {/* Overlay with hover effect to show text */}
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out bg-black bg-opacity-30 group-hover:bg-opacity-70">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
    </div>
  );
};

export default EventCategory;
