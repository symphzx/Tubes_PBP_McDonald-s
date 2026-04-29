import { Box, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// buat redux
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { addItemToCart, updateItemQuantity } from "../../../store/cartSlice"
import type { Menu } from "../../../types";


export default function SetQuantityPage() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const location = useLocation()
    const [loading, setLoading] = useState(true);

    // fetch menu (id) dari backend
    const [menu, setMenu] = useState<Menu | null>(null);
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/menu`);
                if (!res.ok) throw new Error("Gagal fetch menu");
                const data = await res.json();
                const found = data.records.find((m: Menu) => m.id === id);
                setMenu(found || null);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, [id]);

    // cek ada kiriman dari OrderCart buat editItem ga
    const editItem = location.state?.editItem
    // quantity ngikutin yg ada di cart
    useEffect(() => {
        if (editItem) {
            setQuantity(editItem.qty)
        }
    }, [editItem])

    // const dataMenuDummy = [
    //     { id: 1, name: "Fries", price: 25000, imageUrl: testMenuImg },
    //     { id: 2, name: "Chicken", price: 5050050, imageUrl: testMenuImg },
    // ];

    // const selectedItem = dataMenuDummy.find((item) => item.id === Number(id));

    // if (!selectedItem) {
    //     return (
    //         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
    //             <Typography sx={{ fontFamily: "Speedee-Bold", fontSize: "20px", textAlign: "center" }}>
    //             Item Not noItemFound</Typography>
    //         </Box>
    //     );
    // }

    // const handleAddToCart = () => {
    //     alert("Item added to cart: " + selectedItem.name);
    //     return navigate("/menu");
    // }

    const handleAddToCart = () => {
        if (!menu) return;

        if (editItem) {
            // edit
            dispatch(updateItemQuantity({
                menu_id: editItem.menu_id,
                mv_id: editItem.varian?.mv_id,
                mo_id: editItem.opsi?.mo_id,
                qty: quantity
            }));
        } else {
            // add
            dispatch(addItemToCart({
                id: Date.now().toString(),
                menu_id: menu.id,
                menu_nama: menu.nama,
                menu_harga: menu.harga_awal,
                menu_gambar: menu.gambar || "",
                varian: null,
                opsi: null,
                qty: quantity,
                subtotal: menu.harga_awal * quantity
            }));
        }
        navigate("/");
    }

    if (loading) return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress />
        </Box>
    );

    if (!menu) return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
            <Typography sx={{ fontSize: "20px", textAlign: "center" }}>
                Menu tidak ditemukan
            </Typography>
        </Box>
    );

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "80vh",
            p: 2,
            maxWidth: "400px",
            margin: "0 auto",
            border: "1px solid #ccc",
        }}>

            {/*  Iamgee */}
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
                <img
                    src={menu.gambar || "https://via.placeholder.com/150"}
                    alt={menu.nama}
                    style={{ width: "60%", objectFit: "cover", borderRadius: "8px"  }}
                />
            </Box>

            {/*  Name ,Price , Buttons */}
            <Box sx={{ width: "100%" }}>

                <Typography sx={{ fontFamily: "Speedee-Bold", fontSize: "20px", textAlign: "center" }}>
                    {menu.nama}
                </Typography>
                <Typography sx={{ fontFamily: "Speedee-Regular", fontSize: "14px", textAlign: "center", color: "text.secondary", mb: 3 }}>
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
                    onClick={() => navigate(`/customize-order/${menu.id}`, {
                        state: { 
                            selectedItem: menu, quantity, 
                        }
                    })}
                >
                    Customize
                </Button>

                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    px: 1,
                }}>
                    <IconButton onClick={() => setQuantity(Math.max(quantity - 1, 1))}>
                        <RemoveIcon />
                    </IconButton>

                    <Typography sx={{ fontFamily: "Speedee-Regular", fontSize: "16px" }}>
                        {quantity}
                    </Typography>

                    <IconButton onClick={() => setQuantity(quantity + 1)}>
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>

            { /* BUttonss */}
            <Box sx={{ display: "flex", gap: 2, width: "100%", mt: 3, mb: 2 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ fontFamily: "Speedee-Regular", borderColor: "#ccc", color: "text.primary" }}
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: "#FFD700", color: "black", fontFamily: "Speedee-Regular" }}
                    onClick={handleAddToCart}
                >
                    {editItem ? "Update Cart" : "Add to Cart"}
                </Button>
            </Box>
        </Box>
    );
}