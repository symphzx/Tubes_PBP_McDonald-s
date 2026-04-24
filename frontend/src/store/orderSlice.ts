import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../types";

export type OrderState = {
    orders: Order[];
};

const initialState: OrderState = {
    orders: [],
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<Order[]>) => { 
            state.orders = action.payload 
        }
    }
});

export const orderActions = orderSlice.actions
export const orderReducer = orderSlice.reducer