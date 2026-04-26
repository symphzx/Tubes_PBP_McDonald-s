import { Box, Button, IconButton, Typography } from "@mui/material";
import testMenuImg from "../img/test_fries.avif";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// buat redux
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { addItemToCart, updateItemQuantity } from "../../../store/cartSlice"

export default function SetQuantityPage() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const location = useLocation()

    // cek ada kiriman dari OrderCart buat editItem ga
    const editItem = location.state?.editItem

    // quantity ngikutin yg ada di cart
    useEffect(() => {
        if (editItem) {
            setQuantity(editItem.qty)
        }
    }, [editItem])

    const dataMenuDummy = [
        {
            id: "662e9121-32c6-43c3-9a67-7e2bd43a9644",
            name: "Fries",
            price: 25000,
            foodCategory: "fries",
            imageUrl: testMenuImg,
        },
        {
            id: "80f089b8-4001-49c5-b19f-42d7a9ce9870",
            name: "Chicken",
            price: 50500,
            foodCategory: "Chicken",
            imageUrl: testMenuImg,
        },

    ];

    const selectedItem = dataMenuDummy.find((item) => item.id === id);

    if (!selectedItem) {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
                <Typography sx={{ fontFamily: "Speedee-Bold", fontSize: "20px", textAlign: "center" }}>
                    Item Not noItemFound</Typography>
            </Box>
        );
    }

    // const handleAddToCart = () => {
    //     alert("Item added to cart: " + selectedItem.name);
    //     return navigate("/menu");
    // }

    const handleAddToCart = () => {
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
            const menuAddToCart = {
                id: Date.now().toString(),
                menu_id: selectedItem.id.toString(),
                menu_nama: selectedItem.name,
                menu_harga: selectedItem.price,
                menu_gambar: selectedItem.imageUrl,
                varian: null, 
                opsi: null,   
                qty: quantity,
                subtotal: 0
            }
            dispatch(addItemToCart(menuAddToCart));
        }
        
        navigate("/menu");
        alert("Item added to cart: " + selectedItem.name);
        return navigate("/");
    }

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
                    src={selectedItem.imageUrl}
                    alt={selectedItem.name}
                    style={{ width: "60%", objectFit: "cover", borderRadius: "8px" }}
                />
            </Box>

            {/*  Name ,Price , Buttons */}
            <Box sx={{ width: "100%" }}>

                <Typography sx={{ fontFamily: "Speedee-Bold", fontSize: "20px", textAlign: "center" }}>
                    {selectedItem.name}
                </Typography>
                <Typography sx={{ fontFamily: "Speedee-Regular", fontSize: "14px", textAlign: "center", color: "text.secondary", mb: 3 }}>
                    Rp {selectedItem.price.toLocaleString("id-ID")}
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
                    onClick={() => navigate(`/customize-order/${selectedItem.id}`,{
                        state: {
                            selectedItem: selectedItem,
                            quantity: quantity
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