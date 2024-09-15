import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";
import "../../../style/responsive.Table.css";
import { useDeleteRequestedBookingMutation, useGetAllBookingsQuery } from "../../../features/Bookings/bookingsApi";
import { ClipLoader, FadeLoader } from "react-spinners";
import { Booking } from "../../../types/api-types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const TABLE_HEAD = ["Image", "Title", "Location", "Price", "Delete Request"];

function BookingTable() {
  const [page, setPage] = useState(1);
  const limit = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingBookingId, setDeletingBookingId] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);  
  const { data: bookings, isLoading, isError,error:fetchError } = useGetAllBookingsQuery({
    page,
    limit,
    search: searchQuery,
  });
  const [deleteRequestedBooking,{isSuccess:delSuccess,isError:delError,error}] = useDeleteRequestedBookingMutation()

  useEffect(()=>{
    if(delSuccess){
      Swal.fire({
        title: '<span>Deleted!</span>',
        html: '<span>The booking data has been deleted.</span>',
        icon: 'success',
        confirmButtonColor:'#607D8B'
      });
    }
    if(delError){
      console.log(error);
      Swal.fire('Error!', 'Failed to delete the booking.', 'error');
    }
  }, [delSuccess, delError]);

  useEffect(() => {
    setPaginationLoading(false); 
    setSearchLoading(false);
  }, [bookings]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <FadeLoader color="#607D8B" size={50} {...(undefined as any)} />
      </div>
    );
  }

  const noBookingsFound = isError && fetchError?.status === 404 && fetchError?.data?.message === "No booking found!"

  
  const handlePrevious = () => {
    if (page > 1) {
      setPaginationLoading(true);  
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (bookings?.totalPages && page < bookings.totalPages) {
      setPaginationLoading(true); 
      setPage(page + 1);
    }
  };

  const handleRequestDelete = async (bookingId: string, requestToDelete: boolean) => {
    if (requestToDelete) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#607D8B',
        cancelButtonColor: '#F44336',
        confirmButtonText: 'Yes, delete it!'
      });
      if (result.isConfirmed) {  
        setDeletingBookingId(bookingId);
        await deleteRequestedBooking(bookingId);
      }
    } 
  };

  return (
    <Card className="users-table-card" {...(undefined as any)}>
      <CardHeader floated={false} shadow={false} className="rounded-none" {...(undefined as any)}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" {...(undefined as any)}>
              Bookings List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal" {...(undefined as any)}>
              Overview of your bookings
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:mr-1">
            <Input
              label="Search"
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
      </CardHeader>

      <CardBody className="px-0 pt-0 pb-2" {...(undefined as any)}>
        {paginationLoading || (searchLoading && !noBookingsFound ) ?(
          <div className="flex justify-center">
            <ClipLoader color="#607D8B" size={30} />
          </div>
        ) : (
          <div className="table-container">
            {noBookingsFound  ? (
                 <div className="text-center p-4">
                       <Typography variant="h6" color="red" className="font-normal" {...(undefined as any)}> 
                            No bookings data found for the search term "{searchQuery}"
                       </Typography>
                </div>
            ) : (
                        <table className="users-table w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                        {...(undefined as any)}
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings?.data?.map(({ event, _id, requestToDelete }: Booking, index: number) => {
                  const isLast = index === bookings.data.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={event?.image} alt={event?.title} size="md" {...(undefined as any)} />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                            {event?.title}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                          {event?.location}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
                          ${event?.price.toFixed(2)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Button
                          color={requestToDelete ? "red" : "green"}
                          size="sm"
                          onClick={() => handleRequestDelete(_id, requestToDelete)}
                          disabled={deletingBookingId === _id}
                          {...(undefined as any)}
                        >
                          {deletingBookingId === _id ? (
                            <span><ClipLoader color="white" size={15} /></span>
                          ) : (
                            requestToDelete ? "Delete Requested" : "Active"
                          )}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            )}
  
          </div>
        )}
      </CardBody>
      {!noBookingsFound && (
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" {...(undefined as any)}>
      <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
        Page {page} of {bookings?.totalPages || 1}
      </Typography>
      <div className="flex gap-2">
        <Button
          variant="outlined"
          size="sm"
          onClick={handlePrevious}
          disabled={page === 1 || paginationLoading}
          {...(undefined as any)}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          size="sm"
          onClick={handleNext}
          disabled={page === bookings?.totalPages || paginationLoading}
          {...(undefined as any)}
        >
          Next
        </Button>
      </div>
    </CardFooter>
      ) }

    </Card>
  );
}

export default BookingTable;
