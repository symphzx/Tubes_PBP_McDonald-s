const BASE_URL = "/api";

interface CheckoutOpsiItem {
    mo_id: string;
    harga_tambahan: number;
}

export const checkoutOrder = async (payload: {
    order_type: "DINE_IN" | "TAKEAWAY";
    no_meja: number;
    total_harga: number;
    items: {
        menu_id: string;
        mv_id: string | null;
        quantity: number;
        harga_awal: number;
        opsi_ids: CheckoutOpsiItem[];
    }[];
}) => {
    const res = await fetch(`${BASE_URL}/order/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Checkout gagal");
    return res.json();
};