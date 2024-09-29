import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@material-tailwind/react';
import { useGetCategoriesQuery } from '../../features/categories/categoriesApi';
import { Category } from '../../types/api-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import EventCategory from '../../components/Cateogory/EventCategory';

const EventCategories: React.FC = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <>
     
      <nav className="bg-gray-100 py-2">
        <div className="container px-4 mx-auto">
          {isLoading ? (
            <Skeleton height={20} width={200} />
          ) : (
            <Breadcrumbs separator="/" className="text-gray-600" {...(undefined as any)}>
              <Link to="/" className="hover:underline text-[#3F51B5]">
                Home
              </Link>
              <Link to="/events" className="hover:underline text-[#3F51B5]">
                Events
              </Link>
              <Typography className="text-gray-500" {...(undefined as any)}>
                Categories
              </Typography>
            </Breadcrumbs>
          )}
        </div>
      </nav>

  
      <section className="py-8 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            {isLoading ? (
              <Skeleton height={36} width={300} />
            ) : (
              <Typography variant="h2" className="text-3xl font-bold flex items-center" {...(undefined as any)}>
                <span className="inline-block w-1 h-8 mr-2 bg-[#5d72e7]"></span>
                EVENTS BY CATEGORIES
              </Typography>
            )}
          </div>

       
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} height={256} className="rounded-lg" />
              ))
            ) : (
              categories?.data.map((category: Category) => (
                <EventCategory key={category._id} title={category.name} imageUrl={category.image} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default EventCategories;
