import {
    Box,
    Typography,
    Button,
    IconButton,
    Container
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

    const dataMenuDummy = [
        {
            id: 1,
            name: "Fries",
            price: 25000,
            imageUrl: testMenuImg,
        },
        {
            id: 2,
            name: "Chicken",
            price: 5050050,
            imageUrl: testMenuImg,
        },

    ];
    const additionalMenuDummy = [
        {
            id: 1,
            menu_id: 1,
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

    const selectedItem = dataMenuDummy.find((item) => item.id === Number(id));

    if (!selectedItem) {
        return (<>
            <Box sx={{ display: "flex", justifyContent: "center", opacity: 1, flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "center", opacity: 1 }}>
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
                                            Rp {selectedItem.price}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Button fullWidth variant="outlined" size="small" sx={{ fontFamily: "Speedee-Regular", mt: 2, borderColor: "text.secondary" }}>
                                    <Typography sx={{ color: "text.secondary", fontFamily: "Speedee-Regular", fontSize: "12px" }} onClick={() => { setComesWith(0); setAdditional(0) }}>Reset Changes</Typography>
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


                        {/* ACTION */}
                        <Box sx={{ display: "flex", gap: 2, mt: 3, color: "text.secondary" }}>
                            <Button fullWidth variant="outlined" sx={{ fontFamily: "Speedee-Regular", color: "text.secondary" }} onClick={() => navigate(-1)}>
                                Cancel
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ backgroundColor: "#FFD700", color: "black", fontFamily: "Speedee-Regular" }}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                </Container>

            </>
        );
    }
}