import { apiSlice } from "../api/apiSlice";
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { EndpointBuilder } from '@reduxjs/toolkit/query';

const contactApi = apiSlice.injectEndpoints({
    endpoints: (builder:EndpointBuilder<BaseQueryFn, string, string>) => ({
         sendMessage: builder.mutation({
               query:(data)=>({
                    url:'/event-administration/contact/send-message',
                    method:'POST',
                    body:data
               })
         })
    })
})

export const {
    useSendMessageMutation
} = contactApi