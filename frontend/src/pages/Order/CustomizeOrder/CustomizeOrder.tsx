import {
    Box,
    Typography,
    Button,
    Container,
    FormControlLabel,
    Checkbox,
    Grid,
    Paper
} from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import custOrderLogo from "../img/mcd-plate.png";
import noItemFound from "../img/item-not-found-error.png";
import { useNavigate, useLocation } from "react-router";

// buat reduxnyaa
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { addItemToCart } from "../../../store/cartSlice"

export default function CustomizeOrder() {
    const [additional, setAdditional] = useState(0);
    const [comesWith, setComesWith] = useState(0);
    const [tipeAyam, setTipeAyam] = useState<string[]>([]);
    const tipeAyamOptions = ["Sayap", "Paha bawah", "Paha atas", "Dada Mentok", "Dada Tulang"];

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    
    const { selectedItem, isPaket, quantity } = location.state || {}


    // const dataMenuDummy = [
    //     {
    //         id: 1,
    //         name: "Fries",
    //         price: 25000,
    //         foodCategory: "Chicken",
    //         imageUrl: testMenuImg,
    //     },
    //     {
    //         id: 2,
    //         name: "Chicken",
    //         price: 5050050,
    //         foodCategory: "Chicken",
    //         imageUrl: testMenuImg,
    //     },

    // ];
    // const additionalMenuDummy = [
    //     {
    //         id: 1,
    //         menu_id: 1,
    //         name: "Cheesy Sauce",
    //         menu_qty: 2,
    //         price: 5000,
    //         imageUrl: testMenuImg
    //     },

    // ]
    // const comesWithDummy = [
    //     {
    //         name: "Salt",
    //         imageUrl: testMenuImg
    //     },
    // ]

    // tambahin tipe tipe ayam 
    //tambahin opsi ukuran

    const handleChange = (item: string) => {
        setTipeAyam((prev) =>
            prev.includes(item)
                ? prev.filter((val) => val !== item)
                : [...prev, item]
        );
    };

    const handleReset = () => {
        setAdditional(0);
        setComesWith(0);
        setTipeAyam([]);
    }

    const handleSave = () => {
        const subtotal = (selectedItem.harga_awal ?? selectedItem.price ?? 0) * quantity;
        const orderData = {
            id: uuidv4(),
            menu_id: selectedItem.id,
            menu_nama: selectedItem.name ?? selectedItem.nama,
            menu_harga: selectedItem.price ?? selectedItem.harga_awal ?? 0,
            menu_gambar: selectedItem.imageUrl ??  selectedItem.gambar ?? "",
            qty: quantity,
            varian: null, // ato apa ya
            opsi: tipeAyam.length > 0 ? {
                mo_id: "Ayam-" + tipeAyam[0],
                nama_option: tipeAyam[0],
                tambahan_harga: 0
            } : null,
            subtotal
        };

        dispatch(addItemToCart(orderData));
        navigate("/recommendation");
    };

    // function checkFoodType(theFood: string) {
    //     return dataMenuDummy.find((item) => item.foodCategory === theFood);
    // }

    
    if (!selectedItem) {
        return (<>
            <Box sx={{ display: "flex", justifyContent: "center", opacity: 1, flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "center", opacity: 1 ,mt:15}}>
                    <img src={noItemFound} width="70%" height="70%" />
                </Box>
                <Typography sx={{ fontFamily: "Speedee-Bold", fontSize: "20px", textAlign: "center" }}>
                    Item not found :(
                </Typography>
            </Box>
        </>)
    }

    const namaItem = selectedItem.nama ?? selectedItem.name;
    const hargaItem = selectedItem.harga_awal ?? selectedItem.price ?? 0;
    const gambarItem = selectedItem.gambar ?? selectedItem.imageUrl ?? "";
    const isAyam = isPaket || selectedItem.kategori?.nama?.toLowerCase().includes("ayam");


    return (
        <>
            {/* LOGO */}
            <Box sx={{ display: "flex", justifyContent: "center", opacity: 1 }}>
                <img src={custOrderLogo} width="70" />
            </Box>
            <Container sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>

                <Box>

                    {/* TITLE */}
                    <Typography
                        variant="h4"
                        sx={{ mb: 2, textAlign: "center", fontFamily: "Speedee-Bold" }}
                    >
                        Customize
                    </Typography>

                    {/* ITEM */}
                    {!selectedItem ? (
                        <Typography sx={{
                            fontFamily: "Speedee-Bold",
                            fontSize: "20px",
                            textAlign: "center"
                        }}>
                            Item not found
                        </Typography>
                    ) :
                        <Box
                            sx={{
                                border: "1px solid #ddd",
                                p: 2,
                                mb: 2,
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: 3
                            }}
                        >
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ width: "20%", mr: 2 }}>
                                    <img
                                        src={gambarItem}
                                        width="100%"
                                        style={{ objectFit: "cover" }}
                                    />
                                </Box>

                                <Box sx={{ marginTop: "20px", flex: 1 }}>
                                    <Typography>{namaItem}</Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "Speedee-Regular" }}>
                                        Rp {hargaItem.toLocaleString("id-ID")}
                                    </Typography>
                                </Box>
                            </Box>

                            <Button fullWidth variant="outlined" size="small" sx={{ fontFamily: "Speedee-Regular", mt: 2, borderColor: "text.secondary" }}>
                                <Typography sx={{ color: "text.secondary", fontFamily: "Speedee-Regular", fontSize: "12px" }} onClick={handleReset}>Reset Changes</Typography>
                            </Button>
                        </Box>
                    }

                    {/* COMES WITH */}
                    {/* <Box sx={{ border: "1px solid #ddd", p: 2, mb: 2 }}>
                        <Typography sx={{ fontWeight: 500 }}>Comes With</Typography>
                        <hr />
                        {comesWithDummy.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mt: 2
                                }}>
                                <Box sx={{ width: "20%", mr: 2, display: "flex", flexDirection: "row" }}>
                                    <img
                                        src={item.imageUrl}
                                        width="100%"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <Typography sx={{ display: "flex", flexDirection: "start", mt: "20px", p: 2, fontFamily: "Speedee-Bold" }}>{item.name}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <IconButton onClick={() => setComesWith(Math.max(comesWith - 1, 0))}  >
                                        <RemoveIcon />
                                    </IconButton>

                                    {comesWith == 0 ?
                                        <Typography sx={{ display: "flex", fontFamily: "Speedee-Regular" }}>None</Typography> :
                                        <Typography sx={{ display: "flex", fontFamily: "Speedee-Regular" }}>{comesWith}</Typography>
                                    }
                                    <IconButton onClick={() => setComesWith(comesWith + 1)}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>

                            </Box>

                        ))}
                    </Box> */}

                    {/* ADDITIONAL */}
                    {/* <Box sx={{ border: "1px solid #ddd", p: 2 }}>
                        <Typography sx={{ fontWeight: 500 }}>Additional Ingredients</Typography>
                        <hr /> */}

                        {/* ITEM */}
                        {/* {additionalMenuDummy.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mt: 2
                                }}
                            >
                                <Box sx={{ width: "20%", mr: 2, display: "flex", flexDirection: "row" }}>
                                    <img
                                        src={item.imageUrl}
                                        width="100%"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <Typography sx={{ display: "flex", flexDirection: "start", marginTop: "30px", fontFamily: "Coolvetica-Rg", width: "100%" }}>
                                        {item.name}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", fontFamily: "Speedee-Regular" }}>
                                    <IconButton onClick={() => setAdditional(Math.max(additional - 1, 0))}>
                                        <RemoveIcon />
                                    </IconButton>

                                    {additional == 0 ?
                                        <Typography sx={{ display: "flex", fontFamily: "Speedee-Regular" }}>None</Typography> :
                                        <Typography sx={{ display: "flex", fontFamily: "Speedee-Regular" }}>{additional}</Typography>
                                    }
                                    <IconButton onClick={() => setAdditional(additional + 1)}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box> */}

                    {/* {checkFoodType(selectedItem.foodCategory) ? 
                    <Box sx={{ border: "1px solid #ddd", p: 2, mb: 2, mt: 2 }}>
                        <FormGroup>
                            <Typography sx={{fontFamily:"Speedee-Regular",mb:2}}>Permintaan Khusus</Typography>
                            <Grid container spacing={2}>
                                {tipeAyamOptions.map((item) => (
                                    <Grid key={item}>
                                        <Paper
                                            variant="outlined"
                                            sx={{
                                                borderRadius: 2,
                                                p: 1,
                                            }}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={tipeAyam.includes(item)}
                                                        onChange={() => handleChange(item)}
                                                    />
                                                }
                                                label={item}
                                            />
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </FormGroup>

                    </Box> : null
                } */}

                    { /* TIPE TIPE AYAM */}
                    {isAyam && (
                        <Box sx={{ border: "1px solid #ddd", p: 2, mb: 2 }}>
                            <Typography sx={{ mb: 2, fontWeight: "bold" }}>Pilih Bagian Ayam</Typography>
                            <Grid container spacing={1}>
                                {tipeAyamOptions.map((item) => (
                                    <Grid key={item}>
                                        <Paper variant="outlined" sx={{ borderRadius: 2, p: 1 }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={tipeAyam.includes(item)}
                                                        onChange={() => handleChange(item)}
                                                    />
                                                }
                                                label={item}
                                            />
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}

                    {/* ACTION */}
                    <Box sx={{ display: "flex", gap: 2, mt: 3, color: "text.secondary" }}>
                        <Button fullWidth variant="outlined" sx={{ fontFamily: "Speedee-Regular", color: "text.secondary" }} onClick={() => navigate(-1)}>
                            Cancel
                        </Button>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleSave}
                            sx={{ backgroundColor: "#FFD700", color: "black", fontFamily: "Speedee-Regular" }}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Box>
            </Container >

        </>
    );
}
