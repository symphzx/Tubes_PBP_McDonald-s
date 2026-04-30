/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Typography,
    Button,
    IconButton,
    Divider
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import mcdLogo from "../img/mcdonalds_logo.png";

import { useNavigate } from "react-router";
import { useState } from "react";

// redux
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { updateItemQuantity, removeItem, clearCart } from "../../../store/cartSlice";
import { paymentActions } from "../../../store/paymentSlice";

// integrasi
import { checkoutOrder } from "../../../services/order.services";

export default function OrderCart() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const { items: cartItems, totalHarga, orderType } = useAppSelector((state) => state.cart);

    const handleUpdateQty = (item: any, newQty: number) => {
        if (newQty < 1) return;
        dispatch(updateItemQuantity({ id: item.id, qty: newQty }));
    };

    const handleRemoveItem = (item: any) => {
        dispatch(removeItem({ id: item.id }));
    };

    
    const buildOrderMenuItems = () => {
    const rows: Array<{
        menu_id: string;
        mv_id: string | null;
        quantity: number;
        harga_awal: number;
        opsi_ids: Array<{ mo_id: string; harga_tambahan: number }>;
    }> = [];

    cartItems.forEach((item: any) => {
        const customizations = item.customizations ?? [];

        customizations.forEach((cust: any, idx: number) => {
            const baseHarga = idx === 0 ? item.menu_harga : (cust.menu_harga ?? 0);
            const varianHarga = cust.varian?.harga_tambahan ?? 0;
            const opsiList = cust.opsi ?? [];

            // Total harga opsi untuk dimasukkan ke harga_awal
            const totalOpsiHarga = opsiList.reduce(
                (s: number, o: any) => s + (o.tambahan_harga ?? 0),
                0
            );

            rows.push({
                menu_id: cust.menu_id,
                mv_id: cust.varian?.mv_id ?? null,
                quantity: item.qty,
                harga_awal: baseHarga + varianHarga + totalOpsiHarga,
                opsi_ids: opsiList.map((o: any) => ({
                    mo_id: o.mo_id,
                    harga_tambahan: o.tambahan_harga ?? 0,
                })),
            });
        });
    });

    return rows;
};

    // Checkout
    const handleCheckout = async () => {
        if (!orderType) {
            alert("Order type not found");
            navigate("/order");
            return;
        }

        try {
            setLoading(true);

            const items = buildOrderMenuItems();

            const data = await checkoutOrder({
                order_type: orderType,
                no_meja: 0, // diassign dari backend
                total_harga: totalHarga,
                items
            });

            // Simpan hasil order ke paymentSlice
            dispatch(paymentActions.setOrderId(data.data.id));
            dispatch(paymentActions.setno_meja(
                data.data.no_meja ? data.data.no_meja.toString() : ""
            ));
            dispatch(paymentActions.setOrderType(
                orderType === "DINE_IN" ? "DINE_IN" : "TAKE_AWAY"
            ));
            dispatch(paymentActions.setTotal(total));

            navigate("/payment");
            dispatch(clearCart());
        } catch (err) {
            console.error("Checkout error:", err);
            alert("Checkout gagal, coba lagi");
        } finally {
            setLoading(false);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
    const gst = Math.floor(subtotal * 0.1);
    const total = subtotal + gst;

    if (cartItems.length === 0) {
        return (
            <Box sx={{ textAlign: "center", mt: 10 }}>
                <Typography variant="h6">Keranjang Kosong</Typography>
                <Button onClick={() => navigate("/")}>Kembali ke Menu</Button>
            </Box>
        );
    }

    return (<>
        {/* HEADER */}
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                ml: "10px",
                mt: "10px",
            }}
        >
            <img src={mcdLogo} width="40" />
            <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "Speedee-Bold", mt: 1 }}>
                Your Order
            </Typography>
        </Box>

        {/* CART */}
        <Box sx={{ px: 2, mt: 2 }}>
            {cartItems.map((item: any) => (
                <Box key={item.id} sx={{ mb: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            fontFamily: "Speedee-Regular"
                        }}
                    >
                        {/* REMOVE */}
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleRemoveItem(item)}
                            sx={{ borderColor: "text.secondary" }}
                        >
                            <Typography sx={{
                                color: "text.secondary",
                                fontFamily: "Speedee-Regular",
                                fontSize: "12px"
                            }}>
                                Remove
                            </Typography>
                        </Button>

                        {/* IMAGE */}
                        <Box
                            component="img"
                            src={item.menu_gambar}
                            sx={{
                                width: 50,
                                height: 50,
                                objectFit: "cover",
                            }}
                        />

                        {/* INFO */}
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontWeight: "bold" }}>
                                {item.menu_nama}
                                {item.isPaket && (
                                    <Typography
                                        component="span"
                                        sx={{
                                            ml: 1,
                                            fontSize: "10px",
                                            bgcolor: "#FFD700",
                                            color: "black",
                                            px: 0.8,
                                            py: 0.2,
                                            borderRadius: 1,
                                        }}
                                    >
                                        PAKET
                                    </Typography>
                                )}
                            </Typography>

                            {/* 🔄 Loop customizations (1 untuk ala carte, N untuk paket) */}
                            {(item.customizations ?? []).map((cust: any, idx: number) => {
                                const hasVarian = !!cust.varian;
                                const hasOpsi = (cust.opsi ?? []).length > 0;
                                if (!hasVarian && !hasOpsi) return null;

                                return (
                                    <Box key={cust.slot_key ?? idx} sx={{ mt: 0.3 }}>
                                        {/* Tampilkan nama sub-item kalau paket */}
                                        {item.isPaket && (
                                            <Typography sx={{
                                                color: "text.primary",
                                                fontFamily: "Speedee-Regular",
                                                fontSize: "11px",
                                                fontWeight: 500
                                            }}>
                                                • {cust.menu_nama}
                                            </Typography>
                                        )}

                                        {hasVarian && (
                                            <Typography sx={{
                                                color: "text.secondary",
                                                fontFamily: "Speedee-Regular",
                                                fontSize: "12px",
                                                ml: item.isPaket ? 1.5 : 0,
                                            }}>
                                                Varian: {cust.varian.nama_varian}
                                            </Typography>
                                        )}

                                        {hasOpsi && (
                                            <Typography sx={{
                                                color: "text.secondary",
                                                fontFamily: "Speedee-Regular",
                                                fontSize: "12px",
                                                ml: item.isPaket ? 1.5 : 0,
                                            }}>
                                                Add: {cust.opsi.map((o: any) => o.nama_option).join(", ")}
                                            </Typography>
                                        )}
                                    </Box>
                                );
                            })}

                            {/* Edit options */}
                            <Button
                                size="small"
                                color="secondary"
                                sx={{ mt: 0.5, fontSize: "11px", p: 0 }}
                                onClick={() => navigate(`/set-quantity/${item.menu_id}`, { state: { editItem: item } })}
                            >
                                Edit Options
                            </Button>
                        </Box>

                        {/* QTY */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <IconButton onClick={() => handleUpdateQty(item, item.qty - 1)}>
                                <Remove fontSize="small" />
                            </IconButton>
                            <Typography>{item.qty}</Typography>
                            <IconButton onClick={() => handleUpdateQty(item, item.qty + 1)}>
                                <Add fontSize="small" />
                            </IconButton>
                        </Box>

                        {/* PRICE */}
                        <Typography
                            sx={{
                                width: "80px",
                                textAlign: "right",
                                fontSize: "15px"
                            }}
                        >
                            Rp{(item.subtotal ?? 0).toLocaleString()}
                        </Typography>
                    </Box>
                </Box>
            ))}

            <Divider />

            {/* TOTAL */}
            <Box sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "12px", fontFamily: "Speedee-Regular" }}>Subtotal</Typography>
                    <Typography sx={{ fontSize: "12px", fontFamily: "Speedee-Regular" }}>Rp{subtotal.toLocaleString()}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "12px", fontFamily: "Speedee-Regular" }}>GST</Typography>
                    <Typography sx={{ fontSize: "12px", fontFamily: "Speedee-Regular" }}>Rp{gst.toLocaleString()}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Typography sx={{ fontSize: "15px" }}>Total</Typography>
                    <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                        Rp{total.toLocaleString()}
                    </Typography>
                </Box>
            </Box>

            {/* ACTION */}
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate("/")}
                    sx={{ color: "text.secondary", fontFamily: "Speedee-Regular", borderColor: "text.secondary" }}
                >
                    Order More
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleCheckout}
                    disabled={loading}
                    sx={{ bgcolor: "#FFAC00", color: "black", fontFamily: "Speedee-Regular" }}
                >
                    {loading ? "Memproses..." : "Complete Order"}
                </Button>
            </Box>
        </Box>
    </>);
}