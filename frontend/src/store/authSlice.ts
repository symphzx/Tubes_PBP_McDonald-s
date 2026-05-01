import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserInfo } from "../types";

export type AuthState = {
    userInfo?: UserInfo;
    accessToken : string;
};

const initialState: AuthState = {
    userInfo: undefined,
    accessToken: ""
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfo | undefined>) => { 
            state.userInfo = action.payload 

            if (action.payload) {
              localStorage.setItem("userInfo", JSON.stringify(action.payload));
            } else {
              localStorage.removeItem("userInfo");
            }
        },
        setAccessToken: (state, action: PayloadAction<string>) => { 
            state.accessToken = action.payload 
        }
    }
});

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer