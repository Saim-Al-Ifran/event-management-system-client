import React from 'react';
import { Button, Typography } from '@material-tailwind/react';
import EventCategory from '../../../components/Cateogory/EventCategory';
import { Link } from 'react-router-dom';

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
    <section className="py-8 bg-white">
      <div className="container px-4 mx-auto">
        {/* Header section */}
        <div className="flex items-center justify-between mb-8">
          <Typography variant="h2" className="text-3xl font-bold flex items-center" {...(undefined as any)}>
            <span className="inline-block w-1 h-8 mr-2 bg-[#5d72e7]"></span>
            EVENTS BY CATEGORIES
          </Typography>
          <Link to="/categories">
          <Button
            variant="outlined"
            className="rounded-full border  text-[#3F51B5] border-[#3F51B5] hover:bg-[#3F51B5] hover:text-white transition duration-300"
            {...(undefined as any)}
         >
          SEE ALL CATEGORIES
         </Button>
          </Link>

        </div>
        
        {/* Categories grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((category) => (
            <EventCategory key={category.title} title={category.title} imageUrl={category.imageUrl} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCategories;
