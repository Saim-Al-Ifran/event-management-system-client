import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs,   Typography } from '@material-tailwind/react';
import EventCategory from '../../components/Cateogory/EventCategory';

const categories = [
  { title: 'Music', imageUrl: 'https://www.alliedmarketresearch.com/blog/Blog_banner_image/ctoykrzsmv.jpeg' },
  { title: 'Festival', imageUrl: 'https://idsb.tmgrup.com.tr/ly/uploads/images/2022/11/27/243600.jpg' },
  { title: 'Food & Drinks', imageUrl: 'https://billetto.co.uk/blog/wp-content/uploads/2019/03/snnhgynqm44-e1551764766978.jpg' },
  { title: 'Learning', imageUrl: 'https://assets.website-files.com/5b3dd54182ecae4d1602962f/609e33e18c5000af6211f094_HR%20Hackathon%20-%20Section%202.jpg' },
  { title: 'Promotional', imageUrl: 'https://trafft.com/wp-content/uploads/2021/02/TNW-Conference-2020.jpg' },
  { title: 'Sports', imageUrl: 'https://media.istockphoto.com/id/527679360/photo/soccer-stadium-with-fans.jpg?s=612x612&w=0&k=20&c=O_A38RklTWn9nL2lflcBQLMf-XHurEb8EyDUMJryC4M=' }, // New Event
  { title: 'Art', imageUrl: 'https://path/to/art-image.jpg' },       // New Event
  { title: 'Networking', imageUrl: 'https://path/to/networking-image.jpg' }, // New Event
];

const EventCategories: React.FC = () => {
  return (
    <>
      {/* Breadcrumbs Section */}
      <nav className="bg-gray-100 py-2">
        <div className="container px-4 mx-auto">
          <Breadcrumbs separator="/" className="text-gray-600" {...(undefined as any)}>
            <Link to="/" className="hover:underline text-[#3F51B5]">
              Home
            </Link>
            <Link to="/events" className="hover:underline text-[#3F51B5]">
              Events
            </Link>
            <Typography className="text-gray-500" {...(undefined as any)}>Categories</Typography>
          </Breadcrumbs>
        </div>
      </nav>

      {/* Categories Section */}
      <section className="py-8 bg-white">
        <div className="container px-4 mx-auto">
          {/* Header section */}
          <div className="flex items-center justify-between mb-8">
            <Typography variant="h2" className="text-3xl font-bold flex items-center" {...(undefined as any)}>
              <span className="inline-block w-1 h-8 mr-2 bg-[#5d72e7]"></span>
              EVENTS BY CATEGORIES
            </Typography>
   
          </div>

          {/* Categories grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <EventCategory key={category.title} title={category.title} imageUrl={category.imageUrl} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EventCategories;
