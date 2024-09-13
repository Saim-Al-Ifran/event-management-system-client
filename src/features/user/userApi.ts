import { apiSlice } from "../api/apiSlice";
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { EndpointBuilder } from '@reduxjs/toolkit/query';

// Helper function to build the URL based on role, pagination, and search
const getUrlForRole = (
    role: 'admin' | 'super-admin', 
    entity: 'users' | 'entities', 
    id?: string, 
    page?: number, 
    limit?: number, 
    search?: string
) => {
    let baseUrl = `/event-administration`;

    // Construct URL based on role
    if (role === 'admin') {
        baseUrl += `/${role}/${entity}`;
    }
    if (role === 'super-admin') {
        baseUrl += `/${entity}`;
    }

    // Add query parameters: pagination and search
    const paginationParams = page && limit ? `page=${page}&limit=${limit}` : '';
    const searchParams = search ? `search=${encodeURIComponent(search)}` : '';
    
    // Combine query parameters if both are present
    const queryParams = [paginationParams, searchParams].filter(Boolean).join('&');
    const finalUrl = id ? `${baseUrl}/${id}` : `${baseUrl}?${queryParams}`;
    
    console.log("Constructed URL: ", finalUrl);
    return finalUrl;
};

const userApi = apiSlice.injectEndpoints({
    endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
        
        // Generalized get users query with pagination and search
        getUsers: builder.query({
            query: ({ role, entity, page = 1, limit = 10, search = '' }) => 
                getUrlForRole(role, entity, undefined, page, limit, search),
        }),

        createUser: builder.mutation({
            query: ({ role, entity, data }) => ({
                url: getUrlForRole(role, entity),
                method: 'POST',
                body: data
            })
        }),

        updateUser: builder.mutation({
            query: ({ role, entity, id, data }) => ({
                url: getUrlForRole(role, entity, id),
                method: 'PUT',
                body: data
            })
        }),

        deleteUser: builder.mutation({
            query: ({ role, entity, id }) => ({
                url: getUrlForRole(role, entity, id),
                method: 'DELETE'
            })
        })
    })
});

export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi;
