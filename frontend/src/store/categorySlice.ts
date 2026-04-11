import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { KategoriMenu } from "../types";

export type CategoryState = {
    category: KategoriMenu | undefined;
};

const initialState: CategoryState = {
    category: undefined,
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<KategoriMenu>) => { 
            state.category = action.payload 
        }
    }
});

export const categoryActions = categorySlice.actions
export const categoryReducer = categorySlice.reducer