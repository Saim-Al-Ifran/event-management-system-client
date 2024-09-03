import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/types"; 
 

const initialState: AuthState = {
  accessToken: undefined,
  user: undefined, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   
    userLoggedIn: (state:AuthState, action: { payload:  AuthState  }) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state:AuthState) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

 
export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
