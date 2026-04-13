import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { KategoriMenu } from "../types";

export type CategoryState = {
    category: KategoriMenu[];
};

const initialState: CategoryState = {
    category: []
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<KategoriMenu[]>) => { 
            state.category = action.payload 
        }
    }
});

export const categoryActions = categorySlice.actions
export const categoryReducer = categorySlice.reducer