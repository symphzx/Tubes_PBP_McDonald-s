import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "../store/authSlice" 
import { menuReducer } from "../store/menuSlice"
import { categoryReducer } from "../store/categorySlice"
import { orderReducer } from "../store/orderSlice"
import { paymentReducer } from "../store/paymentSlice"
import { cartReducer } from "../store/cartSlice"
import { userReducer } from "../store/userSlice"

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    category: categoryReducer,
    auth: authReducer,// ngedaftarin reducer, nanti dipanggil pake state.payment
    cart: cartReducer,
    payment: paymentReducer,
    order: orderReducer,
    user: userReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>