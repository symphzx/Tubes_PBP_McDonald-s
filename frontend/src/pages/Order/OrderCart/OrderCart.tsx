import {
    Box,
    Typography,
    Button,
    IconButton,
    Divider

} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";

import mcdLogo from "../img/mcdonalds_logo.png";
import friesImg from "../img/test_fries.avif";
import { useNavigate } from "react-router";

// buatvredux
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { updateItemQuantity, removeItem } from "../../../store/cartSlice";

export default function OrderCart() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const { items: cartItems, totalHarga } = useAppSelector((state) => state.cart)

    // buat update quantity di cart
    const handleUpdateQty = (item: any, newQty: number) => {
        if (newQty < 1) return; 
        
        dispatch(updateItemQuantity({
            menu_id: item.menu_id,
            mv_id: item.varian?.mv_id,
            mo_id: item.opsi?.mo_id,
            qty: newQty
        }))
    }

    const handleRemoveItem = (item: any) => {
        dispatch(removeItem({
            menu_id: item.menu_id,
            mv_id: item.varian?.mv_id,
            mo_id: item.opsi?.mo_id
        }));
    };

    const [cart, setCart] = useState([
        {
            id: 1,
            name: "Fries",
            price: 10000,
            menuOption: 1,
            qty: 1,
            image: friesImg,
        },
        {
            id: 2,
            name: "Schezwan Veg Burger",
            desc: "",
            price: 64000,
            qty: 1,
            image: friesImg,
        },
    ]);

    const menuOption = [{
        id: 1,
        menu_id: 1,
        name: "Cheesy Sauce",
        menu_qty: 2,
        price: 1000,
        imageUrl: ""
    },
    {
        id: 2,
        menu_id: 1,
        name: "Blackpeper ",
        menu_qty: 5,
        price: 1000,
        imageUrl: ""
    }]

    // const handleAdd = (id: number) => {
    //     setCart((prev) =>
    //         prev.map((item) =>
    //             item.id === id ? { ...item, qty: item.qty + 1 } : item
    //         )
    //     );
    // };

    // const handleMinus = (id: number) => {
    //     setCart((prev) =>
    //         prev.map((item) =>
    //             item.id === id // if item.id sama dengan id yg diklik,maka item.qty dikurang 1
    //                 ? { ...item, qty: Math.max(1, item.qty - 1) }
    //                 : item
    //         )
    //     );
    // };

    // const handleRemove = (id: number) => {
    //     setCart((prev) => prev.filter((item) => item.id !== id));
    // };

    // hitung subtotal dgn tambahin semua harga * quantity
    const additional = menuOption.reduce((acc,item) => acc + item.price * item.menu_qty, 0);

    // const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0) + additional;

    // // hitung  GST (Goods and services tax)  dikali 0.1 dan diround
    // const gst = Math.floor((subtotal) * 0.1);
    // const total = subtotal + gst;

    const subtotal = cartItems.reduce((acc, item) => acc + (item.menu_harga * item.qty), 0) + additional;
    const gst = Math.floor(subtotal * 0.1);
    const total = subtotal + gst;

    if (cartItems.length === 0) {
        return (
            <Box sx={{ textAlign: "center", mt: 10 }}>
                <Typography variant="h6">Keranjang Kosong</Typography>
                <Button onClick={() => navigate("/menu")}>Kembali ke Menu</Button>
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
        <Box
            sx={{
                px: 2,
                mt: 2,
            }}
        >
            {cartItems.map((item) => (
                <Box
                    key={item.id}
                    sx={{
                        mb: 3,
                    }}
                >
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
                            sx={{
                                borderColor: "text.secondary"
                            }}
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

                            </Typography>

                            {/* /MENU OPTION */}
                            {/* {menuOption.map((option) => {
                                if (option.menu_id === item.id) {
                                    return (
                                        <Typography key={option.id} sx={{color:"text.secondary", fontFamily: "Speedee-Regular", fontSize: "12px"}}>
                                           add {option.menu_qty} {option.name}
                                        </Typography>
                                    )
                                }
                            })} */}

                            {/* Varian (Misal: Ukuran Medium/Large) */}
                            {item.varian && (
                                <Typography sx={{ color: "text.secondary", fontFamily: "Speedee-Regular", fontSize: "12px" }}>
                                    Varian: {item.varian.nama_varian}
                                </Typography>
                            )}

                            {/* Opsi Tambahan (Misal: Add Sauce/Cheese) */}
                            {item.opsi && (
                                <Typography sx={{ color: "text.secondary", fontFamily: "Speedee-Regular", fontSize: "12px" }}>
                                    Add: {item.opsi.nama_option}
                                </Typography>
                            )}

                            {/* ini buat modify menu yg udah masuk cartnya */}
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
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
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
                            Rp{item.subtotal.toLocaleString()}
                        </Typography>
                    </Box>
                </Box>
            ))}

            <Divider />

            {/* TOTAL */}
            <Box sx={{ mt: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography sx={{ fontSize: "12px", fontFamily: "Speedee-Regular" }}>Subtotal</Typography>
                    <Typography sx={{ fontSize: "12px", fontFamily: "Speedee-Regular" }}>Rp{subtotal.toLocaleString()}</Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography sx={{ fontSize: "12px", fontFamily: "Speedee-Regular" }}>GST</Typography>
                    <Typography sx={{ fontSize: "12px", fontFamily: "Speedee-Regular" }}>Rp{gst.toLocaleString()}</Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                    }}
                >
                    <Typography sx={{ fontSize: "15px" }} >Total</Typography>
                    <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                        Rp{total.toLocaleString()}
                    </Typography>
                </Box>
            </Box>

            {/* ACTION */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mt: 3,
                }}
            >
                <Button fullWidth variant="outlined" onClick={() => navigate("/menu")} sx={{ color: "text.secondary", fontFamily: "Speedee-Regular", borderColor: "text.secondary" }}>
                    Order More
                </Button>

                <Button fullWidth variant="contained" sx={{ bgcolor: "#FFAC00", color: "black", fontFamily: "Speedee-Regular" }}>
                    Complete Order
                </Button>
            </Box>
        </Box >
    </>

    );
}