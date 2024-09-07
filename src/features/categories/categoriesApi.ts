import { apiSlice } from "../api/apiSlice";
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { Category } from "../../types/api-types";
import { CategoryRequest } from "../../types/api-types";

const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
 
    getCategories: builder.query<Category[], CategoryRequest>({
      query: ({ page, limit, search } = {}) => {
          let base = `/event-administration/categories?`;

          if (page) base += `page=${page}`;
          if (limit) base += `${page ? '&' : ''}limit=${limit}`;
          if (search) base += `${page || limit ? '&' : ''}search=${search}`;
          
          return base;
      },
      providesTags: ['Categories'],
    }),
    getSingleCategory:builder.query<Category[],string>({
      query:(id)=>`/event-administration/categories/${id}`,
      providesTags:(_result,_error,id)=>[
        {type:'category', id}
    ]
    }),
    
    createCategory: builder.mutation<void, Partial<Category>>({
      query: (data) => ({
        url: '/event-administration/categories/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Categories'],
    }),
 
    updateCategory: builder.mutation<void, { id: string; data: Partial<Category> }>({
      query: ({ id, data }) => ({
        url: `/event-administration/categories/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        'Categories',
        { type: 'category', id },
      ],
    }),  
   
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/event-administration/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
  tagTypes: ['Categories', 'category'],
});

export const {
  useGetCategoriesQuery,
  useGetSingleCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;

export default categoriesApi;
