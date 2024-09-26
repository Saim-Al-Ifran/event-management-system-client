import React from 'react';
import { Button, Typography } from '@material-tailwind/react';
import EventCategory from '../../../components/Cateogory/EventCategory';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../../features/categories/categoriesApi';
import { Category } from '../../../types/api-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
 

const EventCategories: React.FC = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <section className="py-8 bg-white">
      <div className="container px-4 mx-auto">
     
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
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              
              Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} height={256} className="rounded-lg" />
              ))
            ) : (
              categories?.data.slice(0,6).map((category: Category) => (
                <EventCategory key={category._id} title={category.name} imageUrl={category.image} />
              ))
            )}
          </div>
      </div>
    </section>
  );
};

export default EventCategories;
