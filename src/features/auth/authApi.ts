import Cookies from 'js-cookie';
import { userLoggedIn, userLoggedOut } from "./authSlice";
import { Dispatch } from "redux";
import { apiSlice } from '../api/apiSlice';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { UserLoginResponse } from '../../types/types';
import { UserLoginInput } from '../../types/api-types';

const TOKEN_LIFETIME_MS = 60 * 60 * 1000; 

const clearToken = (dispatch: Dispatch) => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    dispatch(userLoggedOut());
};

const handleLoginSuccess = (result: any, dispatch: Dispatch) => {
    const accessToken = result?.data?.token;
    const user = result?.data?.data?.user;

    if (accessToken && user) {
        Cookies.set(
            'token',
            JSON.stringify({ accessToken }),
            { expires: 1 / 24 } // 1 hour
        );
        localStorage.setItem('user', JSON.stringify(user));

        dispatch(userLoggedIn({ accessToken, user }));

        // Schedule token clearance after expiration time
        setTimeout(() => {
            clearToken(dispatch);
        }, TOKEN_LIFETIME_MS);
    }
};


const createLoginMutation = (
    builder: EndpointBuilder<BaseQueryFn, string, string>,
    url: string
) => {
    return builder.mutation<UserLoginResponse, UserLoginInput>({
        query: (data) => ({
            url,
            method: 'POST',
            body: data,
        }),
        async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
            try {
                const result = await queryFulfilled;
                handleLoginSuccess(result, dispatch);
            } catch (err) {
                console.error('Login failed:', err);
            }
        },
    });
};

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
        adminLogin: createLoginMutation(builder, '/event-administration/login'),
        userLogin: createLoginMutation(builder, '/event-management/login'),
    }),
});

export const { 
    useAdminLoginMutation,
    useUserLoginMutation,
} = authApi;
