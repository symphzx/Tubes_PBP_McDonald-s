export type KategoriMenu = 'Burger' | 'Ayam' | 'Kentang' | 'Spaghetti' | 'Sundae' | 'Nasi Uduk' | 'Ice Cream Cone' | 'McFlurry' | 'Pie' | 'Minuman' | 'Nasi' | 'Nugget' | 'Jasuke' | 'PaNas 1' | 'PaNas 2' | 'PaNas Spesial' | 'PaMer 5' | 'PaMer 7' | 'Happy Meal' | 'Paket Hebat' | 'Paket Hemat'

export type PaymentMethod = 'QRIS' | 'DEBIT' | 'CASHIER'

export type Menu = {
  menu_id: number
  nama: string
  harga_awal: number
  kategori_menu: KategoriMenu
  tipe_menu : string
  gambar_menu: string
  isAvailable: boolean
}

export type MenuVarian = {
    mv_id: number
    menu_id: number
    nama_varian: string
    harga_tambahan: number
}

export type MenuOption = {
    mo_id: number
    menu_id: number 
    nama_option: string
    tambahan_harga: number
}

export type PaketItem = {
    pi_id: number
    paket_id: number
    item_menu_id: number
}

export type Order = { // per satu struk
    order_id: number
    waktu_pesanan: string
    total_harga: number
    order_type: 'DINE_IN' | 'TAKE_AWAY'
    order_no: string
    status: 'PENDING' | 'PAID' | 'CANCELLED'
}

export type OrderMenu = { // isi dari struknya
    om_id: number
    order_id: number
    menu_id: Menu
    mv_id: MenuVarian | null
    mo_id: MenuOption | null
    quantity: number
    harga_awal: number
}

export type Payment = {
    payment_id: number
    order_id: Order
    metode_pembayaran: PaymentMethod
    status: 'PENDING' | 'PAID' | 'CANCELLED'
    paid_at: string
}
