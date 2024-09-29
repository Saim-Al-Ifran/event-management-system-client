import { Typography } from '@material-tailwind/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const SkeletonLoader: React.FC = () => {
    return (
      <div className="container mx-auto py-8">
         <Skeleton width={200} height={20} className="mb-6" />
        {/* Filter Skeleton */}
        
        <div className="flex flex-wrap mb-8">
          <div className="w-full md:w-1/4 px-2">
            <Typography variant="h6" className="font-bold text-gray-800 mb-4" {...(undefined as any)}>
              <Skeleton width={120} />
            </Typography>
            <div className="space-y-2">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="flex items-center">
                  <Skeleton circle height={20} width={20} />
                  <Skeleton width={100} className="ml-2" />
                </div>
              ))}
            </div>
          </div>
  
          {/* Sort By Skeleton */}
          <div className="w-full md:w-3/4 mt-4 mb-2 px-2">
            <div className="flex justify-between items-center">
              <Typography variant="h6" className="text-2xl font-bold flex items-center mb-4" {...(undefined as any)}>
                <Skeleton width={150} />
              </Typography>
              <div className="flex items-center">
                <Skeleton width={80} className="mr-4" />
                <Skeleton width={150} height={40} />
              </div>
            </div>
  
            {/* Event Cards Skeleton */}
            <div className="grid grid-cols-1 gap-6 mt-[2rem]">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex">
                  {/* Date Skeleton */}
                  <div className="mr-4">
                    <Skeleton height={100} width={70} />
                  </div>
                  {/* Event Info Skeleton */}
                  <div className="flex flex-col">
                    <Skeleton width={180} height={30} />
                    <Skeleton width={120} className="my-2" />
                    <Skeleton width={200} height={60} />
                    <Skeleton width={120} height={40} className="mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default SkeletonLoader