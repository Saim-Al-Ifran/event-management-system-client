import Cookies from 'js-cookie';
import { userLoggedIn, userLoggedOut } from "./authSlice";
import { Dispatch } from "redux";
import { apiSlice } from '../api/apiSlice';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { UserLoginResponse } from '../../types/types';
import { UserLoginInput } from '../../types/api-types';

const clearToken = (dispatch:Dispatch) => {
    Cookies.remove('token');
    dispatch(userLoggedOut());
};
 

const authApi = apiSlice.injectEndpoints({
      endpoints:(builder: EndpointBuilder<BaseQueryFn, string, string>)=>({
             adminLogin: builder.mutation<UserLoginResponse, UserLoginInput>({
                    query:(data)=>({
                         url:'/event-administration/login',
                         method:'POST',
                         body:data
                    }),
                    async onQueryStarted(_arg , { queryFulfilled, dispatch }) {
                        try {
                            const result = await queryFulfilled;
                            const accessToken = result?.data?.token;
                            
                            const expirationTime = new Date();
                            expirationTime.setTime(expirationTime.getTime() + 60 * 60 * 1000);                 
        
                            Cookies.set(
                                'token',
                                JSON.stringify({
                                    accessToken: accessToken,
                                    user: result?.data?.data?.user,
                                }),
                                { expires: expirationTime }
                            );
        
                            dispatch(userLoggedIn({
                                accessToken:accessToken,
                                user:result?.data?.data?.user
                            }))
        
                            setTimeout(() => {
                                clearToken(dispatch);
                                 
                            }, expirationTime.getTime() - Date.now());
        
                        } catch (err) {
                            console.log(err);
                        }
                    }
             }),
             
      })
})

export const {useAdminLoginMutation} = authApi;