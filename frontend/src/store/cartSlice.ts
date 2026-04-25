import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface varianMenu {
    mv_id: string;
    nama_varian: string;
    harga_tambahan: number;
}

interface opsiMenu {
    mo_id: string;
    nama_option: string;
    tambahan_harga: number;
}

interface cartItem {
    id: string;
    menu_id: string;
    menu_nama: string;
    menu_harga: number;
    menu_gambar: string;
    varian: varianMenu | null;
    opsi: opsiMenu | null;
    qty: number;
    subtotal: number;
}

interface CartState {
    items: cartItem[];
    orderType: "DINE_IN" | "TAKEAWAY" | null; 
    totalHarga: number;                        
}

const initialState: CartState = {
    items: [],
    orderType: null,
    totalHarga: 0,
};

const hitungTotalHarga = (items: cartItem[]) => {
    return items.reduce((acc, item) => acc + item.subtotal, 0);
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<cartItem>) => {
            const incomingItem = action.payload;

            const totalHargaVarian = incomingItem.varian?.harga_tambahan || 0;
            const totalHargaOpsi = incomingItem.opsi?.tambahan_harga || 0;
            const subtotal = (incomingItem.menu_harga + totalHargaVarian + totalHargaOpsi) * incomingItem.qty;

            const existItem = state.items.findIndex(item =>
                item.menu_id === incomingItem.menu_id &&
                item.varian?.mv_id === incomingItem.varian?.mv_id &&
                item.opsi?.mo_id === incomingItem.opsi?.mo_id
            );

            if (existItem !== -1) {
                state.items[existItem].qty += incomingItem.qty;
                state.items[existItem].subtotal += subtotal;
            } else {
                state.items.push({ ...incomingItem, subtotal });
            }

            state.totalHarga = hitungTotalHarga(state.items);
        },

        removeItem(state, action: PayloadAction<{ menu_id: string; mv_id?: string; mo_id?: string }>) {
            const { menu_id, mv_id, mo_id } = action.payload;
            state.items = state.items.filter(
                (item) =>
                    !(
                        item.menu_id === menu_id &&
                        item.varian?.mv_id === mv_id &&
                        item.opsi?.mo_id === mo_id
                    )
            );
            state.totalHarga = hitungTotalHarga(state.items);
        },

        updateItemQuantity(state, action: PayloadAction<{ menu_id: string; mv_id?: string; mo_id?: string; qty: number }>) {
            const { menu_id, mv_id, mo_id, qty } = action.payload;
            const itemToUpdate = state.items.find(
                (item) =>
                    item.menu_id === menu_id &&
                    item.varian?.mv_id === mv_id &&
                    item.opsi?.mo_id === mo_id
            );
            if (itemToUpdate) {
                const hargaVarian = itemToUpdate.varian?.harga_tambahan ?? 0; 
                const hargaOpsi = itemToUpdate.opsi?.tambahan_harga ?? 0;     
                itemToUpdate.qty = qty;
                itemToUpdate.subtotal = (itemToUpdate.menu_harga + hargaVarian + hargaOpsi) * qty; 
                state.totalHarga = hitungTotalHarga(state.items);
            }
        },

        setOrderType(state, action: PayloadAction<"DINE_IN" | "TAKEAWAY">) {
            state.orderType = action.payload;
        },

        clearCart(state) {
            state.items = [];
            state.totalHarga = 0;
            state.orderType = null;
        }
    }
});

export const { addItemToCart, removeItem, updateItemQuantity, setOrderType, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer; 