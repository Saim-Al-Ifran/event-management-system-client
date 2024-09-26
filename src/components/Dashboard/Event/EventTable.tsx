import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import "../../../style/responsive.Table.css";
import { NavLink } from "react-router-dom";
import { useDeleteEventMutation, useGetAllEventsQuery } from "../../../features/Events/eventsApi";
import {  useEffect, useState } from "react";
import { ClipLoader, FadeLoader } from "react-spinners";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const TABLE_HEAD = ["Image", "Title", "Status", "Location", "Price", "Actions"];

function EventTable() {
  
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const limit = 5;
  const { data: events, isLoading,isError,error:fetchError } = useGetAllEventsQuery({page,limit,search:searchQuery});
  const [deleteEvent,{isError:delError,isSuccess:delSuccess,error}] = useDeleteEventMutation();
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);
  
  
  useEffect(()=>{
    if(delSuccess){

     Swal.fire({
      title: '<span>Deleted!</span>',
      html: '<span>The event has been deleted.</span>',
      icon: 'success',
      confirmButtonColor:'#607D8B'
    });

    }

    if(delError){
      Swal.fire(
        'Error!',
        `${error?.data?.message}`,
        'error'
      );
   }

},[delSuccess,delError]);


  useEffect(() => {
    setPaginationLoading(false);  
    setSearchLoading(false);
 }, [events]);

 const noEventsFound = isError && fetchError?.status === 404 && fetchError?.data?.message === "No events found!!";
 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader color="#607D8B" size={50} {...(undefined as any)}/>
      </div>
    );
  }


  const handlePrevious = () => {
    setPaginationLoading(true);
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (events?.totalPages && page < events?.totalPages) {
      setPaginationLoading(true);
      setPage(page + 1);
    }
  };

  const handleDeleteEvent = async (id:string)=>{
    
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#607D8B',
      cancelButtonColor: '#F44336',
      confirmButtonText: 'Yes, delete it!'
    });
    if(result.isConfirmed){  
      setDeletingEventId(id)
      await deleteEvent(id)
    
    }
}

  return (
     <>
     {(fetchError?.status === 404  && !searchQuery) ? (
              <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
              <h1 className="text-2xl font-bold text-red-500 mb-4">No event data found!</h1>
              <Link to="/dashboard/event/add">
              <Button
                className="flex items-center gap-3  text-white font-medium px-4 py-2 rounded-lg shadow-md transition duration-300"
                size="sm"
                {...(undefined as any)}
              >
                <i className="fa-regular fa-calendar-plus"></i>
                Add Event
              </Button>
              </Link>
    
            </div>
     ):(
           <Card className="users-table-card"  {...(undefined as any)}>
      <CardHeader floated={false} shadow={false} className="rounded-none"  {...(undefined as any)}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray"  {...(undefined as any)}>
              Events List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal"  {...(undefined as any)}>
              See information about all events
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <NavLink to="/dashboard/event/add">
              <Button className="flex items-center gap-3" size="sm"  {...(undefined as any)}>
                <i className="fa-regular fa-calendar-plus"></i> Add Event
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max"></Tabs>
          <div className="w-full md:w-72 mb-4">
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
     
      <CardBody className="px-0 pt-0 pb-2"  {...(undefined as any)}>
        <div className="table-container">
          {paginationLoading || (searchLoading && !noEventsFound) ? (
                <div className="flex justify-center">
                      <ClipLoader color="#607D8B" size={30} />
                </div>
          ) : (
            <div className="table-container flex justify-center items-center">
              {noEventsFound? (
                  <div className="text-center p-4">
                          <Typography variant="h6" color="red" className="font-normal" {...(undefined as any)}> 
                            No events found for the search term "{searchQuery}"
                          </Typography>
                  </div>
              ):(
                               <table className="users-table w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
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
                  {events?.data?.map((event: any, index: number) => {
                    const isLast = index === events.data.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={event._id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar src={event.image} alt={event.title} size="md"  {...(undefined as any)} />
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              {...(undefined as any)}
                            >
                              {event.title}
                            </Typography>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal opacity-70"
                              {...(undefined as any)}
                            >
                              {new Date(event.date).toLocaleDateString()}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Chip
                            variant="gradient"
                            color={
                              event.status === "active"
                                ? "green"
                                : event.status === "completed"
                                ? "yellow"
                                : "blue-gray"
                            }
                            value={event.status}
                            className="w-max"
                          />
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            {...(undefined as any)}
                          >
                            {event.location}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            {...(undefined as any)}
                          >
                            ${event.price}
                          </Typography>
                        </td>
    
                        <td className={classes}>
                          <NavLink to={`/dashboard/event/edit/${event._id}`}>
                            <Tooltip content="Edit Event">
                              <Button
                                color="blue-gray"
                                variant="filled"
                                size="md"
                                className="mr-2"
                                {...(undefined as any)}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </Button>
                            </Tooltip>
                          </NavLink>

                          <Tooltip content="Delete Event">
                            <Button
                              color="red"
                              size="md"
                              {...(undefined as any)}
                              onClick={()=>handleDeleteEvent(event._id)}
                              disabled={deletingEventId === event._id}
                            >
                              {deletingEventId=== event._id? (
                                  <span><ClipLoader color="white" size={15} /></span>
                                ) : (
                                  <i className="fa-solid fa-trash"></i>
                                )}
                            </Button>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                </table>
              )}
 
            </div>

          )}

        </div>
      </CardBody>

   { !noEventsFound && (
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"  {...(undefined as any)}>
      <Typography variant="small" color="blue-gray" className="font-normal"  {...(undefined as any)}>
        Page {page} of {events?.totalPages}
      </Typography>
      <div className="flex gap-2">
        <Button
            variant="outlined"
            size="sm"
            onClick={handlePrevious}
            disabled={page === 1}
            {...(undefined as any)}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={handleNext}
            disabled={page === events?.totalPages}
            {...(undefined as any)}
          >
            Next
          </Button>
      </div>
    </CardFooter>
   ) }  
     
       </Card>
     )}
  
     </>

  );
}

export default EventTable;
