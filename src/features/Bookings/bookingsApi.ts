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
            }
        })
    })
})

export const { useGetAllBookingsQuery } = bookingsApi;
