import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { addItemToCart, updateItemQuantity } from "../../../store/cartSlice";
import { useMenuDetailCustomization } from "../../../hooks/useMenuDetailCustomization";

export default function SetQuantityPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    // Cek apakah halaman ini dibuka untuk EDIT item dari cart.
    // Kalau ada editItem, berarti user mau update qty item yang sudah ada.
    const editItem = location.state?.editItem;

    // Quantity awal: ikuti qty dari editItem kalau ada, kalau tidak mulai dari 1
    const [quantity, setQuantity] = useState<number>(editItem?.qty ?? 1);

    // Fetch detail menu by id
    const { menu, reload } = useMenuDetailCustomization(id);

    useEffect(() => {
        reload();
    }, [reload]);

    // ---------- HANDLERS QUANTITY ----------
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // ---------- HANDLER CUSTOMIZE ----------
    const handleCustomize = () => {
        if (!menu) return;
        navigate(`/customize-order/${menu.id}`, {
            state: { selectedItem: menu, quantity, editItem }
        });
    };

    // ---------- HANDLER ADD / UPDATE CART ----------
    const handleAddToCart = () => {
        if (!menu) return;

        if (editItem) {
            // MODE EDIT: cuma update qty item yang sudah ada di cart
            dispatch(
                updateItemQuantity({
                    id: editItem.id,
                    qty: quantity,
                })
            );
            navigate("/cart");
        } else {
            // MODE TAMBAH: bikin cart item baru tanpa customization
            dispatch(
                addItemToCart({
                    id: uuidv4(),
                    menu_id: menu.id,
                    menu_nama: menu.nama,
                    menu_harga: menu.harga_awal,
                    menu_gambar: menu.gambar ?? "",
                    qty: quantity,
                    isPaket: false,
                    customizations: [
                        {
                            slot_key: "main",
                            menu_id: menu.id,
                            menu_nama: menu.nama,
                            menu_harga: menu.harga_awal,
                            varian: null,
                            opsi: [],
                        },
                    ],
                    subtotal: menu.harga_awal * quantity,
                })
            );
        }

        navigate("/recommendation");
    };

    // ---------- LOADING / NOT FOUND ----------
    if (!menu) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    // ---------- RENDER ----------
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "80vh",
                p: 2,
                maxWidth: "400px",
                margin: "0 auto",
                border: "1px solid #ccc",
            }}
        >
            {/* Image */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                }}
            >
                <img
                    src={menu.gambar || "https://via.placeholder.com/150"}
                    alt={menu.nama}
                    style={{
                        width: "60%",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
            </Box>

            {/* Name, Price, Buttons */}
            <Box sx={{ width: "100%" }}>
                <Typography
                    sx={{
                        fontFamily: "Speedee-Bold",
                        fontSize: "20px",
                        textAlign: "center",
                    }}
                >
                    {menu.nama}
                </Typography>
                <Typography
                    sx={{
                        fontFamily: "Speedee-Regular",
                        fontSize: "14px",
                        textAlign: "center",
                        color: "text.secondary",
                        mb: 3,
                    }}
                >
                    Rp {menu.harga_awal.toLocaleString("id-ID")}
                </Typography>

                <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                        mb: 2,
                        fontFamily: "Speedee-Regular",
                        borderColor: "#ccc",
                        color: "text.primary",
                        borderRadius: "4px",
                    }}
                    onClick={handleCustomize}
                >
                    Customize
                </Button>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        px: 1,
                    }}
                >
                    <IconButton onClick={handleDecrement}>
                        <RemoveIcon />
                    </IconButton>

                    <Typography
                        sx={{ fontFamily: "Speedee-Regular", fontSize: "16px" }}
                    >
                        {quantity}
                    </Typography>

                    <IconButton onClick={handleIncrement}>
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, width: "100%", mt: 3, mb: 2 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                        fontFamily: "Speedee-Regular",
                        borderColor: "#ccc",
                        color: "text.primary",
                    }}
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        backgroundColor: "#FFD700",
                        color: "black",
                        fontFamily: "Speedee-Regular",
                    }}
                    onClick={handleAddToCart}
                >
                    {editItem ? "Update Cart" : "Add to Cart"}
                </Button>
            </Box>
        </Box>
    );
}