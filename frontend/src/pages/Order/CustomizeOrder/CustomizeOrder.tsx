import {
    Box,
    Typography,
    Button,
    IconButton,
    Container,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Grid,
    Paper
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import custOrderLogo from "../img/mcd-plate.png";
import noItemFound from "../img/item-not-found-error.png";
import testMenuImg from "../img/test_fries.avif";
import { useNavigate, useParams } from "react-router";

export default function CustomizeOrder() {
    const { id } = useParams();
    const [additional, setAdditional] = useState(0);

    const [comesWith, setComesWith] = useState(0);
    const navigate = useNavigate();
    const [tipeAyam, setTipeAyam] = useState<string[]>([]);
    const tipeAyamOptions = ["Sayap", "Paha bawah", "Paha atas", "Dada Mentok", "Dada Tulang"];



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
            price: 5050050,
            foodCategory: "Chicken",
            imageUrl: testMenuImg,
        },

    ];
    const additionalMenuDummy = [
        {
            id: 1,
            menu_id: "80f089b8-4001-49c5-b19f-42d7a9ce9870",
            name: "Cheesy Sauce",
            menu_qty: 2,
            price: 5000,
            imageUrl: testMenuImg
        },

    ]
    const comesWithDummy = [
        {
            name: "Salt",
            imageUrl: testMenuImg
        },
    ]

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
    }
    const handleSaveChanges = () => {
        alert("Changes saved");
        navigate("/");
    }

    function checkFoodType(theFood: string) {
        const food = dataMenuDummy.find((item) => item.foodCategory === theFood);
        return food?.foodCategory;
    }

    const selectedItem = dataMenuDummy.find((item) => item.id === id);

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
    else {

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
                                            src={selectedItem.imageUrl}
                                            width="100%"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </Box>

                                    <Box sx={{ marginTop: "20px", flex: 1 }}>
                                        <Typography>{selectedItem.name}</Typography>
                                        <Typography variant="body2" sx={{ fontFamily: "Speedee-Regular" }}>
                                            Rp {selectedItem.price.toLocaleString("id-ID")}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Button fullWidth variant="outlined" size="small" sx={{ fontFamily: "Speedee-Regular", mt: 2, borderColor: "text.secondary" }} onClick={handleReset}>
                                    <Typography sx={{ color: "text.secondary", fontFamily: "Speedee-Regular", fontSize: "12px" }} >Reset Changes</Typography>
                                </Button>
                            </Box>
                        }

                        {/* COMES WITH */}
                        <Box sx={{ border: "1px solid #ddd", p: 2, mb: 2 }}>
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
                        </Box>

                        {/* ADDITIONAL */}
                        <Box sx={{ border: "1px solid #ddd", p: 2 }}>
                            <Typography sx={{ fontWeight: 500 }}>Additional Ingredients</Typography>
                            <hr />

                            {/* ITEM */}
                            {additionalMenuDummy.map((item, index) => (
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
                        </Box>

                        {checkFoodType(selectedItem.foodCategory) === "Chicken" ?
                            <Box sx={{ border: "1px solid #ddd", p: 2, mb: 2, mt: 2 }}>
                                <FormGroup>
                                    <Typography sx={{ fontFamily: "Speedee-Regular", mb: 2 }}>Permintaan Khusus</Typography>
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
                        }
                        { /* TIPE TIPE AYAM */}

                        {/* ACTION */}
                        <Box sx={{ display: "flex", gap: 2, mt: 3, color: "text.secondary" }}>
                            <Button fullWidth variant="outlined" sx={{ fontFamily: "Speedee-Regular", color: "text.secondary" }} onClick={() => navigate(-1)}>
                                Cancel
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ backgroundColor: "#FFD700", color: "black", fontFamily: "Speedee-Regular" }}
                                onClick={handleSaveChanges}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                </Container >

            </>
        );
    }
}