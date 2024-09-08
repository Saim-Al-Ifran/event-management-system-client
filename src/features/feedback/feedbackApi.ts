import { apiSlice } from "../api/apiSlice";
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { FeedbackRequest, FeedbackResponse } from "../../types/api-types";
const feedbackApi = apiSlice.injectEndpoints({
    endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
        getFeedback: builder.query<FeedbackResponse,FeedbackRequest>({
            query: ({page,limit} = {}) =>  {
                 let base = `/event-administration/contact/feedback?`;

                 if (page) base += `page=${page}`;
                 if (limit) base += `${page ? '&' : ''}limit=${limit}`;


                 return base;
            }
        })
    })
})
export const { useGetFeedbackQuery } = feedbackApi;