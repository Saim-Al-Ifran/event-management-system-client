import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 
import { useGetUserBookingsQuery } from '../../features/Bookings/bookingsApi';
import { UserBooking } from '../../types/api-types';



const MyBookings: React.FC = () => {
  const { data: bookingsData, isLoading } = useGetUserBookingsQuery();

  // Placeholder function for requesting to delete a booking
  const handleRequestToDelete = (bookingId: string) => {
    console.log('Requesting to delete booking with ID:', bookingId);
  };

  return (
    <div className="container mx-auto mt-8 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Bookings</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Event Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Attendee Email</th>
              <th>Amount</th>
              <th>Request to Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Render skeleton rows if loading
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton circle={true} height={64} width={64} />
                  </td>
                  <td>
                    <Skeleton width={150} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={120} />
                  </td>
                  <td>
                    <Skeleton width={180} />
                  </td>
                  <td>
                    <Skeleton width={50} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                </tr>
              ))
            ) : (
               
              bookingsData?.bookings?.map((booking: UserBooking) => {
                 
                const { eventId: { image, title, date, location }, attendeEmail, amount, requestToDelete, _id } = booking;

                return (
                  <tr key={_id}>
               
                    <td>
                      <img
                        src={image}
                        alt={title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>                 
                    <td>{title}</td>            
                    <td>{new Date(date).toLocaleDateString()}</td>
                    <td>{location}</td>
                    <td>{attendeEmail}</td>
                    <td>${amount}</td>
                    <td className="text-center">
                      <button
                        className={`btn ${
                          requestToDelete ? 'btn-disabled' : 'btn-error'
                        } btn-sm`}
                        onClick={() => handleRequestToDelete(_id)}
                        disabled={requestToDelete}
                      >
                        {requestToDelete ? 'Requested' : 'Request Delete'}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
