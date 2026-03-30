import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type PaymentMethod, type OrderMenu } from "../types"

export type PaymentState = {
  orderType: 'DINE_IN' | 'TAKE_AWAY' | undefined
  tableNumber: string
  paymentMethod: PaymentMethod | undefined
  promoCode: string
  cart: OrderMenu[]
  totalAmount: number
}

const initialState: PaymentState = {
  orderType: undefined, 
  tableNumber: '',
  paymentMethod: undefined,
  promoCode: '',
  cart: [],
  totalAmount: 0,
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setOrderType: (state, action: PayloadAction<'DINE_IN' | 'TAKE_AWAY' | undefined>) => {
      state.orderType = action.payload
      if (action.payload === 'TAKE_AWAY') state.tableNumber = ''
    },
    setTableNumber: (state, action: PayloadAction<string>) => {
      state.tableNumber = action.payload
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod | undefined>) => {
      state.paymentMethod = action.payload
    },
    setPromoCode: (state, action: PayloadAction<string>) => {
      state.promoCode = action.payload
    },
    setCart: (state, action: PayloadAction<OrderMenu[]>) => {
      state.cart = action.payload
      state.totalAmount = action.payload.reduce((total, item) => {
        return total + (item.harga_awal * item.quantity)
      }, 0)
    },
    resetPayment: (state) => {
      state.orderType = undefined
      state.tableNumber = ''
      state.paymentMethod = undefined
      state.promoCode = ''
      state.cart = []
      state.totalAmount = 0
    }
  }
})


export const paymentActions = paymentSlice.actions 
export const paymentReducer = paymentSlice.reducer