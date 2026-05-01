import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type PaymentMethod, type OrderMenu } from "../types"

// define apa aja yg harus diinget sama redux
export type PaymentState = {
  order_id: string | undefined
  order_no: string | undefined
  order_type: 'DINE_IN' | 'TAKE_AWAY' | undefined
  no_meja: string
  metode_pembayaran: PaymentMethod | undefined
  cart: OrderMenu[]
  total: number
  cartSnapshot: any[]
}

// state waktu programnya jalan pertama kali baru dibuka (blm ada user login)
const initialState: PaymentState = {
  order_id: undefined, 
  order_no: undefined,
  order_type: undefined, 
  no_meja: '',
  metode_pembayaran: undefined,
  cart: [],
  total: 0,
  cartSnapshot: []
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setOrderId: (state, action: PayloadAction<string>) => {
      state.order_id = action.payload
    },
    setOrderNo: (state, action: PayloadAction<string>) => {
      state.order_no = action.payload
    },
    setOrderType: (state, action: PayloadAction<'DINE_IN' | 'TAKE_AWAY'>) => {
      state.order_type = action.payload
      if (action.payload === 'TAKE_AWAY') { // klo takeway gausa pake no_meja
        state.no_meja = ''
      }
    },
    setno_meja: (state, action: PayloadAction<string>) => {
      state.no_meja = action.payload
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.metode_pembayaran = action.payload
    },
    setCart: (state, action: PayloadAction<OrderMenu[]>) => {
      state.cart = action.payload
      state.total = action.payload.reduce((total, item) => {
        return total + (item.harga_awal * item.quantity)
      }, 0)
    },
    resetPayment: (state) => {
      state.order_id = undefined
      state.order_no = undefined
      state.order_type = undefined
      state.no_meja = ''
      state.metode_pembayaran = undefined
      state.cart = []
      state.total = 0
      state.cartSnapshot = []
    },
    setTotal: (state, action: PayloadAction<number>) => {
        state.total = action.payload
    },
    setCartSnapshot: (state, action: PayloadAction<any[]>) => { 
      state.cartSnapshot = action.payload
    },
  }
})


export const paymentActions = paymentSlice.actions 
export const paymentReducer = paymentSlice.reducer