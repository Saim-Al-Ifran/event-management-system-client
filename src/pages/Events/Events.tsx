import React, { useEffect, useState } from 'react';
import { Typography, Select, Option } from "@material-tailwind/react";
import EventCard from '../../components/Events/EventCard';
import { useGetAllEventsQuery } from '../../features/Events/eventsApi';
import { useGetCategoriesQuery } from '../../features/categories/categoriesApi';
import { Category, Event } from '../../types/api-types';
import SkeletonLoader from '../../components/SkeletonReloading/SkeletonLoader';
import { ClipLoader } from 'react-spinners';

const formatDateParts = (dateString: string) => {
  const eventDate = new Date(dateString);
  const date = eventDate.getDate().toString().padStart(2, '0');
  const month = eventDate.toLocaleString('default', { month: 'short' });
  const year = eventDate.getFullYear();
  const time = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  return { date, month, year, time };
};

const EventPage: React.FC = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const [paginationLoading, setPaginationLoading] = useState(false);
  const { data: eventData, isLoading: eventLoading } = useGetAllEventsQuery({page:currentPage,limit});
  const { data: categoryData, isLoading: categoryLoading } = useGetCategoriesQuery();
  const totalPages = eventData?.totalPages; 

  useEffect(()=>{
        setPaginationLoading(false)
  },[eventData])

  const handlePreviousPage = () => {
    setPaginationLoading(true);
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
   
    if (currentPage < totalPages){
      setPaginationLoading(true);
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePageClick = (pageNumber: number) => {
    setPaginationLoading(true);
    setCurrentPage(pageNumber);
  };
  
  return (
    <div className="container mx-auto py-8">
      {/* Filter by Category */}
      {eventLoading || categoryLoading ? (
        <SkeletonLoader />
      ) : (
         <div className="flex flex-wrap mb-8">

          <div className="w-full md:w-1/4 px-2">
            <Typography variant="h6" className="font-bold text-gray-800 mb-4" {...(undefined as any)}>
              Category
            </Typography>
            <div className="space-y-2">
              {categoryData?.data.map((category: Category, index: number) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category.name}
                    className="form-checkbox h-5 w-5 text-[#3F51B5] border-gray-300 rounded focus:ring-0"
                  />
                  <label htmlFor={category.name} className="ml-2 text-gray-700">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-3/4 mt-4 mb-2 px-2">
            <div className="flex justify-between items-center">
              <Typography variant="h6" className="text-2xl font-bold flex items-center mb-4" {...(undefined as any)}>
                <span className="inline-block w-1 h-8 mr-2 bg-[#5d72e7]"></span>
                All Events
              </Typography>
              <div className="flex items-center">
                <Typography variant="body1" className="mr-4" {...(undefined as any)}>Sort By</Typography >
                <Select label="Select Sort Order" {...(undefined as any)}>
                  <Option value="Oldest">Oldest</Option>
                  <Option value="Newest">Newest</Option>
                </Select>
              </div>
            </div>
            {paginationLoading ? (
                <div className="flex justify-center">
                    <ClipLoader color="#607D8B" size={30} />
                </div>
            ):(
            <div className="grid grid-cols-1 gap-6 mt-[2rem]">
              {eventData?.data.map((event: Event, index: number) => {
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
              })}
            </div>
            )}
  

           
            <div className="flex justify-center items-center mt-8">
              <button
                onClick={handlePreviousPage}
                className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
                disabled={currentPage === 1}
              >
                 <i className="fa-solid fa-chevron-left"></i>
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  onClick={() => handlePageClick(index + 1)}
                  key={index}
                  className={`px-3 py-1 mx-1 rounded-lg ${
                    currentPage === index + 1 ? 'bg-[#3F51B5] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
