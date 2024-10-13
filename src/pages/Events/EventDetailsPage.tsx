import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation} from 'react-router-dom';
import { useGetSingleEventQuery } from '../../features/Events/eventsApi';
import { Breadcrumbs, Typography, Button, Chip } from '@material-tailwind/react';
import 'react-loading-skeleton/dist/skeleton.css';  
import SingleEventSkeletonLoading from '../../components/SkeletonReloading/singleEventLoading';
 
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import PaymentModal from '../../components/Checkout/PaymentModal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const formatDateParts = (dateString: string) => {
  const eventDate = new Date(dateString);
  const date = eventDate.getDate().toString().padStart(2, '0');
  const month = eventDate.toLocaleString('default', { month: 'short' });
  const year = eventDate.getFullYear();
  return { date, month, year };
};

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<string>();
  const { data: event, isLoading, error } = useGetSingleEventQuery(id);
  const getUser = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const navigateLocation = useLocation();
  const [openModal, setOpenModal] = useState(false);
   
  
  
  if (isLoading) {
    return (
        <SingleEventSkeletonLoading/>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Failed to load event details. Please try again later.</div>;
  }

  if (!event) {
    return <div className="text-center text-gray-500">No event found.</div>;
  }

  const { title, description, date, image, location, capacity, category, price, status } = event;
  const { date: day, month, year } = formatDateParts(date);

  const  handleClick = ()=> {
       if(!getUser?.accessToken && !getUser?.user){
           navigate(`/login?redirect=${navigateLocation.pathname}`);
       }else{
          setOpenModal(true);
       }
      
  }

  const handlePaymentSubmit = () => {

    setOpenModal(false);  
  };

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="bg-gray-100 py-2">
        <div className="container px-4 mx-auto">
          <Breadcrumbs separator="/" className="text-gray-600" {...(undefined as any)}>
            <Link to="/" className="hover:underline text-[#1d1d20]">Home</Link>
            <Link to="/events" className="hover:underline text-[#3F51B5]">Events</Link>
            <Typography className="text-gray-500"  {...(undefined as any)}>{title}</Typography>
          </Breadcrumbs>
        </div>
      </nav>

      <div className="container px-4 mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
          <div className="col-span-1">
            <div className="w-full h-[400px]">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
 
          <div className="col-span-1 flex flex-col justify-between">
            <div>
              <Typography variant="h2" className="text-3xl font-bold mb-4" {...(undefined as any)}>
                {title}
              </Typography>

              <Typography variant="subtitle1" className="text-gray-600 mb-4"  {...(undefined as any)}>
                {`${day} ${month}, ${year}`}
              </Typography>

              <Typography variant="body1" className="text-gray-800 mb-6"  {...(undefined as any)}>
                {description}
              </Typography>

              <Typography variant="subtitle1" className="font-bold mb-2"  {...(undefined as any)}>
                Location:
              </Typography>
              <Typography variant="body2" className="text-gray-700 mb-6"  {...(undefined as any)}>
                {location || 'To be announced'}
              </Typography>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Typography variant="subtitle1" className="font-bold mb-2"  {...(undefined as any)}>
                    Capacity:
                  </Typography>
                  <Typography variant="body2" className="text-gray-700 mb-4"  {...(undefined as any)}>
                    {capacity || 'N/A'}
                  </Typography>

                  <Typography variant="subtitle1" className="font-bold mb-2"  {...(undefined as any)}>
                    Category:
                  </Typography>
                  <Typography variant="body2" className="text-gray-700"  {...(undefined as any)}>
                    {category?.name || 'N/A'}
                  </Typography>
                </div>

                <div>
                  <Typography variant="subtitle1" className="font-bold mb-2" {...(undefined as any)}>
                    Price:
                  </Typography>
                  <Typography variant="body2" className="text-gray-700 mb-4" {...(undefined as any)}>
                    {price ? `$${price}` : 'Free'}
                  </Typography>

                  <Chip
                    variant="gradient"
                    color={
                      status === "active"
                        ? "green"
                        : status === "completed"
                          ? "yellow"
                          : "blue-gray"
                    }
                    value={status}
                    className="w-max"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <Button
                  variant="filled"
                  className=" bg-[#3F51B5]"
                  size="lg" 
                  {...(undefined as any)}
                  onClick={handleClick}
               >
                Book Tickets
              </Button>
              <Link to='/events' >
                <Button variant="outlined" size="lg"  {...(undefined as any)}>
                  All Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

       <Elements stripe={stripePromise}>
          <PaymentModal 
              openModal={openModal}
              setOpenModal={setOpenModal}
              handlePaymentSubmit={handlePaymentSubmit}
          />
       </Elements>

    </>
  );
};

export default EventDetailsPage;
