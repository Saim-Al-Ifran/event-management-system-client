import { apiSlice } from "../api/apiSlice";
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
 

const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
 
    paymentIntent: builder.mutation({
      query: (data) => ({
        url: `/payment/create-payment-intent`, 
        method: 'POST',  
        body: data,
      }),
    }),
    confirmPayment:builder.mutation({
      query: (data) => ({
        url: `/payment/confirm-payment`, 
        method: 'POST',  
        body: data,
      }),
    })
  }),
  
});

export const {
    usePaymentIntentMutation,
    useConfirmPaymentMutation
} = paymentApi;
