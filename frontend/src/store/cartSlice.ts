// store/cartSlice.ts
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

// 🆕 Customization per "slot":
// - Untuk Ala Carte: 1 customization (slot_key = "main")
// - Untuk Paket: N customization, satu per item dalam paket (slot_key = paket_menu.id)
interface customization {
    slot_key: string;          // "main" untuk ala carte, paket_menu.id untuk paket
    menu_id: string;           // sub-item id (sama dengan menu_id utama kalau ala carte)
    menu_nama: string;
    menu_harga: number;        // harga_awal sub-item (biasanya 0 untuk item dalam paket)
    varian: varianMenu | null;
    opsi: opsiMenu[];          // 🔥 sekarang array (multi-select)
}

interface cartItem {
    id: string;
    menu_id: string;
    menu_nama: string;
    menu_harga: number;
    menu_gambar: string;
    qty: number;
    isPaket: boolean;                  // 🆕 flag untuk membedakan
    customizations: customization[];   // 🆕 array (1 untuk ala carte, N untuk paket)
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

// =====================================================
// HELPERS
// =====================================================

const hitungTotalHarga = (items: cartItem[]) => {
    return items.reduce((acc, item) => acc + item.subtotal, 0);
};

/** Hitung total harga tambahan dari semua customization (varian + semua opsi) */
const hitungTambahan = (customizations: customization[]) => {
    return customizations.reduce((acc, c) => {
        const tambahanVarian = c.varian?.harga_tambahan ?? 0;
        const tambahanOpsi = c.opsi.reduce((s, o) => s + o.tambahan_harga, 0);
        return acc + tambahanVarian + tambahanOpsi;
    }, 0);
};

/** Hitung subtotal cart item: (harga_awal + total tambahan) × qty */
const hitungSubtotal = (item: Omit<cartItem, "subtotal">) => {
    return (item.menu_harga + hitungTambahan(item.customizations)) * item.qty;
};

/** Build "signature" unik dari customizations untuk cek duplikasi.
 *  Dua cart item dianggap sama kalau menu_id sama + signature customizations sama. */
const buildSignature = (customizations: customization[]) => {
    return customizations
        .slice()
        .sort((a, b) => a.slot_key.localeCompare(b.slot_key))
        .map((c) => {
            const varianKey = c.varian?.mv_id ?? "no-varian";
            const opsiKey = c.opsi
                .map((o) => o.mo_id)
                .sort()
                .join(",") || "no-opsi";
            return `${c.slot_key}:${varianKey}:${opsiKey}`;
        })
        .join("|");
};

// =====================================================
// SLICE
// =====================================================

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<cartItem>) => {
            const incomingItem = action.payload;

            // Recompute subtotal di sisi reducer (single source of truth)
            const subtotal = hitungSubtotal(incomingItem);
            const incomingSignature = buildSignature(incomingItem.customizations);

            const existIndex = state.items.findIndex(
                (item) =>
                    item.menu_id === incomingItem.menu_id &&
                    buildSignature(item.customizations) === incomingSignature
            );

            if (existIndex !== -1) {
                // Sudah ada item identik → tambah qty saja
                state.items[existIndex].qty += incomingItem.qty;
                state.items[existIndex].subtotal = hitungSubtotal(state.items[existIndex]);
            } else {
                state.items.push({ ...incomingItem, subtotal });
            }

            state.totalHarga = hitungTotalHarga(state.items);
        },

        // Pakai cart item id (uuid) — jauh lebih aman dibanding kombinasi menu_id+mv_id+mo_id
        removeItem(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
            state.totalHarga = hitungTotalHarga(state.items);
        },

        updateItemQuantity(
            state,
            action: PayloadAction<{ id: string; qty: number }>
        ) {
            const { id, qty } = action.payload;
            const itemToUpdate = state.items.find((item) => item.id === id);
            if (itemToUpdate) {
                if (qty <= 0) {
                    // Auto-remove kalau qty di-set 0
                    state.items = state.items.filter((item) => item.id !== id);
                } else {
                    itemToUpdate.qty = qty;
                    itemToUpdate.subtotal = hitungSubtotal(itemToUpdate);
                }
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
        },
    },
});

export const {
    addItemToCart,
    removeItem,
    updateItemQuantity,
    setOrderType,
    clearCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;