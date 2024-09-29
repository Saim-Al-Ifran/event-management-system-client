import React, { useEffect, useState } from 'react';
import { Typography, Select, Option, Breadcrumbs, Input, Tabs } from "@material-tailwind/react";
import EventCard from '../../components/Events/EventCard';
import { useGetAllEventsQuery } from '../../features/Events/eventsApi';
import { useGetCategoriesQuery } from '../../features/categories/categoriesApi';
import { Category, Event } from '../../types/api-types';
import SkeletonLoader from '../../components/SkeletonReloading/SkeletonLoader';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Skeleton from 'react-loading-skeleton';

const formatDateParts = (dateString: string) => {
  const eventDate = new Date(dateString);
  const date = eventDate.getDate().toString().padStart(2, '0');
  const month = eventDate.toLocaleString('default', { month: 'short' });
  const year = eventDate.getFullYear();
  const time = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  return { date, month, year, time };
};
const getPageNumbers = (totalPages: number, currentPage: number) => {
  const delta = 2;
  const range: (number | string)[] = [];
  let left = Math.max(2, currentPage - delta);
  let right = Math.min(totalPages - 1, currentPage + delta);

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
  } else {
    range.push(1);
    if (left > 2) range.push('...');
    for (let i = left; i <= right; i++) {
      range.push(i);
    }
    if (right < totalPages - 1) range.push('...');
    range.push(totalPages);
  }

  return range;
};


const EventPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const [selectedCategoryLoading, setselectedCategoryLoading] = useState<boolean>(false);
  const [sortLoading, setSortLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 
  const [searchLoading, setSearchLoading] = useState<boolean>(false); 
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { data: eventData, isLoading: eventLoading,error:eventError} = useGetAllEventsQuery({
     page: currentPage,
     limit,
     categoryFilter:selectedCategory,
     sort:sortOrder,
     search:searchQuery
    });
  const { data: categoryData, isLoading: categoryLoading,error:errorCategory} = useGetCategoriesQuery();
  const totalPages = eventData?.totalPages || 1; 
  
  useEffect(() => {
    setPaginationLoading(false);
    setselectedCategoryLoading(false);
    setSortLoading(false);
    setSearchLoading(false)
  }, [eventData?.data]);

  useEffect(()=>{
    setselectedCategoryLoading(false);
    setPaginationLoading(false);
    setSearchLoading(false);
    setSortLoading(false);

  },[eventError,errorCategory])

  useEffect(()=>{
       setCurrentPage(1);
       setSearchQuery('')
  },[selectedCategory]);

  useEffect(()=>{
    setCurrentPage(1);
  },[searchQuery]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setPaginationLoading(true);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPaginationLoading(true);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setPaginationLoading(true);
      setCurrentPage(pageNumber);
    }
  };

  const handleCategoryChange = (categoryName: string) => {

    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      setselectedCategoryLoading(true);
    } else {
      setSelectedCategory(categoryName);
      setselectedCategoryLoading(true);
    }

  };
  const handleSoringChange = (sort:string)=>{
    if(sortOrder !== sort){
      setSortOrder(sort);
      setCurrentPage(1);
      setSortLoading(true);
    }
 
  }
 
  
 
  return (
    <>
     {eventLoading || categoryLoading ? (
        <nav className="bg-gray-100 py-2">
             <Skeleton width={200} height={20} className="mb-6" />
        </nav>
     ) : (
          <nav className="bg-gray-100 py-2">
            <div className="container px-4 mx-auto">
              <Breadcrumbs separator="/" className="text-gray-600" {...(undefined as any)}>
                <Link to="/" className="hover:underline text-[#3F51B5]">
                  Home
                </Link>
                <Typography className="text-gray-500" {...(undefined as any)}>Events</Typography>
              </Breadcrumbs>
            </div>
          </nav>
     )}

        
      {eventLoading || categoryLoading ? (
            <div className="container px-4 mx-auto mt-4 flex justify-end" >
            <Skeleton width={150} height={40} />
          </div>
      ) : (
              <div className="container px-4 mx-auto mt-4">
        <div className="flex justify-end items-center">
        <Tabs value="all" className="w-full md:w-max"></Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search events..."
              icon={<MagnifyingGlassIcon className="h-5 w-5 mb-2" />}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSearchLoading(true)
              }}
              {...(undefined as any)}
            />
          </div>
        </div>
      </div>
      )}


    <div className="container mx-auto py-8">
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
                    checked={selectedCategory === category.name}  
                    onChange={() => handleCategoryChange(category.name)}  
                  />
                  <label htmlFor={category.name} className="ml-2 text-gray-700">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {eventError?.status === 404 ? (
            <div className="w-full md:w-3/4 px-2">
                  <div className="text-red-500 text-center">
                      {eventError && <p>No events data found!!</p>}
                  </div>
            </div>

          ):(
           <div className="w-full md:w-3/4 mt-4 mb-2 px-2">
            <div className="flex justify-between items-center">
              <Typography variant="h6" className="text-2xl font-bold flex items-center mb-4" {...(undefined as any)}>
                <span className="inline-block w-1 h-8 mr-2 bg-[#5d72e7]"></span>
                All Events
              </Typography>
              <div className="flex items-center">
                <Typography variant="body1" className="mr-4" {...(undefined as any)}>Sort By</Typography>
                
                <Select 
                  label="Select Sort Order"
                  onChange={(value) => handleSoringChange(value as string)} 
                  {...(undefined as any)}
                >
                  <Option value="asc">Oldest</Option>
                  <Option value="desc">Newest</Option>
                </Select>

              </div>
            </div>

            {(paginationLoading || selectedCategoryLoading || sortLoading || searchLoading) ? (
              <div className="flex justify-center">
                <ClipLoader color="#607D8B" size={30} />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 mt-[2rem]">
                {eventData?.data.map((event: Event, index: number) => {
                  const { date, month, year} = formatDateParts(event.date);
                  return (
                    <EventCard
                      key={index}
                      id={event._id}
                      date={date}
                      month={month}
                      year={year}
                      time={`${date} ${month}, ${year}`}
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
{!selectedCategoryLoading && !searchLoading && (
  <div className="flex justify-center items-center mt-8">
    <button
      onClick={handlePreviousPage}
      className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
      disabled={currentPage === 1}
    >
      <i className="fa-solid fa-chevron-left"></i>
    </button>

    {getPageNumbers(totalPages, currentPage).map((page, index) =>
      page === '...' ? (
        <span key={index} className="px-3 py-1 mx-1">...</span>
      ) : (
        <button
          onClick={() => handlePageClick(page as number)}
          key={index}
          className={`px-3 py-1 mx-1 rounded-lg ${
            currentPage === page ? 'bg-[#3F51B5] text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {page}
        </button>
      )
    )}

    <button
      onClick={handleNextPage}
      className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
      disabled={currentPage === totalPages}
    >
      <i className="fa-solid fa-chevron-right"></i>
    </button>
  </div>
)}

          </div>
          )}


        </div>
      )}
    </div>
    </>

  );
};

export default EventPage;
