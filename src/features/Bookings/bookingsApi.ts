import { apiSlice } from "../api/apiSlice";
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BookingResponse, GetBookingsParams } from "../../types/api-types";

const bookingsApi = apiSlice.injectEndpoints({
    endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
        getAllBookings: builder.query<BookingResponse, GetBookingsParams>({
            query: ({ page, limit, search } = {}) => {
                 let base = `/event-management/events/all_bookings?`;

                 if (page) base += `page=${page}`;
                 if (limit) base += `${page ? '&' : ''}limit=${limit}`;
                 if (search) base += `${page || limit ? '&' : ''}search=${search}`;

                 return base;
            },
            providesTags:['Booking']
        }),
        getUserBookings:builder.query({
               query:()=>'/event-management/events/bookings',
               providesTags:['Booking']
        }),
        requestedToDeleteBooking:builder.mutation({
            query: (id: string) => ({
                url: `/event-management/events/bookings/${id}/request-cancellation`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Booking']
        }),
        deleteRequestedBooking: builder.mutation<void, string>({
            query: (id: string) => ({
                url: `/event-management/events/bookings/${id}/delete_requested_booking`,
                method: 'DELETE'
            }),
            invalidatesTags:['Booking']
        })
    }),
    tagTypes: ['Booking'],
})

export const {
     useGetAllBookingsQuery,
     useDeleteRequestedBookingMutation,
     useGetUserBookingsQuery,
     useRequestedToDeleteBookingMutation
} = bookingsApi;