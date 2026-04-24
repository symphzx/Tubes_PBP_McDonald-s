import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "../store/authSlice" 
import { menuReducer } from "../store/menuSlice"
import { categoryReducer } from "../store/categorySlice"
import { orderReducer } from "../store/orderSlice"

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    category: categoryReducer,
    auth: authReducer,
    order: orderReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>