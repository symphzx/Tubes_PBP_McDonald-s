export type KategoriMenu = "Burger & McNuggets" | "Ayam McD Krispy" | "Ayam McD Spicy" | "Paket Keluarga" | "Happy Meal" | "Paket HeBat" | "Menu Receh" | "McSpaghetti" | "Camilan" | "Minuman" | "Pencuci Mulut" | "Nasi";
export type TipeMenu = "Ala Carte" | "Paket";
export type Ketersediaan = "Tersedia" | "Tidak Tersedia";
export type PaymentMethod = "DEBIT" | "QRIS" | "CASHIER";

export type Menu = {
  id: string; 
  nama: string;
  harga_awal: number;
  kategori: KategoriMenu; 
  tipe: TipeMenu;         
  gambar: string | null;  
  ketersediaan: Ketersediaan;
  createdAt?: string;
  updatedAt?: string;
  varian_menus?: MenuVarian[];
  opsi_menus?: MenuOption[];
};

export type MenuVarian = {
  id: string;
  menu_id: string;
  nama: string; 
  harga_tambahan: number;
};

export type MenuOption = {
  id: string;
  menu_id: string;
  nama: string; 
  harga_tambahan: number;
};

export type PaketItem = {
  id: string;
  paket_id: string;
  menu_id: string;
};

export type OrderStatus = "CART" | "PAID" | "PROCESS" | "DONE" | "CANCELLED";

export type Order = {
  id: string;
  total_harga: number;
  order_type: "DINE_IN" | "TAKE_AWAY";
  order_no: string;
  status: OrderStatus;
  createdAt: string;
};

export type OrderMenu = {
  id: string;
  order_id: string;
  menu_id: string;
  menu?: Menu;
  mv_id: string | null; 
  mo_id: string | null; 
  quantity: number;
  harga_awal: number; 
};

export type Payment = {
  id: string;
  order_id: string;
  metode_pembayaran: PaymentMethod;
  status: "PENDING" | "PAID" | "CANCELLED";
  paid_at: string;
};