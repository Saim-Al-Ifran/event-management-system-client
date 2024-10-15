import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 
import Swal from 'sweetalert2'; // Import SweetAlert
import { useGetUserBookingsQuery, useRequestedToDeleteBookingMutation } from '../../features/Bookings/bookingsApi';
import { UserBooking } from '../../types/api-types';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon (you can use any spinner)

const MyBookings: React.FC = () => {
  const { data: bookingsData, isLoading } = useGetUserBookingsQuery();
  const [requestedToDeleteBooking, { isLoading: isFetching, isSuccess }] = useRequestedToDeleteBookingMutation();
  
  // Local state to track which booking is being requested for deletion
  const [deletingBookingId, setDeletingBookingId] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess) {
      Swal.fire('Requested!', 'Your request to delete this booking has been sent.', 'success');
      // Reset deletingBookingId after the request is successful
      setDeletingBookingId(null);
    }
  }, [isSuccess]);

  const handleRequestToDelete = async (bookingId: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to undo this action!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, request delete!',
      });

      if (result.isConfirmed) {
        // Set the current booking being requested to delete
        setDeletingBookingId(bookingId);
        // Send request to delete the booking
        await requestedToDeleteBooking(bookingId);
      }
    } catch (error) {
      // Handle error if the request fails
      Swal.fire('Error!', 'There was a problem requesting the deletion.', 'error');
      console.error('Failed to request booking deletion:', error);
    }
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
                // Destructure event data from the booking
                const { eventId: { image, title, date, location }, attendeEmail, amount, requestToDelete, _id } = booking;

                return (
                  <tr key={_id}>
                    {/* Event Image */}
                    <td>
                      <img
                        src={image}
                        alt={title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>

                    {/* Event Title */}
                    <td>{title}</td>

                    {/* Event Date */}
                    <td>{new Date(date).toLocaleDateString()}</td>

                    {/* Event Location */}
                    <td>{location}</td>

                    {/* Attendee Email */}
                    <td>{attendeEmail}</td>

                    {/* Amount Paid */}
                    <td>${amount}</td>

                    {/* Request to Delete Booking */}
                    <td className="text-center">
                      <button
                        className={`btn ${requestToDelete ? 'btn-disabled' : 'btn-error'} btn-sm flex items-center`}
                        onClick={() => handleRequestToDelete(_id)}
                        disabled={requestToDelete || isFetching || deletingBookingId === _id}  // Disable button when request is in progress or already requested
                      >
                        {deletingBookingId === _id ? (
                          <FaSpinner className="animate-spin mr-2" /> // Show loading spinner for specific booking
                        ) : null}
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
