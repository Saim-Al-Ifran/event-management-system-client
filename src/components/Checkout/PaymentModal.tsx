import { 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement, 
  useElements, 
  useStripe 
} from '@stripe/react-stripe-js';
import { Button } from '@material-tailwind/react';
import { CustomModalProps } from '../../types/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleEventQuery } from '../../features/Events/eventsApi';
import { useConfirmPaymentMutation, usePaymentIntentMutation } from '../../features/payment/paymentApi';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';


const PaymentModal: React.FC<CustomModalProps> = ({ openModal, setOpenModal, handlePaymentSubmit }) => {
  if (!openModal) return null;
  const {id} = useParams();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentLoading,setPaymentLoading] = useState(false);
  const {data:singleEvent} = useGetSingleEventQuery(id);
  const [paymentIntent,{isSuccess:isPaymentIntentSuccess,data}] = usePaymentIntentMutation();
  const [confirmPayment] = useConfirmPaymentMutation();
  const getUser = useSelector((state: RootState) => state.auth.user);
  const stripe = useStripe();
  const elements = useElements();
  console.log(clientSecret);
  
 

  useEffect(()=>{
       paymentIntent({price:singleEvent?.price})
  },[singleEvent?.price])
  
  useEffect(()=>{
         setClientSecret(data?.clientSecret);                
  },[isPaymentIntentSuccess])

  const handleSubmitPayment  = async()=>{
    setPaymentLoading(true);

    if (!stripe || !elements) {
      return;
    }
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          email:getUser?.email,
          name: getUser?.name
        }
      }
    });

    if (confirmError) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      handlePaymentSubmit();
      console.log(confirmError);
      
 
    } else {
      if (paymentIntent.status === 'succeeded') {
     
          Swal.fire({
            title: 'Congratulations!',
            text: 'Your payment has completed successfully!',
            icon: 'success'
          });
      
          handlePaymentSubmit();
          await confirmPayment({
            eventId:singleEvent?._id,
            attendeEmail:getUser?.email,
            amount:singleEvent?.price
          })
  
      }
    }

  }

  const cardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding: '10px 12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f5f5f5',
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

        {/* Card Number Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Card Number</label>
          <CardNumberElement options={cardElementOptions} />
        </div>

        {/* CVC Input */}
        <div className="mb-4">
          <label className="block text-gray-700">CVC</label>
          <CardCvcElement options={cardElementOptions} />
        </div>

        {/* Expiration Date Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Expiration Date</label>
          <CardExpiryElement options={cardElementOptions}  />
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end">
          <Button
            className="px-4 py-2 mr-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => setOpenModal(false)}
            {...(undefined as any)}
          >
            Cancel
          </Button>
          <Button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleSubmitPayment}
            loading={paymentLoading}
            {...(undefined as any)}
          >
            Confirm Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
 

