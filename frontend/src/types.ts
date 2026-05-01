// export type KategoriMenu = "Burger & McNuggets" | "Ayam McD Krispy" | "Ayam McD Spicy" | "Paket Keluarga" | "Happy Meal" | "Paket HeBat" | "Menu Receh" | "McSpaghetti" | "Camilan" | "Minuman" | "Pencuci Mulut" | "Nasi";
export type TipeMenu = "Ala Carte" | "Paket";
export type Ketersediaan = "Tersedia" | "Tidak Tersedia";
export type PaymentMethod = "DEBIT" | "QRIS" | "CASHIER";

export type KategoriMenu ={
  id: string;
  nama: string;
  sortOrder: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export type Menu = {
  id: string; 
  kategori_id: string; 
  nama: string;
  harga_awal: number;
  tipe: TipeMenu;         
  gambar: string | null;  
  ketersediaan: Ketersediaan;
  tag: "Baru!" | null;
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

export type PaketRelation = {
    id: string;            // Paket_Menu.id (dipakai sebagai slot_key)
    paket_id: string;
    menu_id: string;
    menuRelation: Menu;    // sub-item dalam paket (sudah include varian & opsi-nya sendiri)
};

export type MenuDetail = Menu & {
    paketRelation?: PaketRelation[];
    kategoriRelation?: KategoriMenu;
    recommendation_id?: string | null;
};

export type OrderStatus = "PENDING" | "PAID" | "CANCELLED";

export type Order = {
  id: string;
  no_order: string;
  waktu_pemesanan: string;
  total_harga: number;
  order_type: "DINE_IN" | "TAKEAWAY";
  no_meja: number;
  status: OrderStatus;
  orderMenuRelation: OrderMenu[];
};

export type OrderMenu = {
  id: string;
  order_id: string;
  menu_id: string;
  menu?: Menu;
  mv_id: string | null; 
  quantity: number;
  harga_awal: number; 
  varian_menu: MenuVarian;
  opsi_list: OrderMenuOpsi[];
};

export type OrderMenuOpsi = {
  id: string;
  order_menu_id: string;
  mo_id: string;
  harga_tambahan: number;       // snapshot harga saat order dibuat

  opsiMenu?: MenuOption;
}

export type Payment = {
  id: string;
  order_id: string;
  metode_pembayaran: PaymentMethod;
  status: "PENDING" | "PAID" | "CANCELLED";
  paid_at: string;
};

export type UserInfo = {
  id: string;
  nama: string;
  email: string;
  password: string;
  role: "Admin" | "Cashier";
}

export type CreateMenuPayload = {
  nama: string;
  kategori_id: string; 
  harga_awal: string;
  tipe: TipeMenu;         
  ketersediaan: Ketersediaan;
  tag?: string | null;
  gambar?: File | null;  
}

export type CreateVarianPayload = {
  menu_id: string;
  nama: string; 
  harga_tambahan?: number;
};

export type CreateOpsiPayload = {
  menu_id: string;
  nama: string; 
  harga_tambahan?: number;
};

export type UpdateMenuPayload = {
  id: string;
  nama: string;
  kategori_id: string; 
  harga_awal: string;
  tipe: TipeMenu;         
  ketersediaan: Ketersediaan;
  tag?: string | null;
  gambar?: File | null;  
  existingImage?: string;
}

export type UpdateVarianPayload = {
  id: string;
  menu_id: string;
  nama: string; 
  harga_tambahan?: number;
};

export type UpdateOpsiPayload = {
  id: string;
  menu_id: string;
  nama: string; 
  harga_tambahan?: number;
};

export type CreateKategoriPayload ={
  nama: string;
  sortOrder: number;
  startDate?: string | null;
  endDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;
}

export type UpdateKategoriPayload = {
  id: string;
  nama: string;
  sortOrder: number;
  startDate?: string | null;
  endDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;
};

export type UpdateOrderPayload = {
  id: string;
  order_type: "DINE_IN" | "TAKEAWAY";
  no_meja: number | null;
  status: OrderStatus;
};

export type CreateUserPayload = {
  nama: string;
  email: string;
  password: string;
  role: "Admin" | "Cashier";
};

export type UpdateUserPayload = {
  id: string;
  nama: string;
  email: string;
  password?: string;
  role: "Admin" | "Cashier";
};

export type AsyncDataState = 'pending' | 'loading' | 'fullfilled' | 'error';