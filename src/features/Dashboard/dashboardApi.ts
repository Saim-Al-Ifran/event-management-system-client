import { apiSlice } from "../api/apiSlice";
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { EndpointBuilder } from '@reduxjs/toolkit/query';

const dashboardApi = apiSlice.injectEndpoints({
    endpoints: (builder:EndpointBuilder<BaseQueryFn, string, string>) => ({
         getDashboardData: builder.query({
               query:()=>'event-administration/dashboard/'
         })
    })
})

export const {
    useGetDashboardDataQuery
} = dashboardApi