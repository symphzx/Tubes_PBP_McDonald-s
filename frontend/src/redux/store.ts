import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "../store/authSlice" 
import { menuReducer } from "../store/menuSlice"
import { categoryReducer } from "../store/categorySlice"
import { orderReducer } from "../store/orderSlice"
import { paymentReducer } from "../store/paymentSlice"
import { cartReducer } from "../store/cartSlice"

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    category: categoryReducer,
    auth: authReducer,
    order: orderReducer,
    payment: paymentReducer,
    cart: cartReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>