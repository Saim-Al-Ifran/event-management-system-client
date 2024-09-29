import React from 'react'
import Skeleton from 'react-loading-skeleton';

const SingleEventSkeletonLoading:React.FC = () => {
  return (
     <>
           <div className="container px-4 mx-auto py-8">
        {/* Skeleton for breadcrumbs */}
        <Skeleton width={200} height={20} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skeleton for Event Image */}
          <Skeleton height={400} className="w-full h-[400px] rounded-lg" />

          {/* Skeleton for Event Information */}
          <div className="col-span-1 flex flex-col justify-between">
            <div>
              {/* Title skeleton */}
              <Skeleton width={300} height={40} className="mb-4" />

              {/* Date skeleton */}
              <Skeleton width={150} height={20} className="mb-4" />

              {/* Description skeleton */}
              <Skeleton count={3} height={20} className="mb-6" />

              {/* Location skeleton */}
              <Skeleton width={100} height={20} className="font-bold mb-2" />
              <Skeleton width={200} height={20} className="mb-6" />

              {/* Capacity and Category skeleton */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Skeleton width={100} height={20} className="font-bold mb-2" />
                  <Skeleton width={80} height={20} className="mb-4" />

                  <Skeleton width={100} height={20} className="font-bold mb-2" />
                  <Skeleton width={120} height={20} className="mb-4" />
                </div>

                <div>
                  <Skeleton width={100} height={20} className="font-bold mb-2" />
                  <Skeleton width={80} height={20} className="mb-4" />

                  {/* Status skeleton */}
                  <Skeleton width={80} height={40} className="w-max" />
                </div>
              </div>
            </div>

            {/* Buttons skeleton */}
            <div className="flex space-x-4 mt-6">
              <Skeleton width={150} height={40} className="rounded-lg" />
              <Skeleton width={150} height={40} className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
     </>
  )
}

export default SingleEventSkeletonLoading;