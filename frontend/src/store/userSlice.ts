import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserInfo } from "../types";

export type UserState = {
    userInfo?: UserInfo[];
};

const initialState: UserState = {
    userInfo: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfo[]>) => { 
            state.userInfo = action.payload
        },
    }
});

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer