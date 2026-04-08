import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "../store/authSlice" 

export const store = configureStore({
  reducer: {
    auth: authReducer,// ngedaftarin reducer, nanti dipanggil pake state.payment
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>