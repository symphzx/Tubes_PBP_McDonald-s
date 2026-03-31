import { configureStore } from "@reduxjs/toolkit"
import { paymentReducer } from "../store/paymentSlice" 

export const store = configureStore({
  reducer: {
    payment: paymentReducer,// ngedaftarin reducer, nanti dipanggil pake state.payment
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch