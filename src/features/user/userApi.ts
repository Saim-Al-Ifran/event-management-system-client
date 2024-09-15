import { apiSlice } from "../api/apiSlice";
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { AllUserResponse,SingleUserResponse,CreateUserResponse, GetUsersParams, UserDeleteRequest, UserRequest, UserUpdateResponse } from "../../types/api-types";


const getUrlForRole = (
    role: 'admin' | 'super-admin', 
    entity: 'users' | 'entities', 
    id?: string, 
    page?: number, 
    limit?: number, 
    search?: string
) => {
    let baseUrl = `/event-administration`;

    if (role === 'admin') {
        baseUrl += `/${role}/${entity}`;
    }
    if (role === 'super-admin') {
        baseUrl += `/${entity}`;
    }
    
    
    const paginationParams = page && limit ? `page=${page}&limit=${limit}` : '';
    const searchParams = search ? `search=${encodeURIComponent(search)}` : '';

    const queryParams = [paginationParams, searchParams].filter(Boolean).join('&');
    const finalUrl = id ? `${baseUrl}/${id}` : `${baseUrl}?${queryParams}`;
    return finalUrl;
};

const userApi = apiSlice.injectEndpoints({
    endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
        
        getUsers: builder.query<AllUserResponse,GetUsersParams>({
            query: ({ role, entity, page = 1, limit = 10, search = '' }) => 
                getUrlForRole(role, entity, undefined, page, limit, search),
            providesTags:['Users']
        }),
        getUserById: builder.query<SingleUserResponse,UserRequest>({
            query: ({ role, entity, id }) => 
                getUrlForRole(role, entity, id),
          providesTags: (_result, _error, { id }) => [
            'Users',
            { type: 'User', id }
          ]
        }),

        createUser: builder.mutation<CreateUserResponse,UserRequest>({
            query: ({ role, entity, data }) => ({
                url: getUrlForRole(role, entity),
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users']
        }),

        updateUser: builder.mutation<UserUpdateResponse,UserRequest>({
            query: ({ role, entity, id, data }) => ({
                url: getUrlForRole(role, entity, id),
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (_result,_error,{id})=>[
                'Users',
                { type: 'User', id },
            ]

        }),

        deleteUser: builder.mutation<void, UserDeleteRequest>({
            query: ({ role, entity, id }) => ({
                url: getUrlForRole(role, entity, id),
                method: 'DELETE'
            }),
            invalidatesTags:['Users']
        })
    }),
    tagTypes:['Users','User']
});

export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi;
