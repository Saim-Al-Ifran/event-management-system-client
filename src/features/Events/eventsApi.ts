import { apiSlice } from "../api/apiSlice";
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { Event, EventResponse, GetBookingsParams } from "../../types/api-types";

const eventsApi = apiSlice.injectEndpoints({
    endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
        getAllEvents: builder.query<EventResponse,GetBookingsParams>({
              query:({page,limit,search} = {})=>{
                let base = `/event-administration/events?`
                if (page) base += `page=${page}`;
                if (limit) base += `${page ? '&' : ''}limit=${limit}`;
                if (search) base += `${page || limit ? '&' : ''}search=${search}`;
                return base;
              },
              providesTags:['Events']
        }),
        createEvent:builder.mutation<Event,void>({
             query:(data)=>({
                 url:'/event-administration/events',
                 method:'POST',
                 body:data
             }),
             invalidatesTags:['Events']
        }),
        updateEvent:builder.mutation<Event,{id:string,data:Partial<Event>}>({
             query:({id,data})=>({
                 url:`/event-administration/events/${id}`,
                 method:'PUT',
                 body:data
             }),
             invalidatesTags: (_result, _error, { id }) => [
                 'Events',
                { type: 'Event', id },
              ],
        }),
        deleteEvent:builder.mutation<void,string>({
            query:(id)=>({
                url:`/event-administration/events/${id}`,
                method:'DELETE', 
            }),
            invalidatesTags:['Events']
        }),
        approveEvent:builder.mutation<void,string>({
             query:(id)=>({
                  url:`/event-administration/approve/events/${id}/`,
                  method:'PATCH' 
             }),
             invalidatesTags: (_result, _error,  id ) => [
                'Events',
               { type: 'Event', id },
             ],
        })
    }),
    tagTypes:['Events','Event']
})

export const {
    useGetAllEventsQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useApproveEventMutation
} = eventsApi;