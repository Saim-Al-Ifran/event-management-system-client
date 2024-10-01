import Cookies from 'js-cookie';
import { userLoggedIn, userLoggedOut } from "./authSlice";
import { Dispatch } from "redux";
import { apiSlice } from '../api/apiSlice';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { UserLoginResponse } from '../../types/types';
import { UserLoginInput } from '../../types/api-types';

const clearToken = (dispatch: Dispatch) => {
    Cookies.remove('token');
    localStorage.removeItem('user'); 
    dispatch(userLoggedOut());
    
};

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
        adminLogin: builder.mutation<UserLoginResponse, UserLoginInput>({
            query: (data) => ({
                url: '/event-administration/login',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    const accessToken = result?.data?.token;
                    const user = result?.data?.data?.user;
                    const tokenLifetimeMs = 60 * 60 * 1000; // 1 hour

                    Cookies.set(
                        'token',
                        JSON.stringify({ accessToken }),
                        { expires: 1 / 24 } // 1 hour
                    );
                    localStorage.setItem('user', JSON.stringify(user));

                    dispatch(userLoggedIn({
                        accessToken,
                        user
                    }));
                    setTimeout(() => {
                        clearToken(dispatch);
                    }, tokenLifetimeMs);

                } catch (err) {
                    console.error('Login failed:', err);

                }
            }
        }),
    })
});

export const { useAdminLoginMutation } = authApi;
