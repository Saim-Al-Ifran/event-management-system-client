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
              }
        }),
        createEvent:builder.mutation<Event,void>({
             query:(data)=>({
                 url:'/event-administration/events',
                 method:'POST',
                 body:data
             })
        }),
        updateEvent:builder.mutation<Event,{id:string,data:Partial<Event>}>({
             query:({id,data})=>({
                 url:`/event-administration/events/${id}`,
                 method:'PUT',
                 body:data
             })
        }),
        deleteEvent:builder.mutation<void,string>({
            query:(id)=>({
                url:`/event-administration/events/${id}`,
                method:'DELETE', 
            })
        }),
        approveEvent:builder.mutation<void,string>({
             query:(id)=>({
                  url:`/event-administration/approve/events/${id}/`,
                  method:'PATCH' 
             })
        })
    })
})

export const {
    useGetAllEventsQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useApproveEventMutation
} = eventsApi;