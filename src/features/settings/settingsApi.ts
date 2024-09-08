import { apiSlice } from "../api/apiSlice";
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { SettingsState } from "../../types/types";

const settingsApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getSettings: builder.query<SettingsState[],void>({
      query: () => `/event-administration/settings`,
    }),

    createSettings: builder.mutation({
      query: (newSettings) => ({
        url: `/event-administration/settings`, 
        method: 'POST',  
        body: newSettings,
      }),
    }),
  }),
  
});

export const { useGetSettingsQuery, useCreateSettingsMutation } = settingsApi;
